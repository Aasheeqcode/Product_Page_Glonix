import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SkeletonCard from "../components/SkeletonCard";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import productsData from "../data/products.json";

const defaultImage = "/assets/Product_Page/default.jpg";

const tabs = ["Description", "Specifications", "Reviews"];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = productsData.find((p) => String(p.id) === id);
      setProduct(found);
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
          <div className="max-w-md w-full">
            <SkeletonCard />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => navigate("/products")}
            >
              Back to Products
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Demo gallery: use product.image + 4 default images (replace with real images if available)
  const images = [
    product.image || defaultImage,
    "/assets/Product_Page/gallery1.jpg",
    "/assets/Product_Page/gallery2.jpg",
    "/assets/Product_Page/gallery3.jpg",
    "/assets/Product_Page/gallery4.jpg",
  ];

  // Slide navigation
  const prevSlide = () =>
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextSlide = () =>
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-2 flex flex-col items-center">
        <div className="bg-white rounded-xl shadow-lg max-w-5xl w-full p-6 md:p-10 flex flex-col md:flex-row gap-10">
          {/* Gallery Column */}
          <div className="flex flex-col items-center md:w-1/2 w-full">
            <div
              className="w-full mb-4 relative"
              style={{ width: "100%" }}
            >
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-40 text-white rounded-full p-3 z-10 hover:bg-opacity-70"
                aria-label="Previous"
              >
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 28L8 16 20 4" />
                </svg>
              </button>
              <img
                src={images[currentIndex]}
                alt={product.name}
                className="w-full h-[28vw] md:h-[400px] object-cover rounded-xl border"
                style={{ width: "100%" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultImage;
                }}
              />
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-40 text-white rounded-full p-3 z-10 hover:bg-opacity-70"
                aria-label="Next"
              >
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 4l12 12-12 12" />
                </svg>
              </button>
            </div>
            <div className="flex gap-2 justify-center w-full">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`w-16 h-16 object-cover rounded-lg border cursor-pointer ${
                    currentIndex === idx ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setCurrentIndex(idx)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                />
              ))}
            </div>
          </div>
          {/* Info Column */}
          <div className="flex flex-col md:w-1/2 w-full">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="text-2xl font-bold text-blue-600 mb-2">
              ₹{product.price}
            </div>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500 mr-1 text-lg">
                {"★".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
              </span>
              <span className="text-xs text-gray-500">
                ({product.reviews} reviews)
              </span>
            </div>
            <span
              className={`mb-2 text-sm font-medium ${
                product.inStock ? "text-green-600" : "text-red-500"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
            {/* Quantity Selector */}
            <div className="flex items-center gap-2 mt-4 mb-6">
              <span className="font-semibold">Quantity:</span>
              <button
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-3 py-1 border rounded">{quantity}</span>
              <button
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <button
                className={`bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow transition ${
                  !product.inStock ? "opacity-50 pointer-events-none" : ""
                }`}
                title="Add to Cart"
              >
                Add to Cart
              </button>
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow transition text-center"
              >
                Buy Now
              </a>
              <button
                onClick={() => setLiked((prev) => !prev)}
                className={`rounded-full p-2 shadow transition ${
                  liked
                    ? "bg-pink-500 text-white hover:bg-pink-600"
                    : "bg-gray-100 text-pink-500 hover:bg-pink-100"
                }`}
                title={liked ? "Liked" : "Like"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill={liked ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                  />
                </svg>
              </button>
            </div>
            {/* Tabs Section */}
            <div>
              <div className="flex gap-4 border-b mb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`pb-2 font-semibold ${
                      activeTab === tab
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="min-h-[100px]">
                {activeTab === "Description" && (
                  <div>
                    <p className="text-gray-700">{product.description}</p>
                  </div>
                )}
                {activeTab === "Specifications" && (
                  <div>
                    <ul className="list-disc pl-5 text-gray-700">
                      <li>Brand: {product.brand}</li>
                      <li>Price: ₹{product.price}</li>
                      <li>
                        Stock:{" "}
                        {product.inStock ? "Available" : "Out of Stock"}
                      </li>
                      {/* Add more specs as needed */}
                    </ul>
                  </div>
                )}
                {activeTab === "Reviews" && (
                  <div>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">{product.reviews}</span>{" "}
                      customer reviews.
                    </p>
                    {/* Add review form or list here */}
                    <p className="text-gray-400">
                      Customer reviews coming soon!
                    </p>
                  </div>
                )}
              </div>
            </div>
            <button
              className="mt-8 text-blue-600 underline"
              onClick={() => navigate("/products")}
            >
              ← Back to Products
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;