import { db } from "~/server/db";

export default defineEventHandler(async (event) => {
  interface Products {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
  }
  const products = db.prepare(`SELECT * FROM products`).all() as
    | Products[]
    | undefined;

  return { products };
});
