import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { productsRouter } from "./productsRouter";
import { citiesRouter } from "./citiesRouter";
import { NotFoundError, PostDataError } from "./errors";

const PORT = process.env.PORT || 8081;
const NODE_ENV = process.env.NODE_ENV || "development";

const app = express();

app.use(morgan(NODE_ENV === "development" ? "dev" : "common"));
app.use(bodyParser.json());

app.use("/products", productsRouter);
app.use("/cities", citiesRouter);

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
