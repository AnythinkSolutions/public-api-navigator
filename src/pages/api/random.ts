import { ApiDetail } from '@/utils/app-types';
import axios from 'axios';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const url = "https://api.publicapis.org/random";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiDetail>
) {
  const response = await axios<ApiDetail>(url);
  res.status(response.status).json(response.data);
}
