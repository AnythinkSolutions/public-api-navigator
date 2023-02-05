import axios from 'axios';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { CategoriesData } from "@/utils/app-types";

const url = "https://api.publicapis.org/categories";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CategoriesData>
) {
  const response = await axios<CategoriesData>(url);
  res.status(response.status).json(response.data);
}
