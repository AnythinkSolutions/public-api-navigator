import React, { useEffect } from "react";
import useSWRImmutable  from "swr/immutable";
import { ApiPaths, imageFetcher } from "@/utils/api-utils";
import { useApiDetails, useSlugs } from "@/utils/hooks";
import { Box, Grid, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import Link from "next/link";

const ItemDetail = () => {
  const [slug, category] = useSlugs(["slug", "category"]);
  const item = useApiDetails(category, slug);
  const topic = category.split(' ')[0];
  const url = ApiPaths.unsplashTopic(topic);
  // const { data, error } = useSWRImmutable(url, imageFetcher);

  // useEffect(() => {
  //   console.log("image data: ", data);
  //   console.log("image error: ", error);
  // }, [data, error]);

  return (
    <Box>
      <Grid container direction="column">
        <Typography variant="h3">Item Detail: {slug} from category {category} </Typography>
        <Link href="/math">Back to Category</Link>
        <Link href="/">Back to Categories</Link>
        <Table>
          <TableBody>
            <TableRow><TableCell>{item?.API}</TableCell></TableRow>
            <TableRow><TableCell>{item?.Auth}</TableCell></TableRow>
            <TableRow><TableCell>{item?.Category}</TableCell></TableRow>
            <TableRow><TableCell>{item?.Cors}</TableCell></TableRow>
            <TableRow><TableCell>{item?.Description}</TableCell></TableRow>
            <TableRow><TableCell>{item?.HTTPS}</TableCell></TableRow>
            <TableRow><TableCell><a href={item?.Link} target="_blank" rel="noreferrer">{item?.Link}</a></TableCell></TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Box>
  )

};

export default ItemDetail;