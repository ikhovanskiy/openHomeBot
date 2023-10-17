import express, {Request, Response,NextFunction} from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import {AppDataSource} from "./database";
import {User,Session} from "./entity";
import passport from "passport";
import session from "express-session";
import * as userController from "./controllers/user.controller";
import * as homeController from "./controllers/home.controller";
import * as receiptController from "./controllers/receipt.controller";
import { TypeormStore } from "connect-typeorm";
import * as passportConfig from "./config/passport";
import {ErrorHandler} from "./middlewares";

//Работает!

const app: express.Application = express();

dotenv.config({path: ".env"});

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const repo = AppDataSource.getRepository(Session);
app.use(session({ 
  secret: "SECRET",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new TypeormStore({
    cleanupLimit: 2,
    ttl: 86400,
  }).connect(repo)
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", homeController.index);

app.get("/auth/logout/", userController.postLogout);
app.post("/auth/login/", userController.postLogin);
app.post("/auth/signup/", userController.postSignup);

app.post("/account/profile/", passportConfig.isAuthenticated, userController.postUpdateProfile);

app.get("/receipts/id/:id/",receiptController.getReceiptbyId);
app.get("/receipts/",passportConfig.isAuthenticated,receiptController.getUserReceipt);
app.post("/receipts/add/",passportConfig.isAuthenticated,receiptController.postAddReceipt);
app.post("/receipts/addByQr/",passportConfig.isAuthenticated,receiptController.postReceiptsByQR);

app.use(ErrorHandler);

export default app;