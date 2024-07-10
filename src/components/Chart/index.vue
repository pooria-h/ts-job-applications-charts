<script lang="ts">
import { defineComponent, onBeforeMount, ref, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useApplicationsStore } from '@/store/ApplicationsStore';
import ApplicationsByBusinessType from './components/ApplicationsByBusinessType.vue';
import ApplicationsByInterviewRate from './components/ApplicationsByInterviewRate.vue';
import ApplicationsByRejectionReason from './components/ApplicationsByRejectionReason.vue';
import ApplicationsByStatus from './components/ApplicationsByStatus.vue';
import ApplicationsByTime from './components/ApplicationsByTime.vue';
import type { ChartDataInterface } from '@/interfaces/ChartDataInterface';

export default defineComponent({
  components: {
    ApplicationsByBusinessType,
    ApplicationsByInterviewRate,
    ApplicationsByRejectionReason,
    ApplicationsByStatus,
    ApplicationsByTime,
  },
  setup() {
    const {
      fetchData,
      transformDataForBusinessTypeChart,
      transformDataForInterviewRateChart,
      transformDataForRejectionReasonChart,
      transformDataForStatusChart,
      transformDataForTimeChart,
    } = useApplicationsStore();
    const { hasFailedToFetch } = storeToRefs(useApplicationsStore());
    const businessTypeChartData: Ref<undefined | ChartDataInterface> = ref(undefined);
    const interviewRateChartData: Ref<undefined | ChartDataInterface> = ref(undefined);
    const rejectionReasonChartData: Ref<undefined | ChartDataInterface> = ref(undefined);
    const statusChartData: Ref<undefined | ChartDataInterface> = ref(undefined);
    const timeChartData: Ref<undefined | ChartDataInterface> = ref(undefined);
    const isReady = ref(false);

    onBeforeMount(() => {
      fetchData().then(() => {
        businessTypeChartData.value = transformDataForBusinessTypeChart();
        interviewRateChartData.value = transformDataForInterviewRateChart();
        rejectionReasonChartData.value = transformDataForRejectionReasonChart();
        statusChartData.value = transformDataForStatusChart();
        timeChartData.value = transformDataForTimeChart();
        isReady.value = true;
      });
    });

    return {
      businessTypeChartData,
      interviewRateChartData,
      rejectionReasonChartData,
      statusChartData,
      timeChartData,
      isReady,
      hasFailedToFetch,
    };
  },
});
</script>

<template>
  <div class="chart">
    <template v-if="isReady">
      <div
        v-if="timeChartData"
        class="w-full"
      >
        <ApplicationsByTime :chart-data="timeChartData" />
      </div>
      <div
        v-if="interviewRateChartData"
        class="chart-item"
      >
        <ApplicationsByInterviewRate :chart-data="interviewRateChartData" />
      </div>
      <div
        v-if="statusChartData"
        class="chart-item"
      >
        <ApplicationsByStatus :chart-data="statusChartData" />
      </div>
      <div
        v-if="rejectionReasonChartData"
        class="chart-item"
      >
        <ApplicationsByRejectionReason :chart-data="rejectionReasonChartData" />
      </div>
      <div
        v-if="businessTypeChartData"
        class="chart-item"
      >
        <ApplicationsByBusinessType :chart-data="businessTypeChartData" />
      </div>
    </template>
    <template v-if="!isReady && !hasFailedToFetch">
      <p>Loading...</p>
    </template>
    <template v-if="hasFailedToFetch">
      <p class="message">
        Failed to fetch data.
      </p>
    </template>
  </div>
</template>

<style scoped>
.chart {
  @apply flex flex-row flex-wrap;
}
.chart-item {
  @apply w-full md:w-1/2 lg:w-1/4;
}
.message {
  @apply text-red-500 font-medium text-sm;
}
</style>
