import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { staffApi } from "../api/staff.api";

export const useAddSkills = () => {
  return useMutation({
    mutationFn: (data: any) => staffApi.addSkills(data),
    onSuccess: () => {
      toast.success("skill added successfully!");
    },
  });
};

export const useRoles = () => {
  return useMutation({
    mutationFn: (data: any) => staffApi.addRoles(data),
    onSuccess: () => {
      toast.success("role added successfully!");
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
