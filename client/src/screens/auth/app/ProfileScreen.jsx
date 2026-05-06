import { useState } from "react";
import { View, TextInput, Pressable, Alert } from "react-native";
import Text from "@/components/ui/Text";
import { colors } from "@/theme";
import { useUserStore } from "@/stores/user.store";
import { useUpdateUser, useDeleteUser } from "@/hooks/users.hooks"; // update path as needed

export default function ProfileScreen() {
  const { user, reset } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const [form, setForm] = useState({
    email: user?.email || "",
    username: user?.username || "",
    password: "",
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const payload = {
        email: form.email,
        username: form.username,
        ...(form.password ? { password: form.password } : {}),
      };
      await updateUser(payload);
      setIsEditing(false);
    } catch (error) {
      Alert.alert("Error", "Failed to update profile. Please try again.");
      console.error("handleSave error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => reset() },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action is permanent and cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setIsLoading(true);
            try {
              await deleteUser();
              reset();
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to delete account. Please try again.",
              );
              console.error("handleDeleteAccount error", error);
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
    );
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
        <Pressable onPress={() => setIsEditing((p) => !p)} disabled={isLoading}>
          <Text style={{ color: colors.primary, fontWeight: "600" }}>
            {isEditing ? "Cancel" : "Edit"}
          </Text>
        </Pressable>
      </View>

      <Text style={{ color: colors.textMuted, marginBottom: 20 }}>
        Manage your account information
      </Text>

      {/* EMAIL */}
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
          <Text style={{ fontSize: 16, color: colors.textMuted, marginTop: 6 }}>
            ••••••••••
          </Text>
        </View>
      )}

      {/* SAVE */}
      {isEditing && (
        <Pressable
          onPress={handleSave}
          disabled={isLoading}
          style={{
            backgroundColor: isLoading ? colors.border : colors.primary,
            padding: 14,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Text>
        </Pressable>
      )}

      {/* LOGOUT + DELETE */}
      {!isEditing && (
        <>
          <Pressable
            onPress={handleLogout}
            disabled={isLoading}
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

          <Pressable
            onPress={handleDeleteAccount}
            disabled={isLoading}
            style={{
              marginTop: 12,
              backgroundColor: "transparent",
              padding: 14,
              borderRadius: 10,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#EF4444",
            }}
          >
            <Text style={{ color: "#EF4444", fontWeight: "600" }}>
              {isLoading ? "Deleting..." : "Delete Account"}
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
}
