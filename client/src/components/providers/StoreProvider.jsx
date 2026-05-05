// src/components/StoreProvider.js
import { useUserStore } from "@/stores/user.store";
import { ActivityIndicator, View } from "react-native";
import { colors } from "@/theme";

export default function StoreProvider({ children }) {
  const hasHydrated = useUserStore((state) => state._hasHydrated);

  if (!hasHydrated)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F8FAFF",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    ); // or a splash/loading screen

  return children;
}
