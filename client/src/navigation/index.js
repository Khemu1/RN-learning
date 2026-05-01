import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const isLoggedIn = false;

  return isLoggedIn ? <AppStack /> : <AuthStack />;
}
