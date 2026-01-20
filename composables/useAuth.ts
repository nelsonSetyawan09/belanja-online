export const useAuth = () => {
  const user = useState<any>("user", () => null);

  const fetchUser = async () => {
    const { data } = await useFetch("/api/auth/me");
    user.value = data.value;
  };

  return { user, fetchUser };
};
