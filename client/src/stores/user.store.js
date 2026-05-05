import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ✅ Wrap in a function so it's called lazily, not at import time
const getStorage = () => {
  if (Platform.OS === "web") return localStorage;
  return AsyncStorage;
};

// ✅ Web-safe helpers to replace direct AsyncStorage calls
const storageGetItem = async (key) => {
  if (Platform.OS === "web") return localStorage.getItem(key);
  return AsyncStorage.getItem(key);
};

const storageSetItem = async (key, value) => {
  if (Platform.OS === "web") return localStorage.setItem(key, value);
  return AsyncStorage.setItem(key, value);
};

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      _hasHydrated: false,

      setUser: async (user) => {
        const currentDeviceToken = await get().getDeviceToken();
        if (!user) {
          set({ user: null });
          return;
        }
        const { deviceToken, ...safeUser } = user;
        if (deviceToken) {
          await storageSetItem("user_device_token", deviceToken); // ✅
        } else if (currentDeviceToken) {
          safeUser.deviceToken = currentDeviceToken;
        }
        set({ user: safeUser });
      },

      reset: async () => {
        const deviceToken = await get().getDeviceToken();
        set({ user: null });
        if (deviceToken) {
          await storageSetItem("user_device_token", deviceToken); // ✅
        }
      },

      updateUser: (incomingUser) => {
        const currentUser = get().user;
        const { token, ...safeIncoming } = incomingUser;
        const updatedUser = currentUser
          ? { ...currentUser, ...safeIncoming }
          : { ...safeIncoming };
        if (token) updatedUser.token = token;
        set({ user: updatedUser });
      },

      getDeviceToken: async () => {
        const token = await storageGetItem("user_device_token"); // ✅
        return token ?? undefined;
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(getStorage), // ✅ pass function, not result
      onRehydrateStorage: () => (state, error) => {
        if (!error) {
          useUserStore.setState({ _hasHydrated: true });
        }
      },
    },
  ),
);

export const useUserStoreActions = () => {
  const setUser = useUserStore((state) => state.setUser);
  const reset = useUserStore((state) => state.reset);
  const updateUser = useUserStore((state) => state.updateUser);
  const getDeviceToken = useUserStore((state) => state.getDeviceToken);
  return { setUser, reset, updateUser, getDeviceToken };
};
