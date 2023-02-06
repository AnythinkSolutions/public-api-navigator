import React from "react";
import { useApiDetails, useSlugs } from "@/utils/hooks";
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";

const ItemDetail = () => {
  const [slug, category] = useSlugs(["slug", "category"]);
  const item = useApiDetails(category, slug);

  return (
    <Box display="flex" justifyContent="center" px="25%" >
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>API Name:</TableCell>
              <TableCell>{item?.API}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>{item?.Description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Authentication Type:</TableCell>
              <TableCell>{item?.Auth}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Category:</TableCell>
              <TableCell>{item?.Category}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CORS?:</TableCell>
              <TableCell>{item?.Cors}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>HTTPS?:</TableCell>
              <TableCell>{item?.HTTPS}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Link:</TableCell>
              <TableCell><a href={item?.Link} target="_blank" rel="noreferrer">{item?.Link}</a></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )

};

export default ItemDetail;