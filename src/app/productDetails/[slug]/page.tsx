"use client";

import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import fetchProducts from "@/components/data";
import { ICart, Product } from "../../../../typings";
import { log } from "console";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>("");
  const [product, setProduct] = useState<any>(null); // State to store the fetched product
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [cart, setCart] = useState<ICart[]>([]); // State to manage cart items

  useEffect(() => {
    const fetchProductData = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);

      // Fetch products from data.tsx
      const products: Product[] = await fetchProducts();

      // Find the product by slug
      const foundProduct = products.find((product) => product.slug === resolvedParams.slug);
      setProduct(foundProduct); // Set the found product in state
    };
    fetchProductData();
  }, [params]);

  // If the product is not available, show loading message
  if (!product) return <p>Loading...</p>;

  // Handle quantity change
  const handleQuantityChange = (operation: "increase" | "decrease") => {
    setQuantity((prev) => {
      if (operation === "increase") return prev + 1;
      if (prev > 1) return prev - 1;
      return prev;
    });
  };

  // Handle adding product to cart
  const handleAddToCart = (product: Product) => {
    if (selectedColor && selectedSize && product) {
      const totalPrice = product.price * (1 - product.discount / 100) * quantity;
  
      const newCartItem = {
        product,
        imageUrl: product.imageUrl, // Correct property name
        color: selectedColor,
        size: selectedSize,
        quantity,
        totalPrice,
      };
  
      // Get cart from localStorage
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  
      if (!Array.isArray(storedCart)) {
        console.warn("Invalid cart data in localStorage. Resetting to an empty array.");
        localStorage.setItem("cart", JSON.stringify([]));
      }
  
      // Find the index of the item in the cart with the same title, color, and size
      const existingItemIndex = storedCart.findIndex(
        (item:any) =>
          item.product.title === newCartItem.product.title &&
          item.color === newCartItem.color &&
          item.size === newCartItem.size
      );
  
      let updatedCart;
      if (existingItemIndex !== -1) {
        // If the item exists, update the quantity and totalPrice
        const updatedCartItems = [...storedCart];
        updatedCartItems[existingItemIndex].quantity += quantity; // Add the new quantity to the existing one
        updatedCartItems[existingItemIndex].totalPrice =
          updatedCartItems[existingItemIndex].quantity *
          product.price *
          (1 - product.discount / 100);
        updatedCart = updatedCartItems;
      } else {
        // If the item doesn't exist, add it to the cart
        updatedCart = [...storedCart, newCartItem];
      }
  
      // Update localStorage and state
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
  
      alert("Item successfully added to the cart!");
    } else {
      alert("Please select a color, size, and make sure the product is loaded.");
    }
  };
  
  return (
    <main className="w-[1240px] h-auto md:ml-[100px] ml-4 md:mb-24 mb-5">
      {/* Breadcrumbs */}
      <div className="w-[400px] h-[19px] flex items-center justify-between gap-[6px] ml-4 mt-2">
        {["Home", "Shop", "Men", product?.name].map((crumb, index) => (
          <div key={index} className="flex items-center gap-1">
            <h2
              className={`font-satoshi text-sm font-normal leading-[18.9px] ${
                index === 3 ? "text-black" : "text-[#00000099]"
              }`}
            >
              {crumb}
            </h2>
            {index < 3 && <IoIosArrowForward />}
          </div>
        ))}
      </div>

      {/* Product Details Section */}
      <div className="w-full flex flex-col md:flex-row md:justify-between gap-5 md:gap-10 mt-5">
        {/* Product Images */}
        <div className="md:w-[50%] flex flex-col-reverse md:flex-row gap-5">
          {/* Smaller Images Column */}
          <div className="flex md:flex-col gap-2 md:w-[30%]">
            <Image
              src={product.imageUrl || "/fallback-image.png"} // Fallback image if `product.imageUrl` is missing
              alt={product.name || "product Image"}
              width={111}
              height={106}
              className="w-[111px] h-[106px] md:w-[152px] md:h-[167px] rounded-[20px] bg-[#F0EEED] hover:scale-105"
            />
            <Image
              src={product.imageUrl || "/fallback-image.png"} // Fallback image if `product.imageUrl` is missing
              alt={product.name || "product Image"}
              width={111}
              height={106}
              className="w-[111px] h-[106px] md:w-[152px] md:h-[167px] rounded-[20px] bg-[#F0EEED] hover:scale-105"
            />
            <Image
              src={product.imageUrl || "/fallback-image.png"} // Fallback image if `product.imageUrl` is missing
              alt={product.name || "product Image"}
              width={111}
              height={106}
              className="w-[111px] h-[106px] md:w-[152px] md:h-[167px] rounded-[20px] bg-[#F0EEED] hover:scale-105"
            />
          </div>

          {/* Main Image */}
          <Image
            src={product.imageUrl || "/fallback-image.png"} // Fallback image if `product.imageUrl` is missing
            alt={product.name || "Product Image"} // Fallback alt text
            width={358}
            height={290}
            className="w-[358px] h-[290px] md:w-[444px] md:h-[530px] rounded-[20px] bg-[#F0EEED] hover:scale-105"
          />
        </div>

        {/* Product Information */}
        <div className="md:w-[40%] flex-1 flex flex-col gap-4">
          <h1 className="text-lg md:text-5xl font-bold">{product.title}</h1>
          <div className="flex text-yellow-500 gap-2">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <FaStar key={index} />
              ))}
          </div>
          <h2 className="flex items-center gap-3 text-2xl font-bold">
            ${(product.price * (1 - product.discount / 100)).toFixed(2)}
            {product.discount && (
              <>
                <span className="line-through text-[#0000004D]">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-red-500 bg-[#FF33331A] rounded-[62px] px-4 py-1">
                  - {product.discount}%
                </span>
              </>
            )}
          </h2>

          <p className="text-[#00000099] text-justify w-[350px] md:w-[550px]">{product.description}</p>

          {/* Select Colors */}
          <div className="mt-5">
            <h2 className="text-sm">Select Colors</h2>
            <div className="flex gap-2">
              {product.color?.map((color: any, i: number) => (
                <button
                  key={i}
                  className={`w-[39px] h-[39px] md:w-[37px] active:outline-double md:h-[37px] rounded-full flex items-center justify-center ${
                    color === selectedColor ? "border-2 border-black" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Choose Size */}
          <div className="mt-5">
            <h2 className="text-sm">Choose Size</h2>
            <div className="flex gap-3">
              {product.size?.map((size: any, i: number) => (
                <button
                  key={i}
                  className={`w-[60px] h-[30px] rounded-md border text-sm md:text-base font-bold ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "border-[#00000099] text-black"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Control */}
          <div className="flex items-center gap-2 mt-5">
          <h2 className="text-sm">Choose quantity</h2>
            <button onClick={() => handleQuantityChange("decrease")} className=" bg-transparent border border-black p-1">-</button>
            <span className="readonly">{quantity}</span>
            <button onClick={() => handleQuantityChange("increase")} className=" bg-transparent border border-black p-1">+</button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => handleAddToCart(product)}
            className="w-[350px]  text-white bg-black rounded-[8px] mt-4 px-6 py-3 font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
