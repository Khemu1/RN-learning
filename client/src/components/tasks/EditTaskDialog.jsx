import { colors } from "@/theme";
import React, { useEffect, useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import UserDialog from "../ui/UserDialog";
import { useDialogStore } from "@/stores/dialog.store";
import Text from "@/components/ui/Text";
import { useUpdateTask } from "@/hooks/tasks.hooks";

const EditTaskDialog = ({ task }) => {
  const { close, isOpen } = useDialogStore();
  const { mutateAsync: updateTask, isPending } = useUpdateTask();

  const [editingTask, setEditingTask] = useState({
    id: 0,
    title: "",
    description: "",
  });

  useEffect(() => {
    if (task) {
      setEditingTask({
        id: task.id,
        title: task.title || "",
        description: task.description || "",
      });
    }
  }, [task]);

  const handleSave = async () => {
    try {
      await updateTask(
        {
          ...editingTask,
        },
        {
          onSuccess: () => {
            close();
          },
        },
      );

      close("edit-task", task.id);
    } catch (e) {
      console.log("Update failed", e);
    }
  };

  if (!task) return null;

  return (
    <UserDialog
      open={isOpen("edit-task", task.id)}
      onClose={() => close("edit-task", task.id)}
      title="Edit Task"
    >
      <View style={{ gap: 10 }}>
        {/* Title */}
        <TextInput
          value={editingTask.title}
          onChangeText={(text) =>
            setEditingTask((prev) => ({ ...prev, title: text }))
          }
          placeholder="Title"
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 10,
            padding: 10,
            color: colors.text,
          }}
        />

        {/* Description */}
        <TextInput
          value={editingTask.description}
          onChangeText={(text) =>
            setEditingTask((prev) => ({ ...prev, description: text }))
          }
          placeholder="Description"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 10,
            padding: 10,
            color: colors.text,
            minHeight: 100,
          }}
        />

        {/* Save */}
        <Pressable
          onPress={handleSave}
          disabled={isPending}
          style={{
            backgroundColor: colors.primary,
            padding: 12,
            borderRadius: 10,
            alignItems: "center",
            opacity: isPending ? 0.6 : 1,
          }}
        >
          <Text style={{ color: "white" }}>
            {isPending ? "Saving..." : "Save"}
          </Text>
        </Pressable>
      </View>
    </UserDialog>
  );
};

export default EditTaskDialog;
