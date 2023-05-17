import React from 'react'
import ReactECharts from 'echarts-for-react';

// const option = {
//   title: {
//     text: '',
//     subtext: '',
//     left: 'center'
//   },
//     tooltip: {
//       trigger: 'item'
//     },
//     legend: {
//       orient: 'vertical',
//       left: 'left'
//     },
//     series: [
//       {
//         name: 'Access From',
//         type: 'pie',
//         radius: '50%',
//         data: [
//           { value: 987, name: 'Total property' },
//           { value: 680, name: 'Property for rent' },
          
//         ],
//         emphasis: {
//           itemStyle: {
//             shadowBlur: 10,
//             shadowOffsetX: 0,
//             shadowColor: 'rgba(0, 0, 0, 0.5)'
//           }
//         }
//       }
//     ]
//   };
const option = {
  title: {
    text: 'Propeties Chart'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['Property for sale', 'Property for rent']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
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
      name: 'Total properties for sale',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [120, 130, 200, 100, 150, 180, 80, 210, 245, 205, 195, 167 ]
    },
    {
      name: 'Total properties for rent',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [168, 201, 120, 305, 400, 402, 321, 219, 245, 301, 342, 201]
    },
   
  ]
};


  

function PropertyChart() {
  return (
    <div>
        <ReactECharts option={option} />
    </div>
  )
}

export default PropertyChart
