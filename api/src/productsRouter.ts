import express from "express";
import { products } from "./data";
import { NotFoundError } from "./errors";

const router = express.Router();
router.get("/", (req, res, next) => {
  const { page, search } = req.query;
  const result = products.getProducts(Number(page), search as string);
  if (!result) next(NotFoundError);
  res.send(result);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const product = products.getProduct(id);
  if (!product) next(NotFoundError);
  res.send(product);
});

router.post(["/:id", "/"], (req, res, next) => {
  // TODO add files parse
  try {
    const { id } = req.params;
    if (id) products.editProduct(id as string, req.body);
    else products.addProduct(req.body);
    res.send("ok");
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    products.deleteProduct(id);
    res.send("ok");
  } catch (e) {
    next(e);
  }
});

export { router as productsRouter };
