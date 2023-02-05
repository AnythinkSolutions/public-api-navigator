import { ApiDetail } from '@/utils/app-types';
import { ApiCategory } from './../components/app-context';
import useSwr from 'swr';
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router"
import { AppContext, IAppContext } from "@/components/app-context";
import { apisFetcher } from "./api-utils";

export const useSlug = (slugKey: string = "slug") => {
  const router = useRouter();
  const value = router.query[slugKey] as string;
  return decodeURIComponent(value);
}

export const useSlugs = (slugKeys: string[]) => {
  const router = useRouter();
  const values = slugKeys.map(key => decodeURIComponent(router.query[key] as string));
  return values;
}

export const useCategories = () => {
  const ctx = useContext(AppContext);
  if(!ctx){
    throw new Error("Hook can only be used inside AppProvider.");
  }

  return ctx.categories;
}

export const useCategoryApis = (category: string) => {
  const [isNeeded, setIsNeeded] = useState(false);
  const [apiData, setApiData] = useState<ApiCategory | null>(null);
  const ctx = useContext(AppContext);
  const { data, error } = useSwr(isNeeded ? `/api/categories/${encodeURIComponent(category)}` : null, apisFetcher);

  if(!ctx){
    throw new Error("Hook can only be used inside AppProvider.");
  }

  //triggers on the first pass, determines if we have the data, or we need to get it
  useEffect(() => {
    const items = ctx.apis.find(api => api.category === category);
    if(items){
      setApiData(items);
    }
    else{
      setIsNeeded(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  //triggers when retrieving the data is complete, sets the data so it will be returned
  useEffect(() => {
    if(isNeeded && data?.entries){
      const item = {
        category: category,
        apis: data.entries,
      };
      setApiData(item);
      setIsNeeded(false);
      ctx.addApiCategory(item); //add it to the contexxt for next time
    }
  }, [data, category, isNeeded, ctx]);

  return apiData;
}

export const useApiDetails = (category: string, api: string) => {
  const allItems = useCategoryApis(category);
  const [details, setDetails] = useState<ApiDetail | null>(null);
  
  useEffect(() => {
    if(allItems && !details){
      const item = allItems.apis.find(a => a.API === api);
      if(!item) throw new Error("API not found in this category");
      setDetails(item);
    }
  }, [allItems, details, api]);

  return details;
}