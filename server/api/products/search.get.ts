import { db } from "~/server/db";

export default defineEventHandler(async (event) => {
  interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
  }

  // ambil query dari URL
  const query = getQuery(event);
  const title = query.title as string;

  if (!title) {
    return [];
  }

  const products = db
    .prepare(`SELECT * FROM products WHERE title LIKE ?`)
    .all(`%${title}%`);

  return products;
});
