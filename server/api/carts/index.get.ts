import { db } from "~/server/db";

export default defineEventHandler(async (event) => {
  interface Carts {
    id: string;
    user_id: string;
    product_id: string;
    quantity: number;
  }
  const carts = db.prepare(`SELECT * FROM carts`).all() as Carts[] | undefined;

  return { carts };
});
