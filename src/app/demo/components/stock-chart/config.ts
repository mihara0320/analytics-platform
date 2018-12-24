import * as Highcharts from 'highcharts'

const entriesToLineChart = ["state_of_charge", "small_bat_soc", "small_bat_voltage", "small_bat_temp", "speed", "total_distance"]

export const config = (tv_data: any) => {
  let setSeries = () => {
    let series: Array<any> = [];
    Object.entries(tv_data).forEach(el => {
      entriesToLineChart.includes(el[0]) && (series.push({
        name: el[0],
        data: el[1],
        tooltip: { valueDecimals: 2}
      }))
    })
    return series
  }

  return {
    rangeSelector: { selected: 1 },
    navigator: { enabled: false },
    legend: { enabled: true },
    tooltip: { shared: true, split: false},
    yAxis: {
      floor: 0,
      ceiling: 100,
      resize: { enabled: true }
    },
    series: setSeries()
  }

}
