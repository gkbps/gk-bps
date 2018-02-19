export interface Dashboard {
    name: string,
    content?: any,
    remarks?: any[],
    status1?: string,
    status2?: string
}

export interface DashboardPage {
    module: string,
    type: string,
    creator: string,
    name: string,
    content?: any[],
    remarks?: any[],
    status1?: string,
    status2?: string
}

export interface DashboardItem {
  module: string,
  label: string,
  icon: string;
  grid: string,
  component: string,
  params: {
    dimensions: any[],
    measures: any[]
  },
  inputs: {},
  outputs: {}
  status1: string,
  status2: string
}
