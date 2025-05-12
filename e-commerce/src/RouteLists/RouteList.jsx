import React from "react";
import { Routes, Route } from "react-router-dom";
import EcommercePage from "../Pages/EcommercePage";
import ProductDetails from "../Pages/ProductDetails";
import CartPage from "../Pages/CartPage";

export default function RouteList() {
  return (
    <Routes>
      <Route path="/" element={<EcommercePage />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}