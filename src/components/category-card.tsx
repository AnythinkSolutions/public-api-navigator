import React, { useMemo } from "react";
import useSWRImmutable from "swr/immutable";
import { Box, Card, CardContent, CardMedia, LinearProgress, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { ApiPaths, openAiImageFetcher } from "@/utils/api-utils";
import fallbackImage from "../../public/api-image.jpg";
export interface ICategoryCardProps {
  category: string;
  skipImageGen?: boolean;
}

const linearTransition = { transition: "all linear 300ms" };

const CategoryCard = ({ category, skipImageGen }: ICategoryCardProps ) => {
  const url = skipImageGen ? null : ApiPaths.openAiImage(category);  //conditionally fetch images
  const { data, error } = useSWRImmutable(url, openAiImageFetcher);

  const imageUrl = useMemo(() => {
    if(skipImageGen) return fallbackImage.src;
    else if(data){
      const url = data.data?.data[0].url;
      return url;
    }
    else return undefined;
  }, [skipImageGen, data]);

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
          {imageUrl && (
            <CardMedia sx={{ height: 140 }}
              image={imageUrl}
              title="api background image" />
          )}
          {!imageUrl && (
            <Stack sx={{height: 140}} justifyContent="center" alignItems="center">
              <LinearProgress sx={{width: "50%", height: "8px"}} />
              <Typography variant="subtitle1">Generating image...</Typography>
            </Stack>
          )}
          <CardContent sx={{ textAlign: "center", px: 1 }}>
            <Typography >{category}</Typography>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
};

export default CategoryCard;