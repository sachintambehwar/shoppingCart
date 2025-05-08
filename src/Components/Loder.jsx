import React from "react";
// import "./Loader.css"; // assuming you move the CSS below here

const Loder = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-orange-300 via-pink-400 to-red-500">
      <div className="sk-cube-grid">
        {[...Array(9)].map((_, i) => (
          <div key={i} className={`sk-cube sk-cube${i + 1}`}></div>
        ))}
      </div>
    </div>
  );
};

export default Loder;
