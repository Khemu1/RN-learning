import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { useUserStore } from "@/stores/user.store";

export default function RootNavigator() {
  const user = useUserStore((state) => state.user);
  console.log("user", user);

  return user?.id && user.token ? <AppStack /> : <AuthStack />;
}
