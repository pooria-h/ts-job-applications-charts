export interface ChartDataInterface {
  labels: string[];
  datasets: {
    backgroundColor: string[] | string;
    borderColor?: string;
    borderWidth?: number;
    data: number[];
  }[];
}
