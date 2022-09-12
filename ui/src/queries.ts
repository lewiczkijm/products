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
