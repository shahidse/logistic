'use client'
import React from 'react'
import CustomizedTables from '@/components/common/CustomizedTables'
import { deleteSale, getSales } from '@/lib/features/sales/salesThunk'
import { useTableHandler } from '@/hooks/tableHandler'
import { RootState } from '@/lib/store'

function Sales() {
    const formatedData = (data: any[]) =>
        data.map(({ ...rest }) => ({
            ...rest,
            createdBy: rest.createdBy.fullName,
            updatedBy: rest.updatedBy.fullName,
        }));
    const { formattedData, selected, handleSelectAll, handleSelectRow, handleEdit, handleDelete } = useTableHandler(
        () => getSales({ page: 1, limit: 10 }),
        deleteSale,
        (state: RootState) => state.sales.data,
        formatedData,
        '/dashboard/sales'
    );
    return (
        <div>
            <CustomizedTables data={formattedData} isCheckBox handleSelectRow={handleSelectRow} handleSelectAll={handleSelectAll} selected={selected} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
    )
}

export default Sales
