import { db } from "~/server/db";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const email = body.email?.trim();
  const password = body.password;

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email dan password wajib diisi",
    });
  }

  // cek email sudah ada
  const existingUser = db
    .prepare("SELECT id FROM users WHERE email = ?")
    .get(email);

  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: "Email already exists",
    });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert user
  const id = randomUUID();

  db.prepare(
    `
    INSERT INTO users (id, email, password)
    VALUES (?, ?, ?)
  `,
  ).run(id, email, hashedPassword);

  return {
    success: true,
    user: {
      id,
      email,
    },
  };
});
