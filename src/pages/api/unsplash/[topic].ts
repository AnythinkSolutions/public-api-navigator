import { ApiResponse, UnsplashImage } from '@/utils/app-types';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

const urlTemplate = "https://api.unsplash.com/photos/random?topics={tpc}&orientation=landscape&count=1";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<UnsplashImage>>
) {
  const headers = {
    Authorization: `Client-ID ${process.env.NEXT_APP_UNSP_KEY}`,
  };

  const { topic } = req.query;
  if(topic && !Array.isArray(topic)){
    try{
      const url = urlTemplate.replace("{tpc}", encodeURIComponent(topic));
      const response = await axios<UnsplashImage>(url, { headers });

      // console.log("unsplash response: ", response);
      res.status(response.status).json({
        ok: response.status === 200,
        data: response.data
      });
    }
    catch(ex: any){
      console.error("error getting image: ", ex);
      res.status(500).json({ok: false, error: `error getting image.${ex.toString()}`});
    }
  }
  else{
    console.error("invalid topic");
    res.status(501).json({ok: false, error: "invalid topic, only single values accepted."});
  }
}
