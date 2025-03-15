'use client'
import React from 'react'
import CustomizedTables from '../common/CustomizedTables'
import { deleteCompany, getCompany } from '@/lib/features/company/comapanyThunk'
import { useTableHandler } from '@/hooks/tableHandler'
import { RootState } from '@/lib/store'

function Company() {

    const formatedData = (data: any[]) =>
        data.map(({ products, ...rest }) => ({
            ...rest,
            addedBy: rest.addedBy.fullName,
            foundingDate: new Date(rest.foundingDate).toLocaleDateString(),
        }));
    const { formattedData, selected, handleSelectAll, handleSelectRow, handleEdit, handleDelete } = useTableHandler(
        getCompany,
        deleteCompany,
        (state: RootState) => state.company.data,
        formatedData,
        '/dashboard/company'
    );

    return (
        <div className='h-[650px]' >
            <CustomizedTables data={formattedData} isCheckBox handleSelectRow={handleSelectRow} handleSelectAll={handleSelectAll} selected={selected} handleEdit={handleEdit} handleDelete={handleDelete}></CustomizedTables>
        </div>
    )
}

export default Company
