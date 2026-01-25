import { fetchAPI } from "../lib/api";
import { Category } from "../types";

export async function getAllCategories(): Promise<Category[]> {
  const response = await fetchAPI<Category[]>("/categories");
  console.log(response);
  return response;
}
