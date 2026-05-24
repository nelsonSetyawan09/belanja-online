<template>
  <div
    class="w-full max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs"
  >
    <NuxtLink :to="`/product/${product?.id}`">
      <img
        class="rounded-base mb-6"
        :src="product?.image"
        alt="product image"
      />
      <div>
        <h5 class="text-xl text-heading font-semibold tracking-tight">
          {{ product?.title }}
        </h5>
        <h5 class="text-xl text-heading font-semibold tracking-tight">
          {{ product?.description }}
        </h5>
        <div>
          <h5 class="text-xl text-heading font-semibold tracking-tight">
            Rp. {{ product?.price }}
          </h5>
        </div>
        <div class="flex flex-col justify-between mt-6 gap-3">
          <ClientOnly>
            <span class="text-xl font-extrabold text-heading"
              >Rating: {{ getRandomRating() }}</span
            >
          </ClientOnly>
          <button
            type="button"
            @click="addToCart(product)"
            class="flex items-center justify-center text-center bg-blue-600 hover:bg-blue-700 box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
          >
            <span v-if="isAlreadyInCart(cart, product)">Item Added</span>
            <span v-else> Add to Cart</span>
          </button>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps(["product"]);
const cart = useCart("cart");

const getRandomRating = () => {
  return (Math.random() * 5).toFixed(1);
};

const addToCart = (product) => {
  if (userInfo.value && !isAlreadyInCart(cart.value, product)) {
    cart.value.push(product);
  } else {
    alert("Please log in to add items to your cart.");
  }
};

const isAlreadyInCart = (cartState, productToCheck) => {
  return false;
  // return cartState.some(
  //   (productInCart) => productInCart.id === productToCheck.id,
  // );
};
</script>

<style lang="scss" scoped></style>
