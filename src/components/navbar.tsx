"use client";
import Link from "next/link";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [totalItems, setTotalItems] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // Track mobile menu state

  const updateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setTotalItems(storedCart.length);
  };

  useEffect(() => {
    updateCartCount();
    const storageListener = (e: StorageEvent) => {
      if (e.key === "cart") updateCartCount();
    };
    window.addEventListener("storage", storageListener);
    return () => window.removeEventListener("storage", storageListener);
  }, []);

  return (
    <div className="bg-white m-auto py-5">
      {/* Top Banner Section */}
      <section className="w-full bg-black flex items-center justify-center">
        <div className="max-w-[1440px] px-4">
          <h2 className="text-[14px] font-normal leading-[18.9px] text-white text-center">
            Sign up and get 20% off your first order.{" "}
            <span className="font-medium underline">Sign Up Now</span>
          </h2>
        </div>
      </section>

      {/* Navbar Section */}
      <div className="md:max-w-full md:h-[48px] md:ml-[100px] flex items-center gap-5 justify-between bg-white mt-[62px] md:mx-16 text-black">
        {/* Logo & Mobile Menu Button */}
        <div className="flex gap-5 ml-4 items-center">
          {/* Hamburger Icon */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <span>&#10005;</span> : <span>&#9776;</span>} {/* X and ☰ symbols */}
          </button>

          <Link href="/">
            <h1 className="text-[25.2px] md:text-5xl font-extrabold leading-[30.24px] md:leading-[38.4px] font-integral-extra">
              SHOP.CO
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-[24px] font-satoshi">
          <ul className="md:text-[16px] font-normal leading-[21.6px] flex items-center gap-6">
            <li className="flex items-center font-satoshi">
              <Link href={"/products"}>Shop</Link>
              <IoIosArrowDown className="ml-1" />
            </li>
            <li><Link href={"/casual"}>On Sale</Link></li>
            <li><Link href={"/GraphicTshirt"}>New Arrivals</Link></li>
            <li><Link href={"/casual"}>Brands</Link></li>
          </ul>
        </div>

        {/* Mobile Menu (Visible When menuOpen is True) */}
        {menuOpen && (
          <div className="md:hidden absolute top-36 left-0 w-full bg-white shadow-lg z-50">
            <ul className="flex flex-col items-center py-4 gap-4">
              <li><Link href={"/products"} onClick={() => setMenuOpen(false)} className="hover:bg-gray-300">Shop</Link></li>
              <li><Link href={"/casual"} onClick={() => setMenuOpen(false)} className="hover:bg-gray-300">On Sale</Link></li>
              <li><Link href={"/GraphicTshirt"} onClick={() => setMenuOpen(false)} className="hover:bg-gray-300">New Arrivals</Link></li>
              <li><Link href={"/casual"} onClick={() => setMenuOpen(false)} className="hover:bg-gray-300">Brands</Link></li>
            </ul>
          </div>
        )}

        {/* Search Box & Icons */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-[#F0F0F0] rounded-[62px] py-3 px-4">
            <IoIosSearch className="w-5 h-5" />
            <input type="text" placeholder="Search for products..." className="hidden md:block bg-[#F0F0F0] w-full border-none" />
          </div>

          <div className="flex items-center relative">
            <Link href={"/cart"}>
              <FiShoppingCart className="w-5 h-5" />
            </Link>
            <FaRegUserCircle className="w-5 h-5 ml-4" />

            {/* Cart Badge */}
            {totalItems > 0 && (
              <span className="absolute -top-4 left-1 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
