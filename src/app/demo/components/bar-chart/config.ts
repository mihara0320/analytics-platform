import * as Highcharts from 'highcharts'
let highcharts: any = Highcharts

export const config = (options: any) => {
  return {
    chart: {
      type: 'column'
    },
    title: {
      text: options.title
    },
    xAxis: {
      categories: [options.title]
    },
    yAxis: {
      floor: 0,
      ceiling: 100,
      min: 0,
      max: 100,
      resize: { enabled: true }
    },
    tooltip: {
      valueSuffix: options.unit
    },
    legend: {
      enabled: false
    },
    series: options.series
  }
}
