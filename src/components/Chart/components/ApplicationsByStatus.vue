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
      I had a huge number of applications with no response.
      <br>
      And most of those jobs were posted by Recruiting Agencies!
      <br>
      I think these Recruiting Agencies hold a directory of CVs and ruin the job market. Their clients are big companies such as Banks.
      <br> <br>
      My question is why companies that have enough resource are interested in these agencies?
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
