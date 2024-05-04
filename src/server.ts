import express, { NextFunction, Request, Response } from "express";
import { nextApp, nextHandler } from "./next-utils";
import dbConnect from "./lib/dbConnect";
//import dbConnect from "./app/lib/dbConnect";
const app = express();

const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
  //await db.connnect
  await dbConnect();

  app.get("/", (req, res, next) => {
    next();
  });
  app.use((req, res) => {
    nextHandler(req, res);
  });

  nextApp.prepare().then(() => {
    console.log("next app prepared");

    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  });
};

start();
