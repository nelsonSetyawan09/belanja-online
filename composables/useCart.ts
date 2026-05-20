export const useCart = () => {
  const cart = useState<any>("cart", () => []);

  return { cart };
};
