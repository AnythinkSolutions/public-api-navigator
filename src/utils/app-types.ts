export * from "./unsplash-types";

export type CategoriesData = {
  error?: string;
  count: number;
  categories: string[];
}

export type ApiDetail = {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Link: string;
  Category: string;
}

export type ApisData = {
  error?: string;
  count: number;
  entries: ApiDetail[];
}

export type ApiResponse<T> = {
  ok: boolean;
  error?: string;
  data?: T;
}