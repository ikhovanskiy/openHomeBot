import { NextFunction, Request, Response } from "express";
import {HttpException} from "../exceptions";

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 500;
    const message = error.message || "Что-то случилось...";
    response
      .status(status)
      .send({
        status,
        message,
      });
  }
   
  export default errorMiddleware;