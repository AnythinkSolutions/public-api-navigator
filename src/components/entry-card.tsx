import { ApiDetail } from "@/utils/app-types"
import { Box, Card, CardContent, CardMedia, Grid, Stack, Tooltip, Typography } from "@mui/material";
import { Badge, CellTower, Https, NoEncryption } from "@mui/icons-material";
import Link from "next/link";

export interface IEntryCardProps {
  entry: ApiDetail;
}

const linearTransition = { transition: "all linear 300ms" };
// const faviconUrl = "https://s2.googleusercontent.com/s2/favicons?domain={domain}&sz=32";

const EntryCard = ({entry}: IEntryCardProps) => {
  const url = encodeURI(`/${entry.Category}/${entry.API}`);
  // const domainUrl = new URL(entry.Link);
  // const imgUrl = faviconUrl.replace("{domain}", domainUrl.hostname);

  return (
    <Box sx={{ ["a"]: { textDecoration: "none" }}}>
      <Link href={url}>
        <Card variant="outlined" sx={{
          "& .MuiCardContent-root": linearTransition,
          "&:hover": {
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            "& .MuiCardContent-root": {
              color: "primary.main",
            }
          }
        }}>
          {/* <CardMedia image={imgUrl} title="Favicon for URL" /> */}
          <CardContent sx={{ textAlign: "center", px: 1 }}>
            <Stack>
              <Typography sx={{ fontWeight: 600}}>{entry.API}</Typography>
              <Grid container columnGap={1} justifyContent="center" sx={{my: 1}}>
                {entry.Cors && (
                  <Grid item>
                    <Tooltip title="CORS">
                      <CellTower fontSize="small" color="primary" />
                    </Tooltip>
                  </Grid>
                )}
                {entry.Auth && (
                  <Grid item>
                    <Tooltip title={entry.Auth}>
                      <Badge fontSize="small" color="primary" />
                    </Tooltip>
                  </Grid>
                )}
                <Grid item>
                  <Tooltip title={entry.HTTPS ? "HTTPS" : "HTTP"}>
                    {entry.HTTPS ? <Https fontSize="small" color="primary" /> : <NoEncryption fontSize="small" color="disabled" />}
                  </Tooltip>                
                </Grid>
              </Grid>

              <Typography variant="caption">{entry.Description}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
};

export default EntryCard;