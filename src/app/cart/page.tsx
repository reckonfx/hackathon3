'use client';

import { useState, useEffect } from "react";
import { ICart } from "../../../typings"; // Import ICart type
import Image from "next/image"; // For image rendering
import { IoIosArrowForward } from "react-icons/io";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineDiscount } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function CartPage() {
  const [cart, setCart] = useState<ICart[]>([]); // State to store cart items
  const [loading, setLoading] = useState(false);

  // Load cart data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

      // Validate and update cart data
      if (Array.isArray(storedCart)) {
        const updatedCart = storedCart.map((item) => ({
          ...item,
          qty: Number(item.qty) || 1, // Ensure qty is a number
          price: Number(item.product?.price) || 0, // Ensure price is a number
          discount: Number(item.product?.discount) || 0, // Ensure discount is a number
          name:item.product.title,
          totalPrice:
            (Number(item.product?.price) || 0) *
            (1 - (Number(item.product?.discount) || 0) / 100) *
            (Number(item.qty) || 1), // Recalculate total price
        }));
        setCart(updatedCart);
      } else {
        console.warn("Invalid cart data in localStorage. Resetting to an empty array.");
        setCart([]);
      }
    }
  }, []);

  // Remove item from cart
  const handleRemoveItem = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Update item quantity
  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1 || isNaN(newQuantity)) return; // Prevent invalid quantities
    const updatedCart = [...cart];
    updatedCart[index].qty = newQuantity;

    // Recalculate total price based on the new quantity
    updatedCart[index].totalPrice =
      updatedCart[index].price *
      (1 - updatedCart[index].discount / 100) *
      newQuantity;

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate totals dynamically
  const subTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalDiscount = cart.reduce(
    (acc, item) => acc + (item.price * (item.discount || 0) * item.qty) / 100,
    0
  );
  const deliveryFee = 15; // Fixed delivery fee
  const total = subTotal - totalDiscount + deliveryFee;

  // Handle checkout
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const items = cart.map((item) => ({
        name: item.name, // Ensure the `name` field is included
        price: item.price,
        quantity: item.qty,
        image: item.imageUrl,
      }));
  
      console.log("Items being sent to the API:", items);
  
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/cart`,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Checkout API Error:", errorData);
        throw new Error(errorData.error || "Checkout failed. Please try again.");
      }
  
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert(error instanceof Error ? error.message : "An error occurred during checkout.");
    } finally {
      setLoading(false);
    }
  };

  // Render empty cart message if cart is empty
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl font-bold mb-4">Your cart is empty.</p>
        <button
          onClick={() => (window.location.href = "/products")}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Continue Shopping
        </button>
      </div>
    );
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
            Cart
          </h2>
        </div>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl sm:text-[40px] leading-[48px] font-integral font-bold md:ml-[100px] mb-8 text-center md:text-left">
        Your Cart
      </h1>

      {/* Cart Layout Container */}
      <div className="flex flex-col items-start justify-around sm:flex-row md:ml-[100px] gap-10">
        {/* Left Div - Cart Items */}
        <div className="flex flex-col gap-6 w-full md:w-2/3">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-5 sm:flex-row md:w-full md:h-auto border border-black p-3"
            >
              <Image
                src={item.imageUrl}
                alt={item.category || "Product Image"}
                width={100}
                height={100}
                className="object-contain overflow-hidden"
                priority
              />
              <div className="flex sm:flex-row justify-between w-full">
                <div>
                  <h2 className="font-satoshi text-lg sm:text-xl  font-bold leading-7">{item.name}</h2>
                  <h2 className="text-sm font-normal leading-5">Size: {item.size}</h2>
                  <h2 className="text-sm font-normal leading-5">Color: {item.color}</h2>
                  <h2 className="text-sm font-normal leading-8">Price/pc ${item.price}</h2>
                  <h2 className="text-sm font-normal leading-8">Discount: {item.discount}%</h2>
                </div>

                {/* Quantity & Remove Button */}
                <div className="flex flex-col items-end">
                  <RiDeleteBin5Fill
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-600 text-xl cursor-pointer"
                    aria-label="Remove item"
                  />
                  <div className="w-[126px] h-[44px] rounded-[62px] flex items-center justify-center gap-4 bg-white border">
                    <button
                      onClick={() => handleUpdateQuantity(index, item.qty - 1)}
                      aria-label="Decrease quantity"
                      className="w-5 h-5 hover:bg-black hover:text-white rounded-full flex items-center justify-center"
                    >
                      -
                    </button>
                    <h3 className="font-satoshi text-sm font-medium leading-5">{item.qty}</h3>
                    <button
                      onClick={() => handleUpdateQuantity(index, item.qty + 1)}
                      aria-label="Increase quantity"
                      className="w-5 h-5 hover:bg-black hover:text-white rounded-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Div - Order Summary */}
        <div className="w-full md:w-1/3 min-w-[300px] rounded-3xl border border-black py-5 px-6 flex flex-col justify-between mt-8 md:mt-0">
          <h1 className="text-2xl font-bold leading-8 mb-5">Order Summary</h1>

          {/* Calculations */}
          <div className="flex flex-col gap-5">
            <div className="flex justify-between">
              <h2 className="text-xl text-[#00000099]">Sub Total</h2>
              <h2 className="text-xl font-extrabold">${subTotal.toFixed(2)}</h2>
            </div>
            <div className="flex justify-between">
              <h2 className="text-xl text-[#00000099]">Total Discount </h2>
              <h2 className="text-xl font-extrabold text-red-500">-${totalDiscount.toFixed(2)}</h2>
            </div>
            <div className="flex justify-between">
              <h2 className="text-xl text-[#00000099]">Delivery Fee</h2>
              <h2 className="text-xl font-extrabold">${deliveryFee.toFixed(2)}</h2>
            </div>

            <div className="h-[1px] bg-[#0000001A]"></div>

            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">Total</h2>
              <h2 className="text-2xl font-extrabold">${total.toFixed(2)}</h2>
            </div>
          </div>

          {/* Checkout Button */}
          <SignedOut>
            <SignInButton>
              <button className="w-full mt-7 h-[50px] rounded-[10px] text-xl text-white bg-[#111111] hover:bg-[#000000] font-semibold leading-[24px]">
                Sign In to Checkout
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full mt-7 h-[50px] rounded-[10px] text-xl text-white bg-[#111111] hover:bg-[#000000] font-semibold leading-[24px]"
            >
              <div className="w-full flex items-center justify-center gap-2">
                {loading ? "Redirecting..." : "Checkout"}
              </div>
            </button>
          </SignedIn>
        </div>
      </div>
    </section>
  );
}
