<template>
  <div>
    <ProductComp />
  </div>
</template>

<script setup>
const { data: product } = await useFetch("/api/product/product", {
  method: "GET",
});
</script>

<style lang="scss" scoped></style>
