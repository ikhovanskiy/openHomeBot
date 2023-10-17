import errorHandler from "errorhandler";
import app from "./app";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
}

const server = app.listen(app.get("port"),()=>{
    console.log(`Приложение запущено на ${process.env.SERVER}:${app.get("port")}`);    
    console.log("  Нажмите CTRL-C для остановки\n");
});

export default server;