import React from "react";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <nav className="w-full bg-neutral-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 h-20 flex items-center justify-between relative">
        <div className="flex items-center text-2xl m-2 text-white hover:text-blue-400 cursor-pointer">
          <Link to="/">
            <FaHome />
          </Link>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-extrabold text-white tracking-wide">
          ShopMate
        </div>

        <div className="relative flex items-center text-2xl text-white hover:text-blue-400 cursor-pointer">
          <Link to="/cart">
            <FaShoppingCart />
          </Link>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
