<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { ChartDataInterface } from '@/interfaces/ChartDataInterface';
import CustomLineChart from '@/components/shared/CustomLineChart.vue';

export default defineComponent({
  components: {
    CustomLineChart,
  },
  props: {
    chartData: {
      type: Object as PropType<ChartDataInterface>,
      required: true,
    },
  },
  setup() {
    const description = `
      As a Frontend developer, I applied to 162 jobs from 01/05/2024 to 07/02/2024, over 6 months.
      Rather than mass applying, I picked the ones that were potential matches.
      I didn't charry pick though.
      <br>
      What I learned from this data is you should apply consistently without having expectation on the applications that are at the final stage.
      I stopped applying when I had applications at the final stage, That was wrong.
      <br>
      There were cases that I taught I would really get the job but I didn't! That was a big disappointment.
      <br>
      Having hope is good but having expectation on the job applications is bad.
      <br>
      At the fifth month, I was burnt out. That's why the number of monthly applications decreased. On the other hand, I was reaching the final stage more often.
    `;

    return {
      description,
    };
  },
});
</script>

<template>
  <div>
    <CustomLineChart
      title="Applications sent over time"
      :description="description"
      :data="chartData"
    />
  </div>
</template>
