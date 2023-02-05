import Head from 'next/head'
import { Box, Grid, Typography } from "@mui/material";
import CategoryList from '@/components/category-list';

export default function Home() {
  return (
    <>
      <Head>
        <title>Public API Navigator</title>
        <meta name="description" content="Simplifies navigation of the Public API List" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container direction="column">
        
        <Grid item container justifyContent="center" py={2}>
          <Typography variant="h4">API Categories</Typography>
        </Grid>

        <Grid item container p={2}>
          <CategoryList />
        </Grid>

      </Grid>    
    </>
  )
}
