import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { staffApi } from "../api/staff.api";

export const useAddSkills = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => staffApi.addSkills(data),
    onSuccess: () => {
      toast.success("Skill added successfully!");
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      staffApi.updateSkill(id, data),
    onSuccess: () => {
      toast.success("Skill updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => staffApi.deleteSkill(id),
    onSuccess: () => {
      toast.success("Skill deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};

export const useAddRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => staffApi.addRoles(data),
    onSuccess: () => {
      toast.success("Role added successfully!");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      staffApi.updateRole(id, data),
    onSuccess: () => {
      toast.success("Role updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => staffApi.deleteRole(id),
    onSuccess: () => {
      toast.success("Role deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};

export const useGetSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: () => staffApi.getSkills(),
  });
};

export const useGetRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => staffApi.getRoles(),
  });
};
