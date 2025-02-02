import { client } from "@/sanity/lib/client";
import { Product } from "../../typings";



// Fetch data from Sanity
export default async function fetchProducts(): Promise<Product[]> {
  const query = `*[_type == "products"]{
    title,
    price,
    description,
    "imageUrl": image.asset->url,
    category,
    discount,
    new,
    color,
    size,
    "slug" : slug.current
  }`;

  // Fetch the data and return it
  const products: Product[] = await client.fetch(query);
  return products;
}
