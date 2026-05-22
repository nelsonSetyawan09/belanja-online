import { db } from "~/server/db";
import { randomUUID } from "crypto";

export default defineEventHandler(async (event) => {
  interface ProductBody {
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
  }

  const body = await readBody<ProductBody>(event);

  const id = randomUUID();

  const stmt = db.prepare(`
    INSERT INTO products (
      id,
      title,
      description,
      price,
      image,
      category
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    id,
    body.title,
    body.description,
    body.price,
    body.image,
    body.category,
  );

  return {
    success: true,
    product: {
      id,
      ...body,
    },
    result,
  };
});
