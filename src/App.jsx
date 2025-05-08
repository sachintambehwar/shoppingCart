import { useEffect } from "react";
import "./App.css";
import ProductCard from "./Components/ProductCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./slices/productSlice";
import Loder from "./Components/Loder";

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
  if (status === "failed") return <p>Error: {error}</p>;

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
