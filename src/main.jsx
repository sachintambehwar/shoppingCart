import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import "./index.css";
import App from "./App.jsx";
import ProductDetails from "./Components/ProductCardDetails.jsx";
import Navbar from "./Navbar.jsx";
import Cart from "./Components/Cart.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
