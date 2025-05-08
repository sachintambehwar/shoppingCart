import { useEffect } from "react";
import "./App.css";
import ProductCard from "./Components/ProductCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./slices/productSlice";
import Loder from "./Components/Loder";
import { FaExclamationTriangle } from "react-icons/fa";

function App() {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.product);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  if (status === "loading") return <Loder />;
  if (status === "failed") {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded relative flex items-center gap-3">
        <FaExclamationTriangle className="text-red-600 text-xl" />
        <div>
          <p className="font-semibold">Oops! Something went wrong.</p>
          <p className="text-sm">{error || "Unable to fetch data. Please try again later."}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 m-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6  bg-gray-50 min-h-screen">
        {products?.map((p) => {
          return (
            <ProductCard
              key={p.id}
              image={p.image}
              title={p.title}
              price={p.price}
              onClick={() => handleClick(p.id)}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
