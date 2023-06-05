import React from 'react'
import ReactECharts from 'echarts-for-react';
import { useGetPropertiesQuery } from '../../services/api/propertyAPI';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentCompany } from '../../services/features/companySlice';

function RentalChart() {

  const {data} = useGetPropertiesQuery();

  const {company} = useAppSelector(selectCurrentCompany);

    {/* @ts-ignore:next-line */}
    const allProperties = data?.data?.filter((dat: any) => dat.companyId === company?.result._id).length

    {/* @ts-ignore:next-line */}
   const forRent = data?.data?.filter((dat: any) => dat.companyId === company?.result?._id).filter((dat:any) => dat.category === 'rent').length
 

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
          { value: allProperties, name: 'Total properties'},

          { value: forRent, name: 'For rent' },
        ]
      }
    ]
  };

  return (
    <div>
    <ReactECharts option={option} />
</div>
  )
}

export default RentalChart