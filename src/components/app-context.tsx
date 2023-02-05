import React, { createContext, ReactNode, useEffect, useState } from "react";
import useSwr from "swr";
import { ApiDetail } from "@/utils/app-types";
import { ApiPaths, categoriesFetcher } from "@/utils/api-utils";

export type ApiCategory = {
  category: string;
  apis: ApiDetail[];
}

export interface IAppContext {
  isReady: boolean;
  categories: string[];
  apis: ApiCategory[];
  addApiCategory: (category: ApiCategory) => void;
}

export const AppContext = createContext<IAppContext | null>(null);

export interface IAppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: IAppProviderProps ) => {
  const [isReady, setIsReady] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [apis, setApis] = useState<ApiCategory[]>([]);

  //initialize with the categories, which we know we'll need
  const { data, error } = useSwr(ApiPaths.categories, categoriesFetcher);

  useEffect(() => {
    if(data?.categories){
      setCategories(data.categories);
      setIsReady(true);
    }
  }, [data]);

  const addApiCategory = (cat: ApiCategory) => {
    const index = apis.findIndex(c => c.category === cat.category);
    let updated: ApiCategory[];
    if(index >= 0){
      updated = [...apis.splice(index, 1, cat)]
    }
    else{
      updated = [...apis, cat];
    }
    setApis(updated);
  }

  const ctx = {
    isReady: isReady,
    categories,
    apis,
    addApiCategory,
  };

  return (
    <AppContext.Provider value={ctx}>
      {children}
    </AppContext.Provider>
  )
};

export default AppProvider;