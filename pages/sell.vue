<template>
  <div>
    <form
      class="max-w-lg mx-auto space-y-4 bg-gray-50 p-6 rounded-md"
      @submit.prevent="sell"
    >
      <div>
        <label for="title" class="block mb-2.5 text-sm font-medium text-heading"
          >Title
        </label>
        <input
          type="text"
          id="title"
          v-model="title"
          class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="Enter product title"
          required
        />
      </div>
      <div>
        <label
          for="description"
          class="block mb-2.5 text-sm font-medium text-heading"
          >Description</label
        >
        <textarea
          id="description"
          v-model="description"
          class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
          placeholder="Enter product description"
          required
        ></textarea>
      </div>
      <div>
        <label for="price" class="block mb-2.5 text-sm font-medium text-heading"
          >Price</label
        >
        <input
          type="number"
          id="price"
          v-model="price"
          class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="Enter price"
          required
        />
      </div>
      <div>
        <label
          for="imageUrl"
          class="block mb-2.5 text-sm font-medium text-heading"
          >Image URL</label
        >
        <input
          type="text"
          id="imageUrl"
          v-model="image"
          class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="Enter image URL"
          required
        />
      </div>
      <div>
        <label
          for="category"
          class="block mb-2.5 text-sm font-medium text-heading"
          >Category
        </label>
        <input
          type="text"
          id="category"
          v-model="category"
          class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="Enter product title"
          required
        />
      </div>
      <button
        type="submit"
        :disabled="pending"
        class="text-white w-full bg-blue-500 box-border border border-transparent hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
      >
        {{ pending ? "Submitting..." : "Submit" }}
      </button>
    </form>
  </div>
</template>

<script setup>
const { user } = useAuth(); // Assuming you have an auth composable to get the current user
if (!user.value) {
  console.warn("User not authenticated, redirecting to login...");
  navigateTo("/login");
}

const title = ref("");
const description = ref("");
const price = ref(0);
const image = ref("");
const category = ref("");

const pending = ref(false);
const error = ref(null);

const sell = async () => {
  try {
    pending.value = true;

    const response = await $fetch("/api/products/createNewProduct", {
      method: "POST",
      body: {
        title: title.value,
        description: description.value,
        price: price.value,
        image: image.value,
        category: category.value,
      },
    });

    navigateTo("/"); // Redirect to home page after successful submission
  } catch (err) {
    error.value = err;
    console.error(err);
  } finally {
    pending.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
