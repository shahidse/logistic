'use client'
import React, { useEffect } from 'react'
import CustomizedTables from '../common/CustomizedTables'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { getCompany } from '@/lib/features/company/comapanyThunk'

function Company() {
    const dispatch = useAppDispatch()
    const { data } = useAppSelector(state => state.company)
    console.log('date', data)
    useEffect(() => {
        dispatch(getCompany())
    }, [dispatch])
    return (
        <div className='h-[600px]' >
            <CustomizedTables data={data}></CustomizedTables>
        </div>
    )
}

export default Company
