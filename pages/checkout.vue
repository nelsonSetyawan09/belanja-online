<template>
  <div>
    <div
      class="w-full max-w-sm p-6 bg-neutral-primary-soft border border-default rounded-base shadow-xs"
    >
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-semibold leading-none text-heading">
          List Product
        </h5>
      </div>
      <div class="flow-root">
        <ul role="list" class="divide-y divide-default">
          <li class="py-4 sm:py-4">
            <div class="flex items-center gap-2">
              <div class="shrink-0">
                <img class="w-8 h-8 rounded-full" src="#" alt="Neil image" />
              </div>
              <div class="flex-1 min-w-0 ms-2">
                <p class="font-medium text-heading truncate">Neil Sims</p>
                <p class="text-sm text-body truncate">email@windster.com</p>
              </div>
              <div class="inline-flex items-center font-medium text-heading">
                $320
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const cartProducts = useState(() => []);
</script>
