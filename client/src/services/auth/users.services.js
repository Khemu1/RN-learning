import { getApiUrl, getAuthHeaders } from "..";

/**
 *
 * @param {import('@/types/index').UpdateUser} user
 * @returns
 */
export const updateMyData = async (user) => {
  try {
    const response = await fetch(`${getApiUrl()}auth`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(user),
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      throw new Error(data.message?.[0] || data.message || "Request failed");
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteMyData = async () => {
  try {
    const response = await fetch(`${getApiUrl()}auth`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      throw new Error(data.message?.[0] || data.message || "Request failed");
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
