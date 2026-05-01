import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Pressable, TextInput } from "react-native";
import Text from "@/components/ui/Text";
import { formStyles } from "@/styles/forms";
import { colors } from "@/theme";

const getStrength = (pw) => {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
};

const strengthColor = (score) => {
  if (score <= 1) return colors.danger;
  if (score === 2) return colors.warning;
  if (score === 3) return colors.primary;
  return colors.success;
};

const strengthLabel = (score) => {
  if (score <= 1) return "Weak";
  if (score === 2) return "Fair";
  if (score === 3) return "Good";
  return "Strong";
};

export default function SignupScreen() {
  /** @type {import('@/types/navigation').AuthNavigation} */
  const navigation = useNavigation();

  const [focused, setFocused] = useState(null);
  const [password, setPassword] = useState("");

  const strength = getStrength(password);

  const inputStyle = (field) => [
    formStyles.input,
    focused === field
      ? {
          backgroundColor: colors.surface,
          borderColor: colors.primary,
        }
      : {
          backgroundColor: colors.primaryLight,
          borderColor: colors.border,
        },
  ];

  return (
    <View className="flex-1 justify-center bg-background px-6">
      {/* Logo */}
      <View className="items-center mb-8">
        <View className="bg-primary rounded-2xl p-3 mb-3">
          <Ionicons name="checkmark-done-sharp" size={40} color="white" />
        </View>

        <Text className="text-3xl font-bold text-primary-dark">Taskly</Text>

        <Text className="text-sm text-text-muted mt-1 font-semibold">
          Create your account
        </Text>
      </View>

      {/* Tabs */}
      <View className="flex-row bg-primary-light rounded-xl p-1 mb-6">
        <Pressable
          className="flex-1 py-2"
          onPress={() => navigation.navigate("Login")}
        >
          <Text className="font-bold text-center text-text-muted">Login</Text>
        </Pressable>

        <Pressable className="flex-1 bg-surface rounded-lg py-2 border border-border">
          <Text className="font-bold text-center text-primary">Sign up</Text>
        </Pressable>
      </View>

      {/* Fields */}
      <View className="gap-3 mb-4">
        {/* EMAIL */}
        <View style={formStyles.container}>
          <Text className="text-xs font-bold text-primary tracking-widest">
            EMAIL
          </Text>

          <TextInput
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={colors.textMuted}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            style={inputStyle("email")}
          />
        </View>

        {/* PASSWORD */}
        <View style={formStyles.container}>
          <Text className="text-xs font-bold text-primary tracking-widest">
            PASSWORD
          </Text>

          <TextInput
            placeholder="your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={colors.textMuted}
            onFocus={() => setFocused("password")}
            onBlur={() => setFocused(null)}
            style={inputStyle("password")}
          />

          {/* Strength */}
          {password.length > 0 && (
            <View className="mt-1">
              <View className="flex-row gap-1 mb-1">
                {[1, 2, 3, 4].map((i) => (
                  <View
                    key={i}
                    style={{
                      flex: 1,
                      height: 3,
                      borderRadius: 2,
                      backgroundColor:
                        i <= strength
                          ? strengthColor(strength)
                          : colors.primaryLight,
                    }}
                  />
                ))}
              </View>

              <Text
                style={{
                  fontSize: 10,
                  color: strengthColor(strength),
                  textAlign: "right",
                }}
              >
                {strengthLabel(strength)}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Button */}
      <Pressable className="bg-primary rounded-xl py-3 mb-4">
        <Text className="!text-primary-light font-bold text-center text-base">
          Create account
        </Text>
      </Pressable>

      {/* Terms */}
      <Text className="text-xs text-text-muted text-center">
        By signing up you agree to our{" "}
        <Text className="text-primary font-bold">Terms</Text> &{" "}
        <Text className="text-primary font-bold">Privacy Policy</Text>
      </Text>
    </View>
  );
}
