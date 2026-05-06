import { updateMyData, deleteMyData } from "@/services/auth/users.services";

export const useUpdateUser = () => {
  /**
   *
   * @param {import('@/types/index').UpdateUser} user
   * @returns
   */
  const updateUser = async (user) => {
    const response = await updateMyData(user);
    console.log("updateUser response", response);
    return response;
  };
  return updateUser;
};

export const useDeleteUser = () => {
  const deleteUser = async () => {
    const response = await deleteMyData();
    return response;
  };
  return deleteUser;
};
