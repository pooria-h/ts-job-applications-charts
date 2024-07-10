<script lang="ts">
import { defineComponent } from 'vue';
import CustomFooter from '@/components/shared/CustomFooter.vue';

export default defineComponent({
  components: {
    CustomFooter,
  },
});
</script>

<template>
  <div class="app">
    <router-view />
    <CustomFooter />
  </div>
</template>

<style scoped>
.app {
  @apply p-2;
}
</style>
