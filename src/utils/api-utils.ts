import { OpenAiResponse } from './image-types';
import { ApiDetail, ApisData, CategoriesData, ApiResponse, UnsplashImage } from './app-types';
import axios from "axios";
import { Key, Fetcher } from "swr";

interface IHelloData {
  name: string;
}

export const getName = async () => {
  const result = await axios<IHelloData>('/api/hello');
  return result.data;
}

export const categoriesFetcher: Fetcher<CategoriesData, string> = (...args) => fetch(...args).then((res) => res.json());
export const apisFetcher: Fetcher<ApisData, string> = (...args) => fetch(...args).then((res) => res.json());
export const imageFetcher: Fetcher<ApiResponse<UnsplashImage>, string> = (...args) => fetch(...args).then((res) => res.json());
export const openAiImageFetcher: Fetcher<ApiResponse<OpenAiResponse>, string> = (...args) => fetch(...args).then((res) => res.json());


// export const responseFetcher: Fetcher<ApiResponse<T>, string> = (...args) => fetch(...args).then((res) => res.json());


export const ApiPaths = {
  categories: "/api/categories",
  category: (category: string) => `/api/categories/${encodeURIComponent(category)}`,
  
  random: "/api/random",

  openAiImage: (prompt: string) => `/api/openai/generateimage?prompt=${prompt}`,
  unsplashTopic: (topic: string) => `/api/unsplash/${encodeURIComponent(topic)}`,
};