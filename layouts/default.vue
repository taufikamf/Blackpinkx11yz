<template>
  <div v-if="!postStore.showContent" class="w-screen h-screen bg-white">

  </div>
    <div>
      <AppHeader/>
      <section class="p-7">
        <slot />
      </section>
      <AppFooter />
    </div>
  </template>

<script setup>
import { usePostStore } from '~/stores/PostStore';
const postStore = usePostStore()
</script>
  