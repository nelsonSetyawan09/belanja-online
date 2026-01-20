import { db } from "~/server/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const config = useRuntimeConfig();

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
  const body = await readBody<LoginBody>(event);

  const user = db
    .prepare(`SELECT * FROM users WHERE email = ?`)
    .get(body.email) as User | undefined;

  if (!user || !(await bcrypt.compare(body.password, user.password))) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: "7d",
  });

  setCookie(event, "access_token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return { user: { email: user.email } };
});
