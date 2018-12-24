import * as Highcharts from 'highcharts'
let highcharts: any = Highcharts;

const entriesToLineChart = ["state_of_charge", "small_bat_soc", "small_bat_voltage", "small_bat_temp", "speed", "total_distance"]

var gaugeOptions = {
  chart: { type: 'solidgauge' },
  pane: {
    center: ['50%', '85%'],
    size: '140%',
    startAngle: -90,
    endAngle: 90,
    background: {
      backgroundColor: (highcharts.theme && highcharts.theme.background2) || '#EEE',
      innerRadius: '60%',
      outerRadius: '100%',
      shape: 'arc'
    }
  },
  tooltip: { enabled: false },
  yAxis: {
    stops: [
      [0.2, '#DF5353'], // red
      [0.5, '#DDDF0D'], // yellow
      [0.7, '#55BF3B'], // green
    ],
    lineWidth: 0,
    minorTickInterval: null,
    tickAmount: 2,
    title: { y: -70 },
    labels: { y: 16}
  },
  plotOptions: {
    solidgauge: {
      dataLabels: {
        y: 5,
        borderWidth: 0,
        useHTML: true
      }
    }
  }
};

export const config = (title: string, tv_data: any) => {
  return highcharts.merge(gaugeOptions, {
    title: { text: title},
    yAxis: {
      min: 0,
      max: 100,
    },
    credits: { enabled: false },
    series: [
      {
        data: [0],
        dataLabels: {
          format: '<div style="text-align:center"><span style="font-size:2em;color:' +
            ((highcharts.theme && highcharts.theme.contrastTextColor) || 'black') + '">{y}</span>' +
               '<span style="font-size:1.5em;color:silver">%</span></div>'
        },
        tooltip: { valueSuffix: ' %' }
      }
    ]
  })
}
