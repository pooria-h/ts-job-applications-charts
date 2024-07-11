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
      As a Frontend developer, I applied to 162 jobs from 05-01-2024 to 02-07-2024, over 6 months.
      Rather than mass applying, I picked the ones that were potential matches. I didn't cherry-pick though.
      <br> <br>
      What I learned from this experience is that you should apply consistently without having any expectations for the applications that are at the final stage.
      I stopped applying when I had applications at the final stage, which was wrong.
      <br> <br>
      There were cases where I thought I would really get the job, but I didn't! That was a big disappointment.
      <br>
      Having hope is good, but having high expectations for job applications is bad.
      <br>
      By the fifth month, I was burnt out. That's why the number of monthly applications decreased. On the other hand, I was reaching the final stage more often.
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
      title="Applications sent each Month"
      :description="description"
      :data="chartData"
    />
  </div>
</template>
