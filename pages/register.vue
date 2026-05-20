<template>
  <div>
    <form class="max-w-sm mx-auto" @submit.prevent="register">
      <div class="mb-5">
        <label for="email" class="block mb-2.5 text-sm font-medium text-heading"
          >Your email</label
        >
        <input
          type="email"
          id="email"
          v-model="email"
          class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="password"
          class="block mb-2.5 text-sm font-medium text-heading"
          >Your password</label
        >
        <input
          type="password"
          id="password"
          v-model="password"
          class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="••••••••"
          required
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="flex items-center justify-center text-center bg-blue-600 hover:bg-blue-700 box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
      >
        <span v-if="loading">Saving...</span>
        <span v-else>Register</span>
      </button>
    </form>
  </div>
</template>

<script setup>
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const register = async () => {
  if (loading.value) return;
  loading.value = true;
  error.value = "";

  try {
    const res = await $fetch("/api/auth/register", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });

    navigateTo("/");
  } catch (err) {
    error.value = err?.data?.statusMessage || "Terjadi kesalahan";
    alert(error.value);
  } finally {
    loading.value = false;
  }
};
</script>
