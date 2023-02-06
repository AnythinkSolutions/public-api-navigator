import { ApiResponse, OpenAiResponse } from '@/utils/app-types';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

const url = "https://api.openai.com/v1/images/generations";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<OpenAiResponse>>
) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_APP_OAPI_KEY}`,
  }
   
  const { prompt } = req.query;
  if(prompt && !Array.isArray(prompt)){
    try{
      const body = {
        prompt: `a close up, photo-realistic image that shows ${prompt}`,
        n: 1,
        size: "256x256",
      };
      
      const response = await axios<OpenAiResponse>(url, { method: "POST", headers, data: body,  });

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
