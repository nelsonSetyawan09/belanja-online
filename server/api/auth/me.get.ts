import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const token = getCookie(event, "access_token");
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    return {
      authenticated: true,
      user: decoded,
    };
  } catch {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid token",
    });
  }
});
