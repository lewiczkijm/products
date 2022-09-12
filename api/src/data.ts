import { v4 as uuid } from "uuid";
import { NotFoundError } from "./errors";

export type cityType = {
  name: string;
  id: string;
};

class Cities {
  private cities: cityType[];
  constructor() {
    this.cities = [
      { name: "Kiev", id: "0" },
      { name: "Odessa", id: "1" },
    ];
  }

  getCites = () => this.cities;
  addCity = (name) => {
    this.cities.push({ name, id: uuid() });
  };
}

export const cities = new Cities();

export type productType = {
  name: string;
  id: string;
};

class Products {
  private products: productType[];
  constructor() {
    this.products = [];
  }

  getProducts(page: number, search?: string) {
    return this.products;
  }

  getProduct(id: string) {
    return this.products.find((product) => product.id === id);
  }

  addProduct(product: productType) {
    product.id = uuid();
    this.products.push(product);
  }
  editProduct(id: string, product: productType) {
    const editedProduct = this.products.find((product) => product.id === id);
    if (!editedProduct) throw NotFoundError;
  }

  deleteProduct(id: string) {
    const editedProduct = this.products.find((product) => product.id === id);
    if (!editedProduct) throw NotFoundError;
    this.products = this.products.filter((product) => product.id !== id);
  }
}

export const products = new Products();
