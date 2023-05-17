import React from 'react'
import ReactECharts from 'echarts-for-react';


const option = {
    title: {
      text: 'Revenue chart',
      subtext: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Sales', 'Rentals']
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
    xAxis: [
      {
        type: 'category',
        // prettier-ignore
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Sales',
        type: 'bar',
        data: [
          5000000, 4600000, 7100000, 3400000, 6150000, 9810000, 7800000, 2200500, 8560000, 7654000, 11230000, 10200000
        ],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        // markLine: {
        //   data: [{ type: 'average', name: 'Avg' }]
        // }
      },
      {
        name: 'Rentals',
        type: 'bar',
        data: [
          7320000, 6300000, 9800000, 10430000, 15675000, 10100000, 5115000, 8745000, 12600000, 7980000, 9750000, 13750000
        ],
        markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min'}
            ]
          },
        // markLine: {
        //   data: [{ type: 'average', name: 'Avg' }]
        // }
      }
    ]
};
  
function RevenueChart() {
  return (
    <div>
    <ReactECharts option={option} />
</div>
  )
}

export default RevenueChart