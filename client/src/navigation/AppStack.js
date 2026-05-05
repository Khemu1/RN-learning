import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "@/navigation/MainTabs";
import NewTask from "@/screens/auth/app/NewTask";
import { colors } from "@/theme";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
      id="app-stack"
    >
      <Stack.Screen name="Main" component={MainTabs} />

      <Stack.Screen name="New-Task" component={NewTask} />
    </Stack.Navigator>
  );
}
