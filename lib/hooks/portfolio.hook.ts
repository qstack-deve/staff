import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { portfolioApi } from "../api/portfolio.api";
import { toast } from "sonner";
import {
  CreatePortfolioInput,
  UpdatePortfolioInput,
} from "../types/portfolio.types";

export const useGetPortfolios = () => {
  return useQuery({
    queryKey: ["portfolios"],
    queryFn: () => portfolioApi.getPortfolios(),
  });
};

export const useGetPortfolio = (portfolioId: string) => {
  return useQuery({
    queryKey: ["portfolio", portfolioId],
    queryFn: () => portfolioApi.getPortfolio(portfolioId),
    enabled: !!portfolioId,
  });
};

export const useCreatePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => portfolioApi.createPortfolio(data),
    onSuccess: () => {
      toast.success("Portfolio item created successfully");
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
    onError: () => {
      toast.error("Failed to create portfolio item");
    },
  });
};

export const useUpdatePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      portfolioApi.updatePortfolio(id, data),
    onSuccess: (_, variables) => {
      toast.success("Portfolio item updated successfully");
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio", variables.id] });
    },
    onError: () => {
      toast.error("Failed to update portfolio item");
    },
  });
};

export const useDeletePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => portfolioApi.deletePortfolio(id),
    onSuccess: () => {
      toast.success("Portfolio item deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
    onError: () => {
      toast.error("Failed to delete portfolio item");
    },
  });
};

export const useGetPortfolioCategories = () => {
  return useQuery({
    queryKey: ["portfolio-categories"],
    queryFn: () => portfolioApi.getCategories(),
  });
};

export const useGetPortfolioTags = () => {
  return useQuery({
    queryKey: ["portfolio-tags"],
    queryFn: () => portfolioApi.getTags(),
  });
};
