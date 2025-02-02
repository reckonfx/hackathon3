'use client';

import { useState, useEffect } from "react";
import { Product } from "../../../typings"; // Import IProduct type (similar to ICart)
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";

export default function ProductDetailsPage() {
  const [product, setProduct] = useState<Product | null>(null); // State to store product details
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1); // Quantity of the product

  // Fetch product data (replace with actual data fetching logic)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const productId = window.location.pathname.split("/").pop(); // Assuming product ID is in the URL

      // Simulate fetching product data from localStorage (you can replace this with an API call)
      const storedProduct = JSON.parse(localStorage.getItem(`product-${productId}`) || "null");
      if (storedProduct) {
        setProduct(storedProduct);
      } else {
        console.warn("Product not found in localStorage.");
      }
    }
  }, []);

  // Add item to cart
  const handleAddToCart = () => {
    if (product) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = [
        ...cart,
        {
          ...product,
          qty,
          totalPrice: product.price * qty * (1 - product.discount / 100),
        },
      ];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      alert(`${product.title} added to cart`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <section className="w-full p-6 mb-10">
      {/* Breadcrumb */}
      <div className="w-[215px] h-[19px] flex items-center gap-[6px] ml-[100px] mb-6">
        <div className="w-[56px] h-[19px] flex items-center justify-between gap-1">
          <h2 className="font-satoshi text-sm font-normal leading-[18.9px] text-[#00000099]">
            Home
          </h2>
          <IoIosArrowForward />
        </div>
        <div className="w-[56px] h-[19px] flex items-center justify-between">
          <h2 className="font-satoshi text-sm font-normal leading-[18.9px] text-[#00000099]">
            Product Details
          </h2>
        </div>
      </div>

      {/* Page Title */}
      <h1 className="text-[40px] leading-[48px] font-integral font-bold ml-[100px] mb-8">
        {product.title}
      </h1>

      {/* Product Details Layout Container */}
      <div className="flex flex-col md:flex-row items-start justify-around gap-10">
        {/* Left Div - Product Image & Info */}
        <div className="flex flex-col gap-6">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={400}
            height={400}
            className="object-contain"
            priority
          />

          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">{product.title}</h2>
            <h3 className="text-lg font-normal">{product.description}</h3>
            <h3 className="text-xl font-bold">Price: ${product.price}</h3>
            <h3 className="text-sm font-normal">Discount: {product.discount}%</h3>
          </div>
        </div>

        {/* Right Div - Quantity & Add to Cart */}
        <div className="w-full md:min-w-[400px] rounded-3xl border border-black py-5 px-6 flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Choose Quantity</h2>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setQty(Math.max(qty - 1, 1))}
              className="w-10 h-10 flex justify-center items-center border border-black rounded-full text-xl"
            >
              -
            </button>
            <h3 className="text-xl font-medium">{qty}</h3>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-10 h-10 flex justify-center items-center border border-black rounded-full text-xl"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full h-[50px] rounded-[10px] text-xl text-white bg-[#111111] hover:bg-[#000000] font-semibold leading-[24px]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
