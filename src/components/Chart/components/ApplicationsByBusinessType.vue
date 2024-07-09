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
    <CustomPieChart
      title="Business Type of the Companies"
      :data="chartData"
    />
  </div>
</template>
