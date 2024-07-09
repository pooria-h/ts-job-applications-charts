import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import type { JobApplicationInterface } from '@/interfaces/JobApplicationInterface';
import type { PieChartDataInterface } from '@/interfaces/PieChartDataInterface';
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

  function transformDataForBusinessTypeChart(): undefined | PieChartDataInterface {
    if (!applicationsJsonData.value) {
      console.error('NO_DATA_AVAILABLE');
      return undefined;
    }

    const dataSet = new Map<string, number>();
    applicationsJsonData.value.forEach((element) => {
      dataSet.set(element.businessType, (dataSet.get(element.businessType) || 0) + 1);
    });

    const total = Array.from(dataSet.values()).reduce((acc, value) => acc + value, 0);
    const labels: string[] = [];
    const backgroundColors: string[] = [];
    const data: number[] = [];
    dataSet.forEach((value, key) => {
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

  function transformDataForInterviewRateChart(): undefined | PieChartDataInterface {
    if (!applicationsJsonData.value) {
      console.error('NO_DATA_AVAILABLE');
      return undefined;
    }

    const dataSet = new Map<number, number>();
    applicationsJsonData.value.forEach((element) => {
      dataSet.set(element.hadInterview, (dataSet.get(element.hadInterview) || 0) + 1);
    });

    const total = Array.from(dataSet.values()).reduce((acc, value) => acc + value, 0);
    const labels: string[] = [];
    const backgroundColors: string[] = [];
    const data: number[] = [];
    dataSet.forEach((value, key) => {
      const percentage = ((value / total) * 100).toFixed(2);
      labels.push(key === 0 ? `Rejected (${percentage}%)` : `Had interview (${percentage}%)`);
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

  function transformDataForRejectionReasonChart(): undefined | PieChartDataInterface {
    if (!applicationsJsonData.value) {
      console.error('NO_DATA_AVAILABLE');
      return undefined;
    }

    const dataSet = new Map<string, number>();
    applicationsJsonData.value.forEach((element) => {
      dataSet.set(element.rejectionReason, (dataSet.get(element.rejectionReason) || 0) + 1);
    });

    const total = Array.from(dataSet.values()).reduce((acc, value) => acc + value, 0);
    const labels: string[] = [];
    const backgroundColors: string[] = [];
    const data: number[] = [];
    dataSet.forEach((value, key) => {
      const percentage = ((value / total) * 100).toFixed(2);
      labels.push(key === '' ? `Not Provided (${percentage}%)` : `${ApplicationsValues[key]} (${percentage}%)`);
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

  function transformDataForStatusChart() {
    if (!applicationsJsonData.value) {
      console.error('NO_DATA_AVAILABLE');
      return undefined;
    }

    const dataSet = new Map<string, number>();
    applicationsJsonData.value.forEach((element) => {
      dataSet.set(element.status, (dataSet.get(element.status) || 0) + 1);
    });

    const total = Array.from(dataSet.values()).reduce((acc, value) => acc + value, 0);
    const labels: string[] = [];
    const backgroundColors: string[] = [];
    const data: number[] = [];
    dataSet.forEach((value, key) => {
      const percentage = ((value / total) * 100).toFixed(2);
      // labels.push(key);
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

  return {
    applicationsJsonData,
    hasFailedToFetch,
    fetchData,
    transformDataForBusinessTypeChart,
    transformDataForInterviewRateChart,
    transformDataForRejectionReasonChart,
    transformDataForStatusChart,
  };
});
