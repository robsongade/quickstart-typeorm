import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {User} from "./entity/User";
const dotenv = require("dotenv")

dotenv.config()

createConnection().then(async connection => {

    // create express app
    const app = express();
    const cors = require('cors');
    
    app.use(cors())
    app.use(express.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...
    const port = process.env.PORT || 3000
    // start express server
    app.listen(port);


    const user : User = await getRepository(User).findOne()
    if(!user){
        // insert new users for test
        await connection.manager.save(connection.manager.create(User, {
            firstName: "Timber",
            lastName: "Saw",
            age: 27
        }));
        await connection.manager.save(connection.manager.create(User, {
            firstName: "Phantom",
            lastName: "Assassin",
            age: 24
        }));

    }
    console.log(`Express server has started on port ${port}. Open http://localhost:${port}/users to see results`);

}).catch(error => console.log(error));
