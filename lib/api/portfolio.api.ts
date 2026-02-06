import { apiService } from "../services/apiService";
import {
  CreatePortfolioInput,
  UpdatePortfolioInput,
} from "../types/portfolio.types";

export const portfolioApi = {
  getPortfolios: async () => {
    const res = await apiService.get("/admin/portfolios/");
    return res;
  },

  getPortfolio: async (portfolioId: string) => {
    const res = await apiService.get(`/admin/portfolios/${portfolioId}/`);
    return res;
  },

  createPortfolio: async (data: FormData) => {
    const res = await apiService.post("/admin/portfolios/", data);
    return res;
  },

  updatePortfolio: async (portfolioId: string, data: FormData) => {
    const res = await apiService.patch(
      `/admin/portfolios/${portfolioId}/`,
      data,
    );
    return res;
  },

  deletePortfolio: async (portfolioId: string) => {
    const res = await apiService.delete(`/admin/portfolios/${portfolioId}/`);
    return res;
  },

  getCategories: async () => {
    const res = await apiService.get("/admin/categories/");
    return res;
  },

  getTags: async () => {
    const res = await apiService.get("/admin/tags/");
    return res;
  },
};
