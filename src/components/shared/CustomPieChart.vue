<script lang="ts">
import { defineComponent, computed, type PropType, type ComputedRef } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  ArcElement,
} from 'chart.js';
import { Pie as PieChart } from 'vue-chartjs';
import type { PieChartDataInterface } from '@/interfaces/PieChartDataInterface';

ChartJS.register(
  Title,
  Tooltip,
  ArcElement,
);

interface LegendItem {
  value: number;
  color: string;
  label: string;
}

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
  setup(props) {
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    };
    const sortedLegendItems: ComputedRef<LegendItem[]> = computed(() => {
      if (!props.data) {
        return [];
      }
      const singleArray: LegendItem[] = props.data.datasets[0].data.map((value, index) => ({
        value,
        color: props.data.datasets[0].backgroundColor[index],
        label: props.data.labels[index],
      }));
      return singleArray.sort((a, b) => b.value - a.value);
    });

    return {
      chartOptions,
      sortedLegendItems,
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
      <div
        v-if="sortedLegendItems.length !== 0"
        class="legendItems"
      >
        <div
          v-for="item in sortedLegendItems"
          :key="item.label"
          class="flex items-center mb-2"
        >
          <div
            class="w-4 h-4 rounded-full mr-2"
            :style="{ backgroundColor: item.color }"
          >
          <!-- empty -->
          </div>
          <span class="text-xs font-medium text-gray-700">
            {{ item.label }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.customPieChart {
  @apply m-2 p-3 border border-gray-200 rounded-lg shadow-sm;
}
.chartWrapper {
  @apply w-full flex flex-col items-center justify-center;
}
.title {
  @apply font-medium text-lg text-center mb-4;
}
.legendItems {
  @apply mt-4 h-auto md:h-40 overflow-visible md:overflow-y-auto w-full;
}
</style>
