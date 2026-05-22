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

  // ambil id dari params URL
  const id = event.context.params?.id;

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Product ID is required",
    });
  }

  const product = db.prepare(`SELECT * FROM products WHERE id = ?`).get(id) as
    | Product
    | undefined;

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }

  return product;
});
