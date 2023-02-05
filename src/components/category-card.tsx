import React from "react";
import useSWRImmutable from "swr/immutable";
import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { ApiPaths, imageFetcher } from "@/utils/api-utils";
import bgImage from "../../public/api-image.jpg";

export interface ICategoryCardProps {
  category: string;
}

const linearTransition = { transition: "all linear 300ms" };

const CategoryCard = ({ category }: ICategoryCardProps ) => {
  const topic = category.split(' ')[0];
  const url = ApiPaths.unsplashTopic(topic);
  // const { data, error } = useSWRImmutable(url, imageFetcher);

  return (
    <Box sx={{["a"]: { textDecoration: "none"}}}>
      <Link href={`/${category}`}>
        <Card variant="outlined" sx={{
          "& .MuiCardContent-root": linearTransition,
          "& p": { fontWeight: 600 },
          "&:hover": {
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            "& .MuiCardContent-root": {
              color: "primary.main",
            }
          }
        }}>
          <CardMedia sx={{ height: 140 }}
            image={bgImage.src}
            title="api background image" />
          <CardContent sx={{ textAlign: "center", px: 1 }}>
            <Typography >{category}</Typography>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
};

export default CategoryCard;