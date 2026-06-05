<template>
  <div
    class="w-full max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs mx-4 my-2"
  >
    <NuxtLink :to="`/product/${product?.id}`">
      <img
        class="rounded-base mb-6"
        :src="product?.image"
        alt="product image"
      />
    </NuxtLink>
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
          <span>
            <span v-if="pending">Adding...</span>
            <span v-else>Add to Cart</span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { product } = defineProps(["product"]);
const { user } = useAuth();

const getRandomRating = () => {
  return (Math.random() * 5).toFixed(1);
};

const pending = ref(false);
const error = ref(null);

const addToCart = async () => {
  if (pending.value) return;
  try {
    pending.value = true;

    const response = await $fetch("/api/carts/createNewCartProduct", {
      method: "POST",
      body: {
        user_id: user.value.id,
        product_id: product.id,
        quantity: 1,
      },
    });

    navigateTo("/cart"); // Redirect to cart page after successful submission
  } catch (err) {
    error.value = err;
    console.error(err);
  } finally {
    pending.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
