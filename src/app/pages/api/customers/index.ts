// pages/api/customers/index.ts

import { searchCustomerByName } from "../../../(main)/customers/actions"; // Adjust path as needed
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { name } = req.query;

    if (typeof name !== "string") {
      return res.status(400).json({ error: "Invalid search query" });
    }

    try {
      const customers = await searchCustomerByName(name);
      res.status(200).json(customers);
    } catch (error) {
      console.error("Error searching customers:", error);
      res.status(500).json({ error: "Failed to fetch customers" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
