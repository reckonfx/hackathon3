"use client";
import fetchProducts from "@/components/data";
import { useEffect, useState } from "react";
import { Product } from "../../../typings"; // Assuming Product type has slug and other fields
import Card from "@/components/card";
import Hero from "@/components/hero";
import Link from "next/link";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      console.log(data)
    };
    getProducts();
  }, []);
  

  return (
    <div className="">
      <Hero />
      <h1 className="text-5xl font-bold text-center my-10">All Products</h1>

      <div className="mt-10 grid grid-cols-1 place-items-center md:grid-cols-4 gap-5 mx-10 ">
        {products.map((item,i) => (
          <Link key={i} href={`/productDetails/${item.slug}`}>
            <div className="">
              <Card
                imageUrl={item.imageUrl}
                title={item.title}
                stars="/s1.png"
                ranking={item.description}
                price={item.price}
                className="rounded-3xl"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
