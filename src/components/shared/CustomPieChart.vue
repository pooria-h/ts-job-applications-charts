<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Pie as PieChart } from 'vue-chartjs';
import type { PieChartDataInterface } from '@/interfaces/PieChartDataInterface';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
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
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
        },
      },
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
  @apply m-2 p-3 border border-gray-200 rounded-lg shadow-sm;
}
.chartWrapper {
  @apply w-full flex flex-col items-center justify-center mb-8;
}
.title {
  @apply font-medium text-lg text-center mb-4;
}
</style>
