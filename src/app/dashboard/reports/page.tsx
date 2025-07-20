import React from 'react'
import CustomeBarChart from '@/components/common/CustomeBarChart'
import CustomPieCahrt from '@/components/common/CustomPieChart'
import CustomScatterChart from '@/components/common/CustomScatterChart'
import LogisticsReport from '@/components/reports/resport'
function page() {
  return (
    <>
      <div>
        <LogisticsReport />

      </div>
      {/* <div className='flex'>
        <CustomPieCahrt />
        <CustomScatterChart />
      </div> */}
    </>

  )
}

export default page
