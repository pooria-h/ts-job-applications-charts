import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import type { JobApplicationInterface } from '@/interfaces/JobApplicationInterface';
import type { ChartDataInterface } from '@/interfaces/ChartDataInterface';
import { generateRandomHashColor } from '@/utils/generateRandomHashColor';
import { ApplicationsValues } from '@/constants/ApplicationsValues';

const baseURL = import.meta.env.VITE_APP_BASE_URL || 'UNDEFINED_ENV';

export const useApplicationsStore = defineStore('auth', () => {
  const applicationsJsonData: Ref<undefined | JobApplicationInterface[]> = ref(undefined);
  const hasFailedToFetch = ref(false);

  async function fetchData(): Promise<void> {
    try {
      const response = await fetch(`${baseURL}job-applications.json`);
      const data = await response.json();
      applicationsJsonData.value = data;
      hasFailedToFetch.value = false;
    }
    catch (error) {
      applicationsJsonData.value = undefined;
      hasFailedToFetch.value = true;
      throw new Error('FAILED_TO_FETCH_DATA');
    }
  }

  function transformDataForBusinessTypeChart(): undefined | ChartDataInterface {
    if (!applicationsJsonData.value) {
      console.error('NO_DATA_AVAILABLE');
      return undefined;
    }

    const dataMap = new Map<string, number>();
    applicationsJsonData.value.forEach((element) => {
      dataMap.set(
        element.businessType,
        (dataMap.get(element.businessType) || 0) + 1,
      );
    });

    const total = Array.from(dataMap.values()).reduce((acc, value) => acc + value, 0);
    const labels: string[] = [];
    const backgroundColors: string[] = [];
    const data: number[] = [];
    dataMap.forEach((value, key) => {
      const percentage = ((value / total) * 100).toFixed(2);
      labels.push(`${key} (${percentage}%)`);
      backgroundColors.push(generateRandomHashColor());
      data.push(value);
    });

    return {
      labels,
      datasets: [
        {
          backgroundColor: backgroundColors,
          data,
        },
      ],
    };
  }

  function transformDataForInterviewRateChart(): undefined | ChartDataInterface {
    if (!applicationsJsonData.value) {
      console.error('NO_DATA_AVAILABLE');
      return undefined;
    }

    const dataMap = new Map<number, number>();
    applicationsJsonData.value.forEach((element) => {
      dataMap.set(
        element.hadInterview,
        (dataMap.get(element.hadInterview) || 0) + 1,
      );
    });

    const total = Array.from(dataMap.values()).reduce((acc, value) => acc + value, 0);
    const labels: string[] = [];
    const backgroundColors: string[] = [];
    const data: number[] = [];
    dataMap.forEach((value, key) => {
      const percentage = ((value / total) * 100).toFixed(2);
      labels.push(
        key === 0
          ? `Rejected (${percentage}%)`
          : `Had interview (${percentage}%)`,
      );
      backgroundColors.push(generateRandomHashColor());
      data.push(value);
    });

    return {
      labels,
      datasets: [
        {
          backgroundColor: backgroundColors,
          data,
        },
      ],
    };
  }

  function transformDataForRejectionReasonChart(): undefined | ChartDataInterface {
    if (!applicationsJsonData.value) {
      console.error('NO_DATA_AVAILABLE');
      return undefined;
    }

    const dataMap = new Map<string, number>();
    applicationsJsonData.value.forEach((element) => {
      dataMap.set(
        element.rejectionReason,
        (dataMap.get(element.rejectionReason) || 0) + 1,
      );
    });

    const total = Array.from(dataMap.values()).reduce((acc, value) => acc + value, 0);
    const labels: string[] = [];
    const backgroundColors: string[] = [];
    const data: number[] = [];
    dataMap.forEach((value, key) => {
      const percentage = ((value / total) * 100).toFixed(2);
      labels.push(
        key === ''
          ? `Not Provided (${percentage}%)`
          : `${ApplicationsValues[key]} (${percentage}%)`,
      );
      backgroundColors.push(generateRandomHashColor());
      data.push(value);
    });

    return {
      labels,
      datasets: [
        {
          backgroundColor: backgroundColors,
          data,
        },
      ],
    };
  }

  function transformDataForStatusChart(): undefined | ChartDataInterface {
    if (!applicationsJsonData.value) {
      console.error('NO_DATA_AVAILABLE');
      return undefined;
    }

    const dataMap = new Map<string, number>();
    applicationsJsonData.value.forEach((element) => {
      dataMap.set(element.status, (dataMap.get(element.status) || 0) + 1);
    });

    const total = Array.from(dataMap.values()).reduce((acc, value) => acc + value, 0);
    const labels: string[] = [];
    const backgroundColors: string[] = [];
    const data: number[] = [];
    dataMap.forEach((value, key) => {
      const percentage = ((value / total) * 100).toFixed(2);
      labels.push(`${ApplicationsValues[key]} (${percentage}%)`);
      backgroundColors.push(generateRandomHashColor());
      data.push(value);
    });

    return {
      labels,
      datasets: [
        {
          backgroundColor: backgroundColors,
          data,
        },
      ],
    };
  }

  function transformDataForTimeChart(): undefined | ChartDataInterface {
    if (!applicationsJsonData.value) {
      console.error('NO_DATA_AVAILABLE');
      return undefined;
    }

    let totalApplications = 0;
    let currentDate = '';
    const labels: string[] = [];
    const data: number[] = [];
    applicationsJsonData.value.forEach((element) => {
      currentDate = `${element.applyDate.split('/')[0]}/${element.applyDate.split('/')[2]}`;
      totalApplications += 1;

      if (labels.includes(currentDate)) {
        data[labels.indexOf(currentDate)] = totalApplications;
        return;
      }

      labels.push(currentDate);
      data.push(totalApplications);
    });

    return {
      labels,
      datasets: [
        {
          backgroundColor: ApplicationsValues.DEFAULT_CHART_COLOR,
          borderColor: ApplicationsValues.DEFAULT_CHART_COLOR,
          borderWidth: 2,
          data,
        },
      ],
    };
  }

  return {
    applicationsJsonData,
    hasFailedToFetch,
    fetchData,
    transformDataForBusinessTypeChart,
    transformDataForInterviewRateChart,
    transformDataForRejectionReasonChart,
    transformDataForStatusChart,
    transformDataForTimeChart,
  };
});
