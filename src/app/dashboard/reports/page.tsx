import React from 'react'
import CustomeBarChart from '@/components/common/CustomeBarChart'
import CustomPieCahrt from '@/components/common/CustomPieChart'
import CustomScatterChart from '@/components/common/CustomScatterChart'
function page() {
  return (
    <>
      <div>
        <CustomeBarChart />

      </div>
      <div className='flex'>
        <CustomPieCahrt />
        <CustomScatterChart />
      </div>
    </>

  )
}

export default page
