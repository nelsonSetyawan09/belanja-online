<template>
  <div class="grid place-items-center p-4">
    <div>
      <Loading v-if="pending">Loading...</Loading>

      <p v-else-if="error">Terjadi error</p>

      <p v-else-if="!product?.id">Produk tidak ditemukan</p>

      <div v-else class="grid grid-cols-1">
        <ProductComp :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const productId = route.params.id;
const {
  data: product,
  pending,
  error,
} = await useFetch(`/api/products/findProductById/${productId}`);
</script>
