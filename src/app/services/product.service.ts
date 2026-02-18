import { fetchAPI, getAuthHeaders } from "../lib/api";
import { Product } from "../types";

export async function getAllProducts(): Promise<Product[]> {
  const response = await fetchAPI<Product[]>("/products");
  return response;
}

export async function getDetailProduct(id: string): Promise<Product> {
  const response = await fetchAPI<Product>(`/products/${id}`);
  return response;
}

export async function createProduct(data: FormData): Promise<Product> {
  return await fetchAPI<Product>("/products", {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
    },
    body: data,
  });
}

export async function updateProduct(id: string, data: FormData): Promise<Product> {
  return await fetchAPI<Product>(`/products/${id}`, {
    method: "PUT",
    headers: {
      ...getAuthHeaders(),
    },
    body: data,
  });
}

export async function deleteProduct(id: string): Promise<void> {
  return await fetchAPI<void>(`/products/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });
}
