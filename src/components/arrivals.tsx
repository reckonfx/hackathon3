
"use client"
import { useEffect, useState } from "react";
import fetchProducts from "./data"; // Import your fetchProducts function
import Card from "./card"; // Import the Card component
import { Product } from "../../typings";
import Link from "next/link";

export default function Arrivals() {
  const [products, setProducts] = useState<Product[]>([]); // State to hold the fetched products

  // Fetch data when the component mounts
  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts(); // Fetch products using the asynchronous function
      console.log(data)
      setProducts(data.slice(4,8)); // Update the state with the fetched data
    };

    getProducts();
  }, []);

  return (
    <>
      <div className="bg-white flex items-center flex-col justify-center object-cover  ">
        <h1 className="pt-5 font-integral text-[48px] font-bold leading-[57.6px]">
          New Arrivals
        </h1>
        
        
        
        <div className="w-full h-fit flex items-center justify-between md:mx-[100px] gap-4 md:gap-3 md:mt-10 ">

          {products.map((item, index) => (
            < div key={index}> 
            <Link href={`productDetails/${item.slug}`}>
            
            <Card
              key={index} // Use a unique key for each item
              imageUrl={item.imageUrl} // Use the imageUrl field from the data
              title={item.title} // Use the name field from the data
              stars="/s1.png" // You can update this field as per your requirement
              ranking="4.5/5" // Adjust ranking logic based on your data
              price={item.price} // Use the price field from the data
              className="w-[200px] h-[200px] md:w-[295px] md:h-[298px] rounded-[13.42px] md:rounded-[20px] bg-[#F0EEED] "
            />
            </Link>

            </div>
          ))}
        </div>

        <Link href={"../products"}><button className="w-[358px] h-[46px] md:w-[295px] md:h-[52px] rounded-[62px] py-4 px-[54px] md:rounded-[20px] m-5 md:m-36 bg-[#0000001A] md:bg-[#0000001A] hover:bg-gray-200 flex items-center justify-center">
          View All
        </button></Link>
      </div>
    </>
  );
}
