import React from "react";
import "./index.scss";
import data from "./data.json";
import { Route, Link, Routes, Outlet } from "react-router-dom";

import { Products } from "./pages/products";
import { Product } from "./pages/product";

export const App: React.FC = ({}) => {
  const a: string = "1234";
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Products />}>
          1234
        </Route>
        <Route path={"/product"} element={<Product />}></Route>
        <Route path={"/product/:id"} element={<Product />}></Route>
      </Routes>
      <Outlet />
    </div>
  );
};
