// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveData, retrieveDataById } from "../lib/firebase/service";

type Data = {
  status: boolean;
  statusCode: number;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    if (req.query.product![1]) {
      const data = await retrieveDataById("products", req.query.product![1]);
      res.status(200).json({ status: true, statusCode: 200, data });
    }
  const data = await retrieveData("products")
  res.status(200).json({ status: true, statusCode: 200, data });
}
