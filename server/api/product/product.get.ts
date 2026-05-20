import { db } from "~/server/db";

export default defineEventHandler(async (event) => {
  interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  }
  const product = db.prepare(`SELECT * FROM products`).all() as
    | Product[]
    | undefined;

  return { product };
});
