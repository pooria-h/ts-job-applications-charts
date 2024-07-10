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
      The job market is tough. I have a good CV,
      I have worked in the field for over 8 years. But the interview rate is really low.
      <br>
      Though still it's worth to spend time on tailoring the CV and cover letter.
      <br> <br>
      After the first month, I made some changes on my CV and I created a template for cover letters, I believe that boosted the interview rate.
      <br>
      Most rejections were right after the application, It's hard to say the CV was the problem.
      <br>
      I believe at the time being, the job market is really competitive.
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
      title="Interview Rate"
      :description="description"
      :data="chartData"
    />
  </div>
</template>
