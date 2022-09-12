import express from "express";
import { cities } from "./data";
import { PostDataError } from "./errors";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(cities.getCites());
});
router.post("/", (req, res, next) => {
  const { name } = req.body;
  if (typeof name === "string" && name.length >= 3) {
    cities.addCity(name);
    res.send("ok");
  } else {
    next(PostDataError);
  }
});

export { router as citiesRouter };
