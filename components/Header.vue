<template>
  <div class="mb-20">
    <PublicNav v-if="!isLoggedIn" />
    <UserNav v-else :user="user" />
  </div>
</template>

<script setup>
const { user, isLoggedIn } = useAuth();
</script>

<style lang="scss" scoped></style>
