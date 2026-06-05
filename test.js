import { db } from "./server/db.js";

db.prepare(
  `
  INSERT INTO carts (
    id,
    user_id,
    product_id,
    quantity
  ) VALUES (?, ?, ?, ?)
`,
).run(
  crypto.randomUUID(),
  "bb8099be-7009-402b-b02b-97d57da6d47e",
  "9feac905-e0e1-4f04-8dec-3011ce97e39f",
  1,
);

console.log("success");
