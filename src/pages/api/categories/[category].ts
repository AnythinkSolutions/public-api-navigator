import axios from 'axios';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApisData } from "@/utils/app-types";

const urlBase = "https://api.publicapis.org/entries?category";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApisData>
) {
  
  const { category } = req.query;
  if(category && !Array.isArray(category)){
    const url = `${urlBase}=${encodeURIComponent(category!)}`;
    const response = await axios<ApisData>(url);
    res.status(response.status).json(response.data);
  }
  else{
    res.status(500).json({count: 0, entries: [], error: "invalid category"});
  }
}
