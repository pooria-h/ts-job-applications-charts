<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { ChartDataInterface } from '@/interfaces/ChartDataInterface';
import CustomPieChart from '@/components/shared/CustomPieChart.vue';

export default defineComponent({
  components: {
    CustomPieChart,
  },
  props: {
    chartData: {
      type: Object as PropType<ChartDataInterface>,
      required: true,
    },
  },
  setup() {
    const description = `
      Besides IT consulting companies and recruiting agencies, which are at the top of the list,
      banks, finance companies, insurance companies, energy suppliers, and booking platforms are in demand of IT professionals.
    `;

    return {
      description,
    };
  },
});
</script>

<template>
  <div>
    <CustomPieChart
      title="Business Type of the Companies"
      :description="description"
      :data="chartData"
    />
  </div>
</template>
