import { db } from "~/server/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface LoginBody {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  password: string;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const body = await readBody<LoginBody>(event);

  const email = body.email?.trim();
  const password = body.password;

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email dan password wajib diisi",
    });
  }

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as
    | User
    | undefined;

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    config.jwtSecret,
    {
      expiresIn: "7d",
    },
  );

  setCookie(event, "access_token", token, {
    httpOnly: true,
    sameSite: "lax",
    // secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
    },
  };
});
