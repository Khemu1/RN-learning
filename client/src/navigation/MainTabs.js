import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TasksScreen from "@/screens/auth/app/TasksScreen";
import ProfileScreen from "@/screens/auth/app/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      id="main-tabs"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: colors.textMuted,

        tabBarIcon: ({ color, size }) => {
          let icon;

          if (route.name === "Tasks") icon = "checkmark-done";
          if (route.name === "Profile") icon = "person";

          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
