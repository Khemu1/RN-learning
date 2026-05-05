import { useUserStore } from "@/stores/user.store";

export const getApiUrl = () => {
  const url = process.env.EXPO_PUBLIC_API_URL;

  if (!url) {
    throw new Error("EXPO_PUBLIC_API_URL is not set");
  }
  return url;
};

export const getAuthHeaders = () => {
  const store = useUserStore.getState();

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (store.user?.token) {
    headers.Authorization = `Bearer ${store.user.token}`;
  }

  return headers;
};
