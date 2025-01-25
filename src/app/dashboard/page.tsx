import CustomeBarChart from '@/components/common/CustomeBarChart'
import CustomizedTables from '@/components/common/CustomizedTables'
import CustomPieCahrt from '@/components/common/CustomPieChart'
import CustomScatterChart from '@/components/common/CustomScatterChart'
import React from 'react'

function page() {
    return (
        <div>
            {/* <CustomizedTables /> */}
            <div>
                <CustomeBarChart/>

            </div>
            <div className='flex'>
                <CustomPieCahrt/>
                <CustomScatterChart/>
            </div>
        </div>
    )
}

export default page
