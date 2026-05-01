import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Pressable, TextInput } from "react-native";
import Text from "@/components/ui/Text";

export default function LoginScreen() {
  /** @type {import('@/types/navigation').AuthNavigation} */
  const navigation = useNavigation();
  const [focused, setFocused] = useState(null);
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const inputStyle = (field) => ({
    backgroundColor:
      focused === field ? "var(--color-surface)" : "var(--color-primary-light)",
    borderColor:
      focused === field ? "var(--color-primary)" : "var(--color-border)",
  });

  return (
    <View className="flex-1 justify-center bg-background px-6">
      {/* Logo */}
      <View className="items-center mb-8">
        <View className="bg-primary rounded-2xl p-3 mb-3">
          <Ionicons name="checkmark-done-sharp" size={40} color="white" />
        </View>
        <Text className="text-3xl font-bold text-primary-dark">Taskly</Text>
        <Text className="text-sm text-text-muted mt-1">Welcome back</Text>
      </View>

      {/* Tab switcher */}
      <View className="flex-row bg-primary-light rounded-xl p-1 mb-6">
        <Pressable className="flex-1 bg-surface rounded-lg py-2 border border-border">
          <Text className="font-bold text-center text-primary">Login</Text>
        </Pressable>
        <Pressable
          className="flex-1 py-2"
          onPress={() => navigation.navigate("Signup")}
        >
          <Text className="font-bold text-center text-text-muted">Sign up</Text>
        </Pressable>
      </View>

      {/* Fields */}
      <View className="gap-3 mb-2">
        <View className="gap-1 input-container">
          <Text className="text-xs font-bold text-primary tracking-widest">
            EMAIL
          </Text>
          <TextInput
            value={fields.email}
            onChangeText={(e) => setFields({ ...fields, email: e })}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="var(--color-text-muted)"
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            style={inputStyle("email")}
          />
        </View>

        <View className="gap-1 input-container">
          <Text className="text-xs font-bold text-primary tracking-widest">
            PASSWORD
          </Text>
          <TextInput
            value={fields.password}
            onChangeText={(e) => setFields({ ...fields, password: e })}
            placeholder="your password"
            secureTextEntry
            placeholderTextColor="var(--color-text-muted)"
            onFocus={() => setFocused("password")}
            onBlur={() => setFocused(null)}
            style={inputStyle("password")}
          />
        </View>
      </View>

      {/* Login button */}
      <Pressable className="bg-primary rounded-xl py-3 mb-4">
        <Text className=" !text-primary-light font-bold text-center text-base">
          Log in
        </Text>
      </Pressable>

      {/* Bottom link */}
      <Pressable onPress={() => navigation.navigate("Signup")}>
        <Text className="text-xs text-text-muted text-center">
          No account? <Text className="text-primary font-bold">Sign up</Text>
        </Text>
      </Pressable>
    </View>
  );
}
