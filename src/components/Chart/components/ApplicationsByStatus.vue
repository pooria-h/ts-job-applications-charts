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
      I had a huge number of applications with no response, and most of those jobs were posted by recruiting agencies!
      <br>
      I think these recruiting agencies hold a directory of CVs and ruin the job market. Their clients are big companies, such as banks.
      <br> <br>
      My question is, why are companies that have enough resources interested in these agencies?
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
      title="Status of Applications at the end"
      :description="description"
      :data="chartData"
    />
  </div>
</template>
