import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  TextInput,
  View,
} from "react-native";
import Text from "@/components/ui/Text";
import { colors } from "@/theme";
import { useDialogStore } from "@/stores/dialog.store";
import { useNavigation } from "@react-navigation/native";
import TaskItem from "@/components/tasks/TaskItem";
import { useGetTasks } from "@/hooks/tasks.hooks";
import { useUserStore } from "@/stores/user.store";
import EditTaskDialog from "@/components/tasks/EditTaskDialog";

export default function TasksScreen() {
  const { user } = useUserStore();
  const { data: tasks = [], isLoading } = useGetTasks(user?.id);

  /** @type {import('@/types/navigation').AppNavigation} */
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const [editingTask, setEditingTask] = useState(null);

  const { open } = useDialogStore();

  const filtered = useMemo(() => {
    if (!tasks) return [];
    return tasks.filter((t) => {
      const matchesSearch = t.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesTab =
        activeTab === "all"
          ? true
          : activeTab === "active"
            ? !t.completed
            : t.completed;

      return matchesSearch && matchesTab;
    });
  }, [search, activeTab, tasks]);

  if (!user?.id) return null;

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View style={{ padding: 20, paddingTop: 60 }}>
        <Text style={{ fontSize: 28, fontWeight: "700" }}>My Tasks</Text>
        <Text style={{ color: colors.textMuted }}>
          {tasks.filter((t) => !t.completed).length} remaining
        </Text>
      </View>

      {/* Tabs */}
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          backgroundColor: colors.primaryLight,
          borderRadius: 12,
          padding: 4,
          marginBottom: 16,
        }}
      >
        {["all", "active", "completed"].map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: 8,
              borderRadius: 10,
              backgroundColor:
                activeTab === tab ? colors.surface : "transparent",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: activeTab === tab ? colors.primary : colors.textMuted,
                textTransform: "capitalize",
              }}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Search */}
      <TextInput
        placeholder="Search tasks"
        value={search}
        onChangeText={setSearch}
        placeholderTextColor={colors.textMuted}
        style={{
          marginHorizontal: 20,
          marginBottom: 10,
          borderRadius: 12,
          backgroundColor: colors.surface,
          borderWidth: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderColor: colors.border,
          color: colors.text,
        }}
      />

      {/* Hint + List */}
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "700",
            color: colors.textMuted,
            marginBottom: 8,
          }}
        >
          swipe left to delete
        </Text>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onPress={() => {
                setEditingTask(item);
                open("edit-task", item.id);
              }}
            />
          )}
          ListEmptyComponent={
            <Text
              style={{
                color: colors.textMuted,
                textAlign: "center",
                marginTop: 40,
              }}
            >
              No tasks found
            </Text>
          }
        />
      </View>

      {/* FAB */}
      <Pressable
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: colors.primary,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("New-Task")}
      >
        <Ionicons name="add" size={28} color="white" />
      </Pressable>
      <EditTaskDialog task={editingTask} />
    </View>
  );
}
