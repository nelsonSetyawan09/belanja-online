<template>
  <div class="flex flex-col items-center min-h-screen py-2">
    <div
      v-if="pendingCarts || pendingProducts"
      class="flex items-center justify-center h-64"
    >
      <span>loading...</span>
    </div>
    <div
      v-else-if="errorCarts || errorProducts"
      class="flex items-center justify-center h-64"
    >
      <span>error...</span>
    </div>
    <div
      v-else
      class="w-full max-w-sm p-6 bg-neutral-primary-soft border border-default rounded-base shadow-xs"
    >
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-semibold leading-none text-heading">
          List Product
        </h5>
      </div>
      <div class="flow-root">
        <ClientOnly>
          <ul role="list" class="divide-y divide-default">
            <li
              class="py-4 sm:py-4"
              v-for="cart in selectedCarts"
              :key="cart.id"
            >
              <div class="flex items-center gap-2">
                <div class="shrink-0">
                  <img
                    class="w-24 h-24 rounded-full"
                    :src="cart.image"
                    :alt="cart.title"
                  />
                </div>
                <div class="flex-1 min-w-0 ms-2">
                  <div>
                    <p class="font-medium text-heading truncate">
                      {{ cart.title }}
                    </p>
                    <p class="text-sm text-body truncate">
                      {{ cart.description }}
                    </p>
                  </div>
                </div>
                <div class="inline-flex items-center font-medium text-heading">
                  ${{ cart.price }}
                </div>
              </div>
            </li>
          </ul>
        </ClientOnly>
      </div>
      <div class="flex flex-col justify-center items-center gap-4 mt-8">
        <p class="text-lg font-semibold text-heading">
          Total : ${{
            selectedCarts.reduce((total, cart) => total + (cart.price ?? 0), 0)
          }}
        </p>
        <button
          class="inline-flex items-center rounded text-white bg-blue-600 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Payment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const checkoutStore = useCheckoutStore();
const {
  data: carts,
  error: errorCarts,
  pending: pendingCarts,
} = await useFetch("/api/carts");

const {
  data: products,
  error: errorProducts,
  pending: pendingProducts,
} = await useFetch("/api/products");

const cartProducts = computed(() => {
  if (!carts.value?.carts || !products.value?.products) {
    return [];
  }

  return carts.value.carts.map((cart) => {
    const product = products.value.products.find(
      (product) => product.id === cart.product_id,
    );

    return {
      ...cart,
      title: product?.title,
      price: product?.price,
      image: product?.image,
      description: product?.description,
    };
  });
});

const selectedCarts = computed(() => {
  return cartProducts.value.filter((cart) =>
    checkoutStore.selectedCartIds.includes(cart.id),
  );
});
</script>
