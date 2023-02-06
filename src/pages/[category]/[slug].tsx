import ItemDetail from "@/components/item-detail";
import { useSlugs } from "@/utils/hooks";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const ApiDetailsPage = () => {
  const [slug, category] = useSlugs(["slug", "category"]);

  return (
    <Box sx={{px: 2}}>
      <Stack rowGap={2} sx={{ textAlign: "center" }}>
        <Typography variant="h3">{slug} API Details</Typography>
        <Stack columnGap={2} direction="row" justifyContent="center">
          <Link href="/">All Categories</Link>
          <Link href={`/${category}`}>{category} Category</Link>
        </Stack>
        <ItemDetail />
      </Stack>
    </Box>
  )

};

export default ApiDetailsPage;