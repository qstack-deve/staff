import { apiService } from "../services/apiService";

export const accountApi = {
  getUserProfile: async () => {
    const res = await apiService.get("/profile/");
    return res;
  },
  updateProfile: async (data: any) => {
    const res = await apiService.patch("/profile/", data);
    return res;
  },
  getUser: async () => {
    const res = await apiService.get("/user/");
    return res;
  },
};
