export const useCheckoutStore = defineStore(
  "checkout",
  () => {
    const selectedCartIds = ref<number[]>([]);

    const setSelectedCartIds = (ids: number[]) => {
      selectedCartIds.value = ids;
    };

    const clearSelectedCartIds = () => {
      selectedCartIds.value = [];
    };

    return {
      selectedCartIds,
      setSelectedCartIds,
      clearSelectedCartIds,
    };
  },
  {
    persist: true,
  },
);
