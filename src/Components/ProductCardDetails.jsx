import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartsSice";
import Loder from "./Loder";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.image);
      });
  }, [id]);

  if (!product) return <Loder />;

  const thumbnails = [product.image, product.image, product.image];
  const handleAddtoCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div
      className="max-w-7xl mx-auto mt-10 px-4 pt-20 pb-10 grid grid-cols-1 md:grid-cols-2 gap-10"
      style={{ margin: "auto" }}
    >
      <div className="flex space-x-6">
        <div className="flex flex-col space-y-4">
          {thumbnails.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="Thumbnail"
              className={`w-20 h-20 object-cover cursor-pointer border rounded ${
                selectedImage === img ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        <div className="flex-1 overflow-hidden rounded border border-gray-200 bg-white">
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-[550px] object-contain transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold uppercase text-gray-600 tracking-wider">
          {product.brand || "FAKE BRAND"}
        </h2>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-lg font-semibold text-red-600">₹{product.price}</p>

        <div className="text-sm">
          <span className="font-semibold">Colour:</span> Black
        </div>

        <button
          onClick={handleAddtoCart}
          className="bg-green-600 text-white w-full cursor-pointer h-12 px-[20px] py-[16px] text-lg font-medium rounded hover:bg-green-700 transition"
        >
          ADD TO BAG
        </button>

        <div className="text-sm text-gray-600 mt-6">
          ✔ Free delivery on qualifying orders.
          <br />
          <a href="#" className="underline text-blue-600">
            View our Delivery & Returns Policy
          </a>
        </div>

        {/* Description */}
        <div className="mt-4 text-gray-600 text-sm">{product.description}</div>

        {/* Product Code */}
        <p className="text-xs text-gray-400 mt-6">
          <span className="font-semibold">Product Code:</span> {product.id}
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
