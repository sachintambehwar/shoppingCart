import React from "react";

const ProductCard = ({ image, title, price, onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div
      className="relative w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
      onClick={handleClick}
    >
      <div className="w-full h-72 flex items-center justify-center bg-white">
        <img src={image} alt={title} className="h-full object-contain p-4" />
      </div>

      <button
        className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow hover:scale-105 transition"
        aria-label="Add to wishlist"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 0 1 0-6.364z"
          />
        </svg>
      </button>

      <div className="p-4">
        <p className="text-sm text-gray-700 truncate">{title}</p>
        <p className="text-md font-semibold mt-1">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
