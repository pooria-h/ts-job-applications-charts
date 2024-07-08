export interface PieChartDataInterface {
  labels: string[];
  datasets: {
    backgroundColor: string[];
    data: number[];
  }[];
}
