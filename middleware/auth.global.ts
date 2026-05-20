const publicPages = ["/login", "/register"];

export default defineNuxtRouteMiddleware(async (to) => {
  if (publicPages.includes(to.path)) {
    return;
  }

  const { user } = useAuth();

  // skip kalau user sudah ada
  if (user.value) {
    return;
  }

  try {
    const headers = useRequestHeaders(["cookie"]);
    const data = await $fetch("/api/auth/me", { headers });
    user.value = data.user;
  } catch {
    user.value = null;
    return navigateTo("/login");
  }
});
