import { v4 as uuid } from "uuid";
import { NotFoundError } from "./errors";
import { productType } from "../../globalTypes";
import fs, { promises as fsx } from "fs";
import { createHash } from "crypto";

let data = {};
const PROD_PER_PAGE = 5;

const isFile = fs.existsSync(__dirname + "/dump._json");
if (isFile) {
  const file = fs.readFileSync(__dirname + "/dump._json");
  data = JSON.parse(file.toString());
}

class Cities {
  toJSON() {
    return this.cities;
  }
  private cities: {};
  constructor(values?: {}) {
    this.cities = values || {};
  }

  getCites = () => {
    return this.cities;
  };
  addCity = (name) => {
    this.cities[name] = 0;
  };
}

//@ts-ignore
export const cities = new Cities(data.cities);

class Products {
  private products: productType[];
  toJSON() {
    return this.products;
  }
  constructor(value?: []) {
    this.products = value || [];
  }

  getProducts(page: number, search?: string) {
    let products;
    if (search) products = this.products.filter((product) => product.name.search(search) !== -1 || (product.description && product.description.search(search) !== -1));
    else products = this.products;
    const start = (page - 1) * PROD_PER_PAGE;
    const end = page * PROD_PER_PAGE;
    const len = Math.ceil(products.length / PROD_PER_PAGE);
    return { value: products.slice(start, end), pages: len };
  }

  getProduct(id: string) {
    return this.products.find((product) => product.id === id);
  }

  addProduct(product: productType) {
    product.id = uuid();
    this.products.push(product);
    return product.id;
  }
  editProduct(id: string, product: productType) {
    const editedProductIndex = this.products.findIndex((product) => product.id === id);
    if (editedProductIndex === -1) throw NotFoundError;
    this.products[editedProductIndex] = product;
  }

  async uploadMedia(id: string, file: Express.Multer.File) {
    const editedProduct = this.products.find((product) => product.id === id);
    if (!editedProduct) throw NotFoundError;
    const hash = createHash("sha256");
    hash.update(file.buffer);
    const name = `/media/${hash.digest("hex")}_${file.originalname.replace(" ", "")}`;
    await fsx.writeFile(`${__dirname}${name}`, file.buffer);
    if (!editedProduct.images) editedProduct.images = [];
    editedProduct.images.push(name);
    return name;
  }

  deleteProduct(id: string) {
    const editedProduct = this.products.find((product) => product.id === id);
    if (!editedProduct) throw NotFoundError;
    this.products = this.products.filter((product) => product.id !== id);
  }
}

//@ts-ignore
export const products = new Products(data.products);
