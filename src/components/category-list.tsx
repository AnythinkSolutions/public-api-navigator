import React, { useMemo, useState } from "react";
import { Grid, Stack } from "@mui/material";
import { useCategories } from "@/utils/hooks";
import CategoryCard from "./category-card";
import { useRouter } from "next/router";
import FilterTextField from "./filter-text-field";
import RandomButton from "./random-button";

const CategoryList = () => {
  const categories = useCategories();
  const router = useRouter();
  const [filter, setFilter] = useState("");

  const filteredCategories = useMemo(() => {
    if(!filter) return categories;
    const rxp = new RegExp(filter, "i");
    return categories.filter(c => c.search(rxp) >= 0);
  }, [filter, categories]);

  const onRandom = (index: number) => {
    const category = categories[index];
    const url = `/${category}`;
    router.push(url);
  }

  return (
    <Stack rowGap={3} sx={{ width: "100%" }}>
      <Grid container spacing={3}>
        <Grid item md={1} />
        <Grid item md={8} container alignContent="center">
          <FilterTextField onFilterChange={f => setFilter(f)} />
        </Grid>
        <Grid item md={2} container alignContent="center">
          <RandomButton rangeMax={categories.length} onRandom={onRandom} />
        </Grid>
      </Grid>
      <Grid container spacing={{xs: 2, md: 3, lg: 4}}>
      { filteredCategories && (
          filteredCategories.map((cat, idx) => (
            <Grid key={idx} item xs={6} sm={4} lg={3}>
              <CategoryCard category={cat} />  {/* to skip api image gen: skipImageGen={true} */}
            </Grid>
          )))}        
      </Grid>
    </Stack>
  )

};

export default CategoryList;