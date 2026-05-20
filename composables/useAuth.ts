export const useAuth = () => {
  const user = useState<any>("user", () => null);

  const isLoggedIn = computed(() => !!user.value);
  const logout = async () => {
    await $fetch("/api/auth/logout", {
      method: "POST",
    });

    user.value = null;

    await navigateTo("/login");
  };

  return {
    user,
    isLoggedIn,
    logout,
  };
};
