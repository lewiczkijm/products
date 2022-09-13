import { cityType, productType } from "../../globalTypes";
import { Axios } from "./utils/Axios";

export const getProducts = async (page: number = 1, searchStr?: string) => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (searchStr) params.append("search", searchStr);
  const res = await Axios.get(`/products?${params.toString()}`);
  return res.data;
};

export const deleteProduct = async (id: string) => {
  const res = await Axios.delete(`/products/${id}`);
  return res.data;
};

export const saveProduct = async ({ product, id }: { product: productType; id?: string }) => {
  const path = id ? `/products/${id}` : "/products";
  const res = await Axios.post(path, product);
  return res.data;
};

export const getProductOfId = async (id: string): Promise<productType> => {
  const res = await Axios.get(`/products/${id}`);
  return res.data;
};

export const getCities = async (): Promise<cityType[]> => {
  const res = await Axios.get("/cities");
  return res.data;
};

export const addCity = async (name: string) => {
  const res = await Axios.post("/cities", { name });
  return res.data;
};
