import {ConnectionOptions} from "typeorm";
import path from "path";
import dotenv from "dotenv";


dotenv.config({path: ".env"});
const isCompiled = path.extname(__filename).includes("js");

export default {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "test",
    synchronize: true,
    logging: false,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 2000,
    entities:[
        __dirname + "/../**/*.entity.{js,ts}"
    ],
    migrations: [
        `/src/migration/**/*${isCompiled? "js" : "ts"}`
    ],
    cli:{
        "entitiesDir":"/src/entity",
        "migrationsDir":"/src/migration",
    }
} as ConnectionOptions;