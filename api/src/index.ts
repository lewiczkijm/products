import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { productsRouter } from "./productsRouter";
import { citiesRouter } from "./citiesRouter";
import { NotFoundError, PostDataError } from "./errors";
import { cities, products } from "./data";
import fs from "fs";

const PORT = process.env.PORT || 8081;
const NODE_ENV = process.env.NODE_ENV || "development";
const BASE_URL = process.env.NODE_ENV === "production" ? "/api" : "";

const app = express();

app.use(morgan(NODE_ENV === "development" ? "dev" : "common"));
app.use(bodyParser.json());
app.use(cors());
app.use(`${BASE_URL}/media`, express.static(__dirname + "/media"));
app.use(`${BASE_URL}/products`, productsRouter);
app.use(`${BASE_URL}/cities`, citiesRouter);
app.post(`${BASE_URL}/saveData`, async (req, res) => {
  const data = JSON.stringify({ cities, products });
  const r = fs.writeFileSync(__dirname + "/dump._json", data);
  res.send({});
});

// Uncritical Error processing
app.use((err, req, res, next) => {
  switch (err) {
    case PostDataError:
      res.status(400).send(err.message);
      break;
    case NotFoundError:
      res.status(404).send(err.message);
      break;
    default:
      next(err);
  }
});

// Critical Error processing
app.use((err, req, res, next) => {
  res.status(500).send("It was some server error!");
  console.error(err);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log("Server listen in port ", PORT);
});
