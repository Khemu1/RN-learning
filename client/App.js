import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // 👈 add this

// @ts-ignore
import "./global.css";
import { View } from "react-native";
import StoreProvider from "@/components/providers/StoreProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { colors } from "@/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded) return <View />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <StoreProvider>
            <RootNavigator />
          </StoreProvider>
        </QueryClientProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
