<template>
  <div>
    <form @submit.prevent class="max-w-md mx-auto">
      <label
        for="search"
        class="block mb-2.5 text-sm font-medium text-heading sr-only"
        >Search</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-body"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="search"
          v-model="searchQuery"
          class="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
          placeholder="Search for product"
          required
        />
      </div>
    </form>
    <div>
      <p v-if="pending">Loading...</p>

      <p v-else-if="error">Terjadi error</p>

      <p v-else-if="!searchQuery.length">Silakan cari produk</p>

      <p v-else-if="!data?.length">Produk tidak ditemukan</p>

      <div v-else class="grid grid-cols-4 gap-4">
        <div v-for="product in data" :key="product.id">
          <ProductComp :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDebounceFn } from "@vueuse/core";

const searchQuery = ref("");
const debouncedSearch = ref("");

const updateSearch = useDebounceFn((value) => {
  debouncedSearch.value = value;
}, 500);

watch(searchQuery, (value) => {
  updateSearch(value);
});

const { data, pending, error } = await useFetch("/api/products/search", {
  query: {
    title: debouncedSearch,
  },
  watch: [debouncedSearch],
});
</script>
