import express, { Request } from "express";
import multer from "multer";
import { products } from "./data";
import { NotFoundError, PostDataError } from "./errors";

const upload = multer();

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
    if (id) {
      products.editProduct(id as string, req.body);
      res.send("ok");
    } else {
      const id = products.addProduct(req.body);
      res.send(id);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/media/:id", upload.single("media"), async (req: Request, res, next) => {
  try {
    const { id } = req.params;
    const file = req.file;
    if (!file) throw PostDataError;
    const filename = await products.uploadMedia(id, file);
    res.send(filename);
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
