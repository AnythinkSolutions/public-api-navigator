import ItemDetail from "@/components/item-detail";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const ApiDetailsPage = () => {

  return (
    <Box>
      <Grid container direction="column">
        <Typography variant="h3">ApiDetails Page</Typography>
        <ItemDetail />
      </Grid>
    </Box>
  )

};

export default ApiDetailsPage;