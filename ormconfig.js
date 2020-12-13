const rootDir = (process.env.NODE_ENV && process.env.NODE_ENV == "production") ? 'build' : 'src'
const ext = (process.env.NODE_ENV && process.env.NODE_ENV == "production") ? 'js' : 'ts'
const URL_DATABASE = "";
module.exports = {
   "type": "postgres",
   "host": "localhost",
   "port": 5432,
   "username": "postgres",
   "password": "root",
   "database": "quickstart",
   "synchronize": true,
   "logging": false,
   "entities": [
      rootDir + "/entity/**/*."+ext
   ],
   "migrations": [
      rootDir + "/migration/**/*."+ext
   ],
   "subscribers": [
      rootDir + "/subscriber/**/*."+ext
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}