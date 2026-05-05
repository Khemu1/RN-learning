import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthStackParams = {
  Login: undefined;
  Signup: undefined;
};

export type AppStackParams = {
  Tasks: undefined;
  "New-Task": undefined;
};

export type AuthNavigation = NativeStackNavigationProp<AuthStackParams>;
export type AppNavigation = NativeStackNavigationProp<AppStackParams>;
