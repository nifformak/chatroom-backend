import bodyParser from "body-parser";
import express from "express";
import socket from "socket.io";
import {UserController, DialogController, MessageController} from "../controlers";
import UserModel from "../models/User";
import createJWToken from "../utils/createJWToken";
import {UpdateLastReq, checkAuth} from "../middlewares";


const createRoutes = (app) => {
    app.use(bodyParser.json());
    app.use(checkAuth);
    app.use(UpdateLastReq);

    app.post("/user/signin", UserController.login);
    app.get("/user/me", UserController.index);

    app.post("/dialog/create", DialogController.create);
    app.post("/dialog/add-user", DialogController.addUser);
    app.get("/dialog/:id", DialogController.show);
    app.get("/dialogs",  DialogController.allFetch);
    app.post("/dialog/leave-user",  DialogController.leaveUser);

    app.post("/message/create", MessageController.create);

};

export default createRoutes;