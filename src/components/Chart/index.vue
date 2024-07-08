<script lang="ts">
import { defineComponent, onBeforeMount, ref, type Ref } from 'vue';
import { useApplicationsStore } from '@/store/ApplicationsStore';
import ApplicationsByBusinessType from './components/ApplicationsByBusinessType.vue';
import ApplicationsByInterviewRate from './components/ApplicationsByInterviewRate.vue';
import ApplicationsByRejectionReason from './components/ApplicationsByRejectionReason.vue';
import ApplicationsByStatus from './components/ApplicationsByStatus.vue';
import type { PieChartDataInterface } from '@/interfaces/PieChartDataInterface';

export default defineComponent({
  components: {
    ApplicationsByBusinessType,
    ApplicationsByInterviewRate,
    ApplicationsByRejectionReason,
    ApplicationsByStatus,
  },
  setup() {
    const {
      fetchData,
      transformDataForBusinessTypeChart,
      transformDataForInterviewRateChart,
      transformDataForRejectionReasonChart,
      transformDataForStatusChart,
    } = useApplicationsStore();
    const businessTypeChartData: Ref<undefined | PieChartDataInterface> = ref(undefined);
    const interviewRateChartData: Ref<undefined | PieChartDataInterface> = ref(undefined);
    const rejectionReasonChartData: Ref<undefined | PieChartDataInterface> = ref(undefined);
    const statusChartData: Ref<undefined | PieChartDataInterface> = ref(undefined);
    const isReady = ref(false);

    onBeforeMount(() => {
      fetchData().then(() => {
        businessTypeChartData.value = transformDataForBusinessTypeChart();
        interviewRateChartData.value = transformDataForInterviewRateChart();
        rejectionReasonChartData.value = transformDataForRejectionReasonChart();
        statusChartData.value = transformDataForStatusChart();
        isReady.value = true;
      });
    });

    return {
      businessTypeChartData,
      interviewRateChartData,
      rejectionReasonChartData,
      statusChartData,
      isReady,
    };
  },
});
</script>

<template>
  <div class="chart">
    <template v-if="isReady">
      <template v-if="interviewRateChartData">
        <ApplicationsByInterviewRate :chart-data="interviewRateChartData" />
      </template>
      <template v-if="statusChartData">
        <ApplicationsByStatus :chart-data="statusChartData" />
      </template>
      <template v-if="rejectionReasonChartData">
        <ApplicationsByRejectionReason :chart-data="rejectionReasonChartData" />
      </template>
      <template v-if="businessTypeChartData">
        <ApplicationsByBusinessType :chart-data="businessTypeChartData" />
      </template>
    </template>
    <template v-else>
      <p class="message">
        No data available
      </p>
    </template>
  </div>
</template>

<style scoped>
.title {
  @apply text-xl font-bold mb-3;
}
.content {
  @apply flex flex-col;
}
.chartWrapper {
  @apply w-full mb-10;
  height: 400px;
}
.controls {
  @apply flex;
  gap: 2rem;
}
.datePickerHeader {
  @apply text-lg font-bold;
}
.message {
  @apply text-red-500 font-medium text-sm;
}
</style>
