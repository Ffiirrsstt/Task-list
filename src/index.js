import express from "express";
import bodyParser from "body-parser";
import { router } from "./modules/note-taking/note-taking.controller";
import mongoose from "mongoose";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(8080, async () => {
  console.log("Start Program.");
  mongoose.set("strictQuery", true);
  await mongoose.connect(
    "mongodb+srv://firstengineer15:MOJ9F1M8uoFVxUVd@cluster0.dlxsflu.mongodb.net/"
  );
});
