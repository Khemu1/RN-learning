import { Swipeable } from "react-native-gesture-handler";
import { Pressable, View } from "react-native";
import Text from "@/components/ui/Text";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme";
import { useDeleteTask, useToggleCompletion } from "@/hooks/tasks.hooks";

export default function TaskItem({ task, onPress }) {
  const { mutateAsync: toggleCompletion } = useToggleCompletion();
  const { mutateAsync: deleteTask } = useDeleteTask();

  const handleToggle = async () => {
    try {
      await toggleCompletion(task.id);
    } catch (e) {
      console.log("Toggle failed", e);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
    } catch (e) {
      console.log("Delete failed", e);
    }
  };

  const renderRightActions = () => {
    return (
      <Pressable
        onPress={handleDelete}
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ff3b30",
          width: 80,
          marginBottom: 10,
          borderRadius: 12,
        }}
      >
        <Ionicons name="trash" size={22} color="white" />
      </Pressable>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Pressable
        onPress={onPress}
        style={{
          backgroundColor: colors.surface,
          borderRadius: 12,
          padding: 16,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* ✅ Checkbox */}
        <Pressable onPress={handleToggle}>
          <Ionicons
            name={!task.completed ? "square-outline" : "checkmark-circle"}
            size={24}
            color={task.completed ? colors.primary : colors.textMuted}
          />
        </Pressable>

        {/* ✅ Text content */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: "600",
              textDecorationLine: task.completed ? "line-through" : "none",
              color: task.completed ? colors.textMuted : colors.text,
            }}
          >
            {task.title}
          </Text>

          {!!task.description && (
            <Text style={{ fontSize: 12, color: colors.textMuted }}>
              {task.description}
            </Text>
          )}
        </View>
      </Pressable>
    </Swipeable>
  );
}
