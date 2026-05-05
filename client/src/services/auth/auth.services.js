import { getApiUrl, getAuthHeaders } from "..";

/**
 *
 * @param {string} email
 * @param {string} password
 * @returns
 */
export const login = async (email, password) => {
  try {
    const response = await fetch(`${getApiUrl()}auth/login`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(data.message?.[0] || data.message || "Request failed");
    }

    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
/**
 *
 * @param {string} email
 * @param {string} password
 * @param {string} username
 * @returns
 */
export const register = async (email, password, username) => {
  try {
    console.log("register ", email, password, username);
    const response = await fetch(`${getApiUrl()}auth/signup`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ email, password, username }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message?.[0] || data.message || "Request failed"); // ✅ throw on 4xx/5xx
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
