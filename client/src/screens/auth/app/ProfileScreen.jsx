import { useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import Text from "@/components/ui/Text";
import { colors } from "@/theme";
import { useUserStore } from "@/stores/user.store";

export default function ProfileScreen() {
  const { user, reset } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    email: user?.email || "",
    username: user?.username || "",
    password: "",
  });

  const handleSave = () => {
    console.log("Saved:", form);
    setIsEditing(false);
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        paddingTop: 60,
        backgroundColor: colors.background,
      }}
    >
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "700" }}>Profile</Text>

        <Pressable onPress={() => setIsEditing((p) => !p)}>
          <Text style={{ color: colors.primary, fontWeight: "600" }}>
            {isEditing ? "Cancel" : "Edit"}
          </Text>
        </Pressable>
      </View>
      <Text style={{ color: colors.textMuted, marginBottom: 20 }}>
        Manage your account information
      </Text>
      <Text style={{ marginBottom: 6, fontWeight: "600" }}>Email</Text>
      {isEditing ? (
        <TextInput
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          placeholder="Enter email"
          placeholderTextColor={colors.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 10,
            padding: 12,
            marginBottom: 16,
            color: colors.text,
            backgroundColor: colors.surface,
          }}
        />
      ) : (
        <View style={{ marginBottom: 18 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: colors.text,
              marginTop: 4,
            }}
          >
            {form.email || "No email"}
          </Text>
        </View>
      )}
      {/* USERNAME */}
      <Text style={{ marginBottom: 6, fontWeight: "600" }}>Username</Text>
      {isEditing ? (
        <TextInput
          value={form.username}
          onChangeText={(text) => setForm({ ...form, username: text })}
          placeholder="Enter username"
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 10,
            padding: 12,
            marginBottom: 16,
            color: colors.text,
            backgroundColor: colors.surface,
          }}
        />
      ) : (
        <View
          style={{
            marginBottom: 18,
            padding: 14,
            borderRadius: 12,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ color: colors.textMuted, fontSize: 12 }}>
            USERNAME
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: colors.primary,
              marginTop: 4,
            }}
          >
            @{form.username || "no_username"}
          </Text>
        </View>
      )}
      {/* PASSWORD */}
      <Text style={{ marginBottom: 6, fontWeight: "600" }}>Password</Text>
      {isEditing ? (
        <TextInput
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
          placeholder="New password"
          placeholderTextColor={colors.textMuted}
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 10,
            padding: 12,
            marginBottom: 24,
            color: colors.text,
            backgroundColor: colors.surface,
          }}
        />
      ) : (
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 16,
              color: colors.textMuted,
              marginTop: 6,
            }}
          >
            ••••••••••
          </Text>
        </View>
      )}
      {isEditing && (
        <Pressable
          onPress={handleSave}
          style={{
            backgroundColor: colors.primary,
            padding: 14,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>
            Save Changes
          </Text>
        </Pressable>
      )}
      {!isEditing && (
        <Pressable
          onPress={() => reset()}
          style={{
            marginTop: 20,
            backgroundColor: "#EF4444",
            padding: 14,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>Logout</Text>
        </Pressable>
      )}
    </View>
  );
}
