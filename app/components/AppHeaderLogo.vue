<script setup lang="ts">
const { data } = await useFetch('/api/version')
</script>

<template>
  <div class="text-2xl font-bold flex items-center">
    <span class="font-serif ">WP</span>
    <span class="text-primary">Nuxt</span>
    <UBadge
      v-if="data?.version"
      size="sm"
      variant="subtle"
      class="ml-2"
    >
      {{ data.version }}
    </UBadge>
  </div>
</template>
