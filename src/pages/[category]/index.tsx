import ItemList from "@/components/item-list";
import { useSlug } from "@/utils/hooks";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const CategoryPage = () => {
  const category = useSlug("category");

  return (
    <Box sx={{px: 2}}>
      <Stack rowGap={2} sx={{ textAlign: "center" }}>
        <Typography variant="h3">{category} Category</Typography>
        <Link href="/">All Categories</Link>
        <Box sx={{mt: 4}}>
          <ItemList />
        </Box>
      </Stack>
    </Box>
  )

};

export default CategoryPage;