import React, { useState } from "react";
import { FaCreditCard, FaMobileAlt } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../slices/cartsSice";

const FakePaymentModal = ({ onClose, onSuccess, amount }) => {
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
      onClose();
      dispatch(clearCart());
      navigate("/");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white text-center py-4 text-xl font-semibold">
          ShopMate Secure Payment
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-300">
          {[
            { label: "Card", icon: <FaCreditCard />, value: "card" },
            { label: "UPI", icon: <FaMobileAlt />, value: "upi" },
          ].map(({ label, icon, value }) => (
            <button
              key={value}
              onClick={() => setMethod(value)}
              className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                method === value
                  ? "bg-white text-blue-600 border-b-2 border-blue-600"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-5">
          {method === "card" ? (
            <>
              <label className="block text-sm font-medium text-gray-600">
                Card Number
              </label>
              <input
                type="text"
                value="4242 4242 4242 4242"
                readOnly
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm bg-gray-100"
              />
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-600">
                    Expiry
                  </label>
                  <input
                    type="text"
                    value="12/34"
                    readOnly
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm bg-gray-100"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-600">
                    CVV
                  </label>
                  <input
                    type="text"
                    value="123"
                    readOnly
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm bg-gray-100"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <label className="block text-sm font-medium text-gray-600">
                UPI ID
              </label>
              <input
                type="text"
                defaultValue="user@upi"
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
              />
            </>
          )}

          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full bg-green-600 text-white font-semibold py-3 rounded hover:bg-green-700 flex items-center justify-center gap-2 transition-all"
          >
            {loading ? (
              <>
                <ImSpinner2 className="animate-spin" /> Processing...
              </>
            ) : (
              `Pay ₹${amount}`
            )}
          </button>

          <button
            onClick={onClose}
            disabled={loading}
            className="w-full mt-2 bg-gray-100 text-gray-800 font-medium py-2 rounded hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FakePaymentModal;
