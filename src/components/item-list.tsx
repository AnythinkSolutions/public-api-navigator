import React, { useEffect, useMemo, useState } from "react";
import useSwr from "swr";
import Link from "next/link";
import { Grid, Stack } from "@mui/material";
import { useCategories, useCategoryApis, useSlug } from "@/utils/hooks";
import { ApiPaths, imageFetcher } from "@/utils/api-utils";
import EntryCard from "./entry-card";
import { useRouter } from "next/router";
import FilterTextField from "./filter-text-field";
import RandomButton from "./random-button";
import axios from "axios";
import { ApiResponse, OpenAiResponse } from "@/utils/app-types";

const ItemList = () => {
  const categories = useCategories();
  const slug = useSlug("category");
  const category = useCategoryApis(slug);
  const router = useRouter();
  const [filter, setFilter] = useState("");
  const apis = useMemo(() => category?.apis ?? [], [category]);

  useEffect(() => {
    const doEffect = async() => {
      const url = ApiPaths.openAiImage(slug);
      const response = await axios<ApiResponse<OpenAiResponse>>(url);
      if(response.status === 200){
        const aiResponse = response.data;
        const imageUrls = aiResponse.data?.data;
        console.log("Image urls: ", imageUrls);
      }
    }
    if(slug) doEffect();
  }, [slug]);

  const filtered = useMemo(() => {
    if(!filter) return apis;
    const rxp = new RegExp(filter, "i");
    return apis.filter(c => c.API.search(rxp) >= 0 || c.Description.search(rxp) >= 0);
  }, [filter, apis]);

  const onRandom = (index: number) => {
    const api = apis[index];
    const url = `/${slug}/${api.API}`;
    router.push(url);
  }

  const onRandomCategory = (index: number) => {
    const category = categories[index];
    const url = `/${category}`;
    router.push(url);
  }
  // const makePath = (path: string) => encodeURI(`/${slug}/${path}`);

  // const url = ApiPaths.unsplashTopic(slug.split(" ")[0]);
  // const { data, error } = useSwr(url, imageFetcher);

  // useEffect(() => {
  //   console.log("image data: ", data);
  //   console.log("image error: ", error);
  // }, [data, error]);

  return (
    <Stack rowGap={2}>
      <Grid container spacing={3}>
        <Grid item md={1} />
        <Grid item md={8} container alignContent="center">
          <FilterTextField onFilterChange={f => setFilter(f)} />
        </Grid>
        <Grid item md={3} container alignContent="center">
          <Stack direction="row" spacing={1}>
            <RandomButton rangeMax={apis.length} onRandom={onRandom} />
            <RandomButton label="Category" rangeMax={categories.length} onRandom={onRandomCategory} />
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={{xs: 2, md: 3, lg: 4}}>
        { filtered.map((entry, index) => (
          <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
            <EntryCard entry={entry} />
          </Grid>
        ))}        
      </Grid>
    </Stack>
  )

};

export default ItemList;