import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useUserStoreActions } from "@/stores/user.store";
import { login, register } from "@/services/auth/auth.services";
export const useLoginUser = () => {
  const { setUser } = useUserStoreActions();
  const [apiError, setApiError] = useState(null);
  const mutation = useMutation({
    /**
     *
     * @param {import('@/types/index').LoginUser} user
     * @returns
     */
    mutationFn: async (user) => {
      const response = await login(user.email, user.password);
      setUser(response);
      console.log("login response", response);
      return response;
    },
  });
  useEffect(() => {
    let timeout;
    if (apiError) {
      timeout = setTimeout(() => {
        mutation.reset();
        setApiError(null);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [apiError]);
  return { ...mutation, apiError };
};

export const useSignupUser = () => {
  const { setUser } = useUserStoreActions();
  const [apiError, setApiError] = useState(null);
  const mutation = useMutation({
    /**
     *
     * @param {import('@/types/index').NewUser} user
     * @returns
     */
    mutationFn: async (user) => {
      const response = await register(user.email, user.password, user.username);
      setUser(response);
      console.log("register response", response); // ✅ what does this return?

      return response;
    },
    onSuccess: () => {
      console.log("onSuccess");
    },
  });
  useEffect(() => {
    let timeout;
    if (apiError) {
      timeout = setTimeout(() => {
        mutation.reset();
        setApiError(null);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [apiError]);
  return { ...mutation, apiError };
};

export const useLogoutUser = () => {
  const { reset } = useUserStoreActions();
  const mutation = useMutation({
    mutationFn: async () => {
      return true;
    },
    onError: () => {
      reset();
    },
    onSuccess: () => {
      reset();
    },
  });
  return mutation;
};
