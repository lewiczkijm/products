export type productType = {
  name: string;
  id: string;
  description?: string;
  price?: number | {};
  images?: string[];
  status: boolean;
};

export type cityType = { [U: string]: number | undefined };

export const emptyPtoduct: productType = {
  name: "",
  id: "",
  price: undefined,
  images: [],
  status: false,
};
