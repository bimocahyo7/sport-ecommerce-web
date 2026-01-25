import { fetchAPI } from "../lib/api";
import { Product } from "../types";

export async function getAllProducts(): Promise<Product[]> {
  const response = await fetchAPI<Product[]>("/products");
  console.log("All Products", response);
  return response;
}

export async function getDetailProduct(id: string): Promise<Product> {
  const response = await fetchAPI<Product>(`/products/${id}`);
  console.log("Detail Product:", response);
  return response;
}
