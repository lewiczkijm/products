import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import multer from "multer";
import { isConstructorDeclaration } from "typescript";

const PORT = process.env.PORT || 8081;
const NODE_ENV = process.env.NODE_ENV || "development";

const app = express();

app.use(morgan(NODE_ENV === "development" ? "dev" : "common"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ test: 1 });
});
app.post("/", (req, res, next) => {
  debugger;
  next({ descr: "untrack" });
  res.send({ test: 1 });
});

// Server Error processing
app.use((err, req, res, next) => {
  res.status(500).send("It was some server error!");
  console.error(err);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log("Server listen in port ", PORT);
});
