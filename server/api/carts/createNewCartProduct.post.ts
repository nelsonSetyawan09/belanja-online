import { db } from "~/server/db";
import { randomUUID } from "crypto";

export default defineEventHandler(async (event) => {
  interface Cart {
    user_id: string;
    product_id: string;
  }

  const body = await readBody<Cart>(event);

  // cek apakah produk sudah ada di cart user
  const existingCart = db
    .prepare(
      `
      SELECT * 
      FROM carts
      WHERE user_id = ? AND product_id = ?
    `,
    )
    .get(body.user_id, body.product_id) as
    | {
        id: string;
        quantity: number;
      }
    | undefined;

  if (existingCart) {
    // update quantity
    db.prepare(
      `
      UPDATE carts
      SET quantity = quantity + 1
      WHERE id = ?
    `,
    ).run(existingCart.id);

    return {
      success: true,
      message: "Quantity updated",
    };
  }

  // insert cart baru
  const result = db
    .prepare(
      `
      INSERT INTO carts (
        id,
        user_id,
        product_id,
        quantity
      ) VALUES (?, ?, ?, ?)
    `,
    )
    .run(randomUUID(), body.user_id, body.product_id, 1);

  return {
    success: true,
    message: "Product added to cart",
    result,
  };
});
