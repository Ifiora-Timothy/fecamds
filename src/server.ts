import express, { NextFunction, Request, Response } from "express";
import { nextApp, nextHandler } from "./next-utils";
import dbConnect from "./lib/dbConnect";
import nextBuild from "next/dist/build";
import path from "path";

//import dbConnect from "./app/lib/dbConnect";
const app = express();

const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
  //await db.connnect
  await dbConnect();

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      console.log("Next.js is building for production");

      //@ts-expect-error
      await nextBuild(path.join(__dirname, "../"));

      process.exit();
    });

    return;
  }

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
