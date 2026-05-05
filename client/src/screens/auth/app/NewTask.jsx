import React, { useState } from "react";
import {
  Pressable,
  TextInput,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import Text from "@/components/ui/Text";
import { colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useCreateTask } from "@/hooks/tasks.hooks";
import { useNavigation } from "@react-navigation/native";

const NewTask = () => {
  /** @type {import('@/types/navigation').AppNavigation} */

  const navigation = useNavigation();
  const [task, setTask] = useState({ title: "", description: "" });
  const [focusedField, setFocusedField] = useState(null);

  const { mutateAsync: createTask, isPending } = useCreateTask();

  /**
   *
   * @param {string} field
   * @returns
   */
  const inputStyle = (field) => ({
    borderWidth: 1,
    borderColor: focusedField === field ? colors.textMuted : colors.border,
    borderRadius: 12,
    padding: 12,
    color: colors.text,
    backgroundColor: colors.surface,
    fontSize: 15,
  });

  const handleSubmit = async () => {
    await createTask(task, {
      onSuccess: () => {
        navigation.navigate("Main");
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingTop: 60,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{ fontSize: 26, fontWeight: "700", color: colors.text }}>
            New Task
          </Text>
          <Text style={{ fontSize: 14, color: colors.textMuted, marginTop: 4 }}>
            Fill in the details below to create a task
          </Text>
        </View>

        <View style={{ gap: 20 }}>
          {/* Title Field */}
          <View style={{ gap: 6 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Ionicons
                name="create-outline"
                size={15}
                color={colors.textMuted}
              />
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 13,
                  color: colors.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Title
              </Text>
            </View>
            <TextInput
              value={task.title}
              onChangeText={(text) => setTask({ ...task, title: text })}
              placeholder="e.g. Buy groceries"
              placeholderTextColor={colors.textMuted}
              onFocus={() => setFocusedField("title")}
              onBlur={() => setFocusedField(null)}
              style={inputStyle("title")}
            />
          </View>

          {/* Description Field */}
          <View style={{ gap: 6 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Ionicons
                name="document-text-outline"
                size={15}
                color={colors.textMuted}
              />
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 13,
                  color: colors.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Description
              </Text>
            </View>
            <TextInput
              value={task.description}
              onChangeText={(text) => setTask({ ...task, description: text })}
              placeholder="Add more details about the task..."
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              onFocus={() => setFocusedField("description")}
              onBlur={() => setFocusedField(null)}
              style={[inputStyle("description"), { minHeight: 110 }]}
            />
          </View>

          {/* Save Button */}
          <Pressable
            onPress={() => {
              console.log("onPress");
              handleSubmit();
            }}
            disabled={isPending}
            style={{
              backgroundColor: colors.primary,
              padding: 15,
              display: "flex",
              flexDirection: "row",
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 8,
            }}
          >
            {isPending ? (
              <ActivityIndicator size="small" color={"white"} />
            ) : (
              <View className="flex-row gap-2 items-center">
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color="white"
                />
                <Text className="!text-white">Save</Text>
              </View>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewTask;
