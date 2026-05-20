import { db } from "./server/db.js";

db.prepare(
  `
  INSERT INTO products (
    id,
    title,
    description,
    image,
    category,
    price
  ) VALUES (?, ?, ?, ?, ?, ?)
`,
).run(
  crypto.randomUUID(),
  "iPhone 15 5",
  "HP flagship Apple 5",
  "https://www.shutterstock.com/shutterstock/photos/2431958683/display_1500/stock-photo-feb-th-a-woman-using-and-working-on-apple-macbook-pro-laptop-computer-chiang-mai-thailand-2431958683.jpg",
  "smartphone 5",
  15500000,
);

console.log("success");
