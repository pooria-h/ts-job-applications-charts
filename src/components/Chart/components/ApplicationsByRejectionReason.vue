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
      It's not a surprise that companies don't provide feedback.
      As they receive a huge number of applications, they don't have time to provide feedback to each applicant.
      <br> <br>
      However, it's worth carefully looking at the feedback provided.
      For me, the main reasons for rejection that were out of my hands were:
      <br> <br>
      - Lack of knowledge of the Dutch language.
      <br>
      - IND's minimum salary threshold set for highly skilled migrants who are over 30 years old.
      <br>
      - The location of the office was too far, which was a red flag for hiring managers.

      <br> <br>
      IT companies in the Netherlands are significantly more open to hiring Dutch speakers. In 2022, this was not true.
      <br> <br>
      IND's minimum salary threshold for highly skilled migrants is questionable.
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
      title="Rejection reason"
      :description="description"
      :data="chartData"
    />
  </div>
</template>
