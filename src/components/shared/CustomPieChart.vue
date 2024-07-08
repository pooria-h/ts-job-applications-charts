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
  },
  setup() {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
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
      <PieChart
        :data="data"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<style scoped>
.chartWrapper {
  width: 100%;
  height: 480px;
}
</style>
