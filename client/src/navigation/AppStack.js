import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TasksScreen from "@/screens/auth/app/TasksScreen";
import NewTask from "@/screens/auth/app/NewTask";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      id="app"
      screenOptions={{
        headerShown: false,

        contentStyle: {
          backgroundColor: "#F8FAFF",
        },
      }}
    >
      <Stack.Screen name="Tasks" component={TasksScreen} />
      <Stack.Screen name="New-Task" component={NewTask} />
    </Stack.Navigator>
  );
}
