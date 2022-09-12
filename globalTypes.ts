export type productType = {
  name: string;
  id: string;
  price?: number;
  images?: string[];
  status: "active" | "passive";
};

export type cityType = {
  name: string;
  price?: string;
  id: string;
};
