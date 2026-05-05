import { getApiUrl, getAuthHeaders } from "..";

export const getTasks = async () => {
  try {
    const response = await fetch(`${getApiUrl()}todos`, {
      method: "GET",
      headers: getAuthHeaders(),
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

export const createTask = async (task) => {
  try {
    console.log("createTask service ", task);
    const response = await fetch(`${getApiUrl()}todos`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(task),
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

export const updateTask = async (task) => {
  try {
    const response = await fetch(`${getApiUrl()}todos/${task.id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(task),
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

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${getApiUrl()}todos/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      throw new Error(data.message?.[0] || data.message || "Request failed"); // ✅ throw on 4xx/5xx
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const toggleCompletion = async (id) => {
  try {
    const response = await fetch(`${getApiUrl()}todos/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      throw new Error(data.message?.[0] || data.message || "Request failed");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
