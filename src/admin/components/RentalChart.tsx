import React from 'react'
import ReactECharts from 'echarts-for-react';

const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['20%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '22',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
            { value: 1048, name: 'Total properties' },
            { value: 620, name: 'For rent' },
        ]
      }
    ]
  };

function RentalChart() {
  return (
    <div>
    <ReactECharts option={option} />
</div>
  )
}

export default RentalChart