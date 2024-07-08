<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  ArcElement,
} from 'chart.js';
import { Pie as PieChart } from 'vue-chartjs';
import type { PieChartDataInterface } from '@/interfaces/PieChartDataInterface';

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  ArcElement,
);

export default defineComponent({
  components: {
    PieChart,
  },
  props: {
    data: {
      type: Object as PropType<PieChartDataInterface>,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
  setup() {
    const chartOptions = {
      responsive: true,
      // maintainAspectRatio: false,
    };

    return {
      chartOptions,
    };
  },
});
</script>

<template>
  <div class="customPieChart">
    <div class="chartWrapper">
      <h2 class="title">
        {{ title }}
      </h2>
      <PieChart
        :data="data"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<style scoped>
.customPieChart {
  @apply p-4 overflow-hidden;
}
.chartWrapper {
  @apply w-full flex flex-col items-center justify-center mb-8;
  max-height: 480px;
}
.title {
  @apply font-medium text-lg text-center mb-4;
}
</style>
