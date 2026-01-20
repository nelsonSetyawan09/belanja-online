import { db } from "~/server/db";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.email || !body.password) {
    throw createError({ statusCode: 400, statusMessage: "Invalid data" });
  }

  const hash = await bcrypt.hash(body.password, 10);

  try {
    db.prepare(
      `
      INSERT INTO users (id, email, password)
      VALUES (?, ?, ?)
    `,
    ).run(randomUUID(), body.email, hash);
  } catch {
    throw createError({
      statusCode: 409,
      statusMessage: "Email already exists",
    });
  }

  return { user: { email: body.email } };
});
