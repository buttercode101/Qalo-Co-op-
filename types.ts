
export interface SimulationInputs {
  members: number;
  monthlyContribution: number;
  durationMonths: number;
  annualReturnRate: number;
}

export interface SimulationResults {
  totalMonthly: number;
  totalSavings: number;
  projectedReturns: number;
  dataPoints: ChartDataPoint[];
}

export interface ChartDataPoint {
  month: number;
  year: number;
  savings: number;
}

export interface Scenario {
  name: string;
  members: number;
  monthly: number;
  duration: number;
  rate: number;
}
