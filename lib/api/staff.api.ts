import { apiService } from "../services/apiService";

export const staffApi = {
  getRoles: async () => {
    const res = await apiService.get("/admin/roles/");
    return res;
  },
  addRoles: async (data: any) => {
    const res = await apiService.post("/admin/roles/", data);
    return res;
  },
  updateRole: async (id: string, data: any) => {
    const res = await apiService.put(`/admin/roles/${id}/`, data);
    return res;
  },
  deleteRole: async (id: string) => {
    const res = await apiService.delete(`/admin/roles/${id}/`);
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
  updateSkill: async (id: string, data: any) => {
    const res = await apiService.put(`/admin/skills/${id}/`, data);
    return res;
  },
  deleteSkill: async (id: string) => {
    const res = await apiService.delete(`/admin/skills/${id}/`);
    return res;
  },
};
