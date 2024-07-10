<script lang="ts">
import {
  defineComponent,
  type PropType,
} from 'vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line as LineChart } from 'vue-chartjs';
import type { ChartDataInterface } from '@/interfaces/ChartDataInterface';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
);

export default defineComponent({
  components: {
    LineChart,
  },
  props: {
    data: {
      type: Object as PropType<ChartDataInterface>,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  setup() {
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
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
  <div class="customLineChart">
    <div class="chartWrapper">
      <h2 class="title">
        {{ title }}
      </h2>
      <LineChart
        :data="data"
        :options="chartOptions"
      />
    </div>
    <p
      v-html="description"
      class="description"
    />
  </div>
</template>

<style scoped lang="scss">
.customLineChart {
  @apply m-2 p-3 border border-gray-200 rounded-lg shadow-sm flex flex-row flex-wrap items-center justify-center;
}
.chartWrapper {
  @apply w-full md:w-1/2 lg:w-1/3 flex flex-col items-center justify-center;
}
.title {
  @apply font-medium text-lg text-center mb-4;
}
.description {
  @apply w-full text-sm text-gray-700 mt-6 p-2 flex-1 md:ml-4;
}
</style>
