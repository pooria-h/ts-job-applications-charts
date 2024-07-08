<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType, ButtonHTMLAttributes } from 'vue';

export default defineComponent({
  props: {
    type: {
      type: String as PropType<ButtonHTMLAttributes['type']>,
      default: 'button',
    },
    styleType: {
      type: String,
      default: 'primary',
    },
    customClass: {
      type: String,
      default: '',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
});
</script>

<template>
  <button
    :disabled="isLoading"
    class="generalButton"
    :class="styleType"
    :type="type"
    :custom-class="customClass"
    @click="$emit('click')"
  >
    <i
      v-if="isLoading"
      class="spinner"
    />
    <slot />
  </button>
</template>

<style scoped>
@keyframes spinner {
  to {transform: rotate(360deg);}
}
.spinner {
  @apply inline-block w-3 h-3 mr-1 border-2 border-white border-t-transparent rounded-full animate-spin;
}
.generalButton {
  @apply py-2 px-4 text-white rounded font-medium relative;
}
.generalButton.primary {
  @apply bg-blue-500 text-white text-gray-200;
}
.generalButton.primary:hover {
  @apply bg-blue-600;
}
.generalButton.secondary {
  @apply border-solid border border-gray-200;
}
.generalButton.secondary:hover {
  @apply bg-gray-100 text-black;
}
.generalButton:disabled {
  @apply bg-gray-400 cursor-not-allowed;
}
.generalButton:disabled:hover {
  @apply bg-gray-400;
}
</style>
