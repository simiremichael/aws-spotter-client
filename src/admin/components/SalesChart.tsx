import React from 'react'
import ReactECharts from 'echarts-for-react';

const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '0',
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
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '22',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: [
          { value: 1048, name: 'Total properties' },
          { value: 428, name: 'For sale' },
        ]
      }
    ]
  };

  
function SalesChart() {
  return (
    <div>
    <ReactECharts option={option} />
</div>
  )
}

export default SalesChart