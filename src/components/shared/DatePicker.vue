<script lang="ts">
import { defineComponent, ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default defineComponent({
  components: {
    VueDatePicker,
  },
  props: {
    minDate: {
      type: Date,
      default: null,
    },
    maxDate: {
      type: Date,
      default: new Date(),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    initialDate: {
      type: Date,
      required: true,
    },
  },
  emits: ['date-update'],
  setup(props, { emit }) {
    const clonedInitialDate = ref(props.initialDate);

    function onDateUpdate(date: Date) {
      emit('date-update', date);
    }

    return {
      clonedInitialDate,
      onDateUpdate,
    };
  },
});
</script>

<template>
  <VueDatePicker
    v-model="clonedInitialDate"
    :min-date="minDate"
    :max-date="maxDate"
    :loading="loading"
    :enable-time-picker="false"
    inline
    vertical
    @date-update="onDateUpdate"
  >
    <template #action-buttons>
      <!-- Empty -->
    </template>
  </VueDatePicker>
</template>
