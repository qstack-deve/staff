export interface PortfolioTag {
  id: string;
  name: string;
}

export interface PortfolioCategory {
  id: string;
  name: string;
}

export type PortfolioStatus = "development" | "live" | "archived" | string;

export interface PortfolioItem {
  id: string;
  tags: PortfolioTag[] | null;
  category: PortfolioCategory | null;
  title: string;
  description: string;
  long_description: string | null;
  image: string | null;
  is_pinned: boolean;
  status: PortfolioStatus;
  client: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePortfolioInput {
  title: string;
  description: string;
  long_description?: string;
  image?: string;
  is_pinned?: boolean;
  status?: PortfolioStatus;
  client?: string;
  url?: string;
  category_id: string;
  tag_ids?: string[];
}

export interface UpdatePortfolioInput {
  title?: string;
  description?: string;
  long_description?: string;
  image?: string;
  is_pinned?: boolean;
  status?: PortfolioStatus;
  client?: string;
  url?: string;
  category_id?: string;
  tag_ids?: string[];
}
