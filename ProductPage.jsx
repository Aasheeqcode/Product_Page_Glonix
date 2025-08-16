import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import productsData from "../data/products.json";

const defaultImage = "./src/Page/Assemby_Service.jpeg";

// Super Duper Skeleton Card
const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col animate-pulse">
    <div className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    <div className="p-4 flex flex-col flex-1">
      <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2 w-2/3" />
      <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2 w-1/3" />
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2 w-full" />
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2 w-1/2" />
      <div className="flex gap-2 mt-auto">
        <div className="h-10 w-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full" />
        <div className="h-10 w-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full" />
        <div className="h-10 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded" />
      </div>
    </div>
  </div>
);

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [liked, setLiked] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:scale-105 overflow-hidden flex flex-col"
                >
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.image ? product.image : defaultImage}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-200 hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultImage;
                      }}
                    />
                  </Link>
                  <div className="p-4 flex flex-col flex-1">
                    <Link to={`/products/${product.id}`}>
                      <h2 className="font-semibold text-lg text-gray-900 mb-2">{product.name}</h2>
                    </Link>
                    <div className="text-xl font-bold text-blue-600 mb-2">₹{product.price}</div>
                    <p className="text-gray-600 mb-2">{product.description}</p>
                    <span
                      className={`mb-4 text-sm font-medium ${
                        product.inStock ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                    <div className="flex gap-2 mt-auto items-center">
                      <button
                        className={`bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow transition ${
                          !product.inStock ? "opacity-50 pointer-events-none" : ""
                        }`}
                        title="Add to Cart"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.6 17h8.8a1 1 0 00.95-.68L21 9M7 13V6h13" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleLike(product.id)}
                        className={`rounded-full p-2 shadow transition ${
                          liked[product.id]
                            ? "bg-pink-500 text-white hover:bg-pink-600"
                            : "bg-gray-100 text-pink-500 hover:bg-pink-100"
                        }`}
                        title={liked[product.id] ? "Liked" : "Like"}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                          fill={liked[product.id] ? "currentColor" : "none"}
                          viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                        </svg>
                      </button>
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition text-center ml-auto"
                        title="Buy Now"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;