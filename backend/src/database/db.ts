import { Connection, createConnection, getConnection, DataSource } from "typeorm";
import { NextFunction } from "express";
import ORMConfig from "./ormconfig";

export const AppDataSource = new DataSource(ORMConfig);

AppDataSource.initialize()
    .then(() => {
        console.log("Data source is initialized successfully");
    })
    .catch((err) => {
        console.error("Data source is initialized with errors", err);
    });
