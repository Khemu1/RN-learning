import {
  createTask,
  deleteTask,
  getTasks,
  toggleCompletion,
  updateTask,
} from "@/services/tasks/tasks.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetTasks = (user_id) => {
  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      return getTasks();
    },
    enabled: !!user_id,
  });

  return query;
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    /**
     *
     * @param {import('@/types/index').NewTodo} task - {title, description}
     * @returns
     */
    mutationFn: async (task) => {
      const response = await createTask(task);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return mutation;
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    /**
     *
     * @param {import('@/types/index').NewTodo} task - {title, description}
     * @returns
     */
    mutationFn: async (task) => {
      const response = await updateTask(task);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return mutation;
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    /**
     *
     * @param {number} id
     */
    mutationFn: async (id) => {
      await deleteTask(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return mutation;
};

export const useToggleCompletion = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    /**
     *
     * @param {number} id
     */
    mutationFn: async (id) => {
      await toggleCompletion(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return mutation;
};
