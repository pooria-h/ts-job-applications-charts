<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { PieChartDataInterface } from '@/interfaces/PieChartDataInterface';
import CustomPieChart from '@/components/shared/CustomPieChart.vue';

export default defineComponent({
  components: {
    CustomPieChart,
  },
  props: {
    chartData: {
      type: Object as PropType<PieChartDataInterface>,
      required: true,
    },
  },
});
</script>

<template>
  <div>
    <h1>Applications By Interview Rate</h1>
    <CustomPieChart
      :data="chartData"
    />
  </div>
</template>
