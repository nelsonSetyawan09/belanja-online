<template>
  <div>
    <div
      class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base"
    >
      <p v-if="pendingCarts || pendingProducts">Loading...</p>

      <p v-else-if="errorCarts || errorProducts">Terjadi error</p>

      <p v-else-if="!cartProducts?.length">Produk tidak ditemukan</p>

      <table v-else class="w-full text-sm text-left rtl:text-right text-body">
        <thead
          class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default"
        >
          <tr>
            <th scope="col" class="px-6 py-3 font-medium">Product name</th>
            <th scope="col" class="px-6 py-3 font-medium">Description</th>
            <th scope="col" class="px-6 py-3 font-medium">Price</th>
            <th scope="col" class="px-6 py-3 font-medium">Category</th>
            <th scope="col" class="px-6 py-3 font-medium">Image</th>
            <th scope="col" class="px-6 py-3 font-medium">Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-neutral-primary border-b border-default"
            v-for="cartProduct in cartProducts"
            :key="cartProduct.id"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-heading whitespace-nowrap"
            >
              {{ cartProduct.title }}
            </th>
            <td class="px-6 py-4">{{ cartProduct.description }}</td>
            <td class="px-6 py-4">
              Rp.{{ (cartProduct.price ?? 0).toFixed(2) }}
            </td>
            <td class="px-6 py-4">{{ cartProduct.category }}</td>
            <td class="px-6 py-4">
              <img
                :src="cartProduct.image"
                :alt="cartProduct.title"
                class="w-16 h-16 object-cover"
              />
            </td>
            <td class="px-6 py-4">{{ cartProduct.quantity }}</td>
            <td class="px-6 py-4">
              <button
                @click="removeFromCart(cartProduct.id)"
                :disabled="loadingCartById === cartProduct.id"
              >
                <span v-if="loadingCartById === cartProduct.id"
                  >Removing...</span
                >
                <span v-else>X</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <br />

      <div
        class="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs"
      >
        <h5
          class="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8"
        >
          Total
        </h5>
        <p class="text-body mb-6">$ {{ calcTotallCart }}</p>
        <button
          @click="navigateToCheckout"
          class="inline-flex items-center text-white bg-blue-600 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Checkout
          <svg
            class="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5"
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
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const loadingCartById = ref(null);

const {
  data: carts,
  error: errorCarts,
  pending: pendingCarts,
  refresh: refreshCart,
} = await useFetch("/api/carts");

const {
  data: products,
  error: errorProducts,
  pending: pendingProducts,
} = await useFetch("/api/products");

const cartProducts = computed(() => {
  if (!carts.value?.carts || !products.value?.products) return [];
  return carts?.value?.carts.map((cart) => {
    const product = products?.value?.products.find(
      (product) => product.id === cart.product_id,
    );
    return {
      ...cart,
      title: product?.title,
      description: product?.description,
      price: product?.price,
      image: product?.image,
      category: product?.category,
    };
  });
});

const calcTotallCart = computed(() => {
  return cartProducts.value.reduce((total, cartProduct) => {
    return total + cartProduct.price * cartProduct.quantity;
  }, 0);
});

const navigateToCheckout = () => {
  console.log("navigate to checkout");
  if (carts.value?.carts.length > 0) {
    navigateTo("/checkout");
  } else {
    alert("Cart is empty. Please add products to cart before checkout.");
  }
};

const removeFromCart = async (productId) => {
  try {
    loadingCartById.value = productId;
    await $fetch(`/api/carts/${productId}`, {
      method: "DELETE",
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await refreshCart();
  } catch (error) {
    console.error("Failed to remove product from cart", error);
    alert("Failed to remove product from cart. Please try again.");
  } finally {
    loadingCartById.value = null;
  }
};
</script>
