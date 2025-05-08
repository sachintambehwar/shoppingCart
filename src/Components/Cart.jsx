import React, { useState } from "react";
import {
  FaTrash,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import FakePaymentModal from "./FakePaymentModal";
import { removeFromCart, updateQuantity } from "../slices/cartsSice";

const Cart = () => {
  const dispatch = useDispatch();
  const [showPayment, setShowPayment] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: Number(quantity) }));
  };

  //   const handleCheckout = () => {
  //     setShowPayment(true);
  //   };

  const handlePaymentSuccess = () => {
    alert("Payment successful! 🎉");
    // Optionally clear cart here
  };

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Left: Cart Items */}
      <div className="md:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">MY BAG</h2>
        <p className="text-sm text-gray-500">
          Items are reserved for 60 minutes
        </p>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-start border-b pb-6"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-32 h-32 object-cover"
            />

            <div className="flex-1 ml-6 space-y-2">
              <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
              <p className="text-sm text-gray-700">{item.title}</p>
              <div className="flex items-center space-x-4 text-sm mt-2">
                <span className="text-gray-600">WHITE</span>
                <span className="border-l pl-4 text-gray-600">XS</span>
                <select
                  className="border p-1 text-sm"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                >
                  {[1, 2, 3, 4, 5].map((qty) => (
                    <option key={qty} value={qty}>
                      Qty {qty}
                    </option>
                  ))}
                </select>
              </div>
              <button className="text-sm underline text-gray-600 mt-2">
                Save for later
              </button>
            </div>

            <button
              onClick={() => handleRemove(item.id)}
              className="text-gray-600 hover:text-red-600"
            >
              <FaTrash size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Right: Summary */}
      <div className="bg-gray-50 p-6 rounded shadow-sm h-fit">
        <h3 className="text-xl font-bold mb-6 border-b pb-2">TOTAL</h3>
        <div className="flex justify-between text-sm mb-4">
          <span className="font-semibold">Sub-total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm mb-6">
          <span className="font-semibold">Delivery</span>
          <span className="text-gray-500 text-xs cursor-pointer">i</span>
        </div>
        {cartItems.length > 0 && (
          <button
            onClick={() => setShowPayment(true)}
            className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 transition"
          >
            CHECKOUT
          </button>
        )}

        {showPayment && (
          <FakePaymentModal
            onClose={() => setShowPayment(false)}
            onSuccess={handlePaymentSuccess}
            amount={total}
          />
        )}

        <div className="mt-6 text-sm text-gray-600">
          <p className="font-semibold mb-2">WE ACCEPT:</p>
          <div className="flex space-x-2">
            <FaCcVisa size={28} />
            <FaCcMastercard size={28} />
            <FaCcPaypal size={28} />
            <FaCcAmex size={28} />
          </div>
          <p className="mt-4">Got a discount code? Add it in the next step.</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
