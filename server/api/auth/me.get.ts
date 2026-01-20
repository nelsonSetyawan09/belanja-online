import jwt from "jsonwebtoken";
const config = useRuntimeConfig();

export default defineEventHandler((event) => {
  const token = getCookie(event, "access_token");
  if (!token) return null;

  try {
    return jwt.verify(token, config.jwtSecret);
  } catch {
    return null;
  }
});
