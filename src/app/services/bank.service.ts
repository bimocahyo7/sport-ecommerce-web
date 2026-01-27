import { fetchAPI } from "../lib/api";
import { Bank } from "../types";

export async function getAllBanks(): Promise<Bank[]> {
  const response = await fetchAPI<Bank[]>("/banks");
  return response;
}
