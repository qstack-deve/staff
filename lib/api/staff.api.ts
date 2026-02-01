import { apiService } from "../services/apiService";

export const staffApi = {
  getRoles: async () => {
    const res = await apiService.get("/admin/roles");
    return res;
  },
  addRoles: async (data: any) => {
    const res = await apiService.post("/admin/roles", data);
    return res;
  },

  getSkills: async () => {
    const res = await apiService.get("/admin/skills/");
    return res;
  },

  addSkills: async (data: any) => {
    const res = await apiService.post("/admin/skills/", data);
    return res;
  },
};
