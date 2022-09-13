import { v4 as uuid } from "uuid";
import { NotFoundError } from "./errors";
import { productType } from "../../globalTypes";

class Cities {
  private cities: {};
  constructor() {
    this.cities = {
      Киев: 0,
      Чернигов: 0,
      Odessa: 0,
    };
  }

  getCites = () => {
    return this.cities;
  };
  addCity = (name) => {
    this.cities[name] = 0;
  };
}

export const cities = new Cities();

class Products {
  private products: productType[];
  constructor() {
    this.products = [
      { name: "Ковер", images: ["325425.png", "42545.png"], status: true, price: 500, id: "25255" },
      { name: "Хомяк", images: ["tghrth.png", "42545.png"], status: true, price: 120, id: "4674" },
      {
        name: "Бокал",
        images: ["ulul.png", "42545.png"],
        status: false,
        price: {
          Киев: 14,
          Чернигов: 27,
        },
        id: "4774",
      },
      { name: "Генератор", images: ["47567.png", "42545.png"], status: true, price: 23456, id: "5474" },
      { name: "шорты", status: false, id: "4757" },
      { name: "Резиновые сапоги", images: ["ry665.png", "42545.png"], status: true, price: 220, id: "377646" },
      { name: "Надувная лодка", images: ["pp.png", "42545.png"], status: true, price: 13356, id: "47868" },
    ];
  }

  getProducts(page: number, search?: string) {
    return { value: this.products, pages: this.products.length };
  }

  getProduct(id: string) {
    return this.products.find((product) => product.id === id);
  }

  addProduct(product: productType) {
    product.id = uuid();
    this.products.push(product);
  }
  editProduct(id: string, product: productType) {
    const editedProductIndex = this.products.findIndex((product) => product.id === id);
    if (editedProductIndex === -1) throw NotFoundError;
    this.products[editedProductIndex] = product;
  }

  deleteProduct(id: string) {
    const editedProduct = this.products.find((product) => product.id === id);
    if (!editedProduct) throw NotFoundError;
    this.products = this.products.filter((product) => product.id !== id);
  }
}

export const products = new Products();
