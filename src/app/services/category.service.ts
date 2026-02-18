import { fetchAPI, getAuthHeaders } from "../lib/api";
import { Category } from "../types";

export async function getAllCategories(): Promise<Category[]> {
  const response = await fetchAPI<Category[]>("/categories");
  return response;
}

export async function createCategory(data: FormData): Promise<Category> {
  const response = await fetchAPI<Category>("/categories", {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
    },
    body: data,
  });

  return response;
}

export async function updateCategory(id: string, data: FormData): Promise<Category> {
  const response = await fetchAPI<Category>(`/categories/${id}`, {
    method: "PUT",
    headers: {
      ...getAuthHeaders(),
    },
    body: data,
  });

  return response;
}

export async function deleteCategory(id: string): Promise<void> {
  const response = await fetchAPI<void>(`/categories/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  return response;
}
