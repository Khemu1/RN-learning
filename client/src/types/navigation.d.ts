import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AppStackParams = {
  Tasks: undefined;
  "New-Task": undefined;
  Login: undefined;
  Signup: undefined;
  Main: unedfined;
};

export type AppNavigation = NativeStackNavigationProp<AppStackParams>;
