import { fetchAPI, getAuthHeaders } from "../lib/api";
import { Bank } from "../types";

export async function getAllBanks(): Promise<Bank[]> {
  const response = await fetchAPI<Bank[]>("/banks");
  return response;
}

export async function createBank(data: Partial<Bank>): Promise<Bank> {
  const response = await fetchAPI<Bank>("/banks", {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
}

export async function updateBank(id: string, data: Partial<Bank>): Promise<Bank> {
  const response = await fetchAPI<Bank>(`/banks/${id}`, {
    method: "PUT",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
}

export async function deleteBank(id: string): Promise<void> {
  const response = await fetchAPI<void>(`/banks/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
  });

  return response;
}
