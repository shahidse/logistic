'use client'
import React, { useCallback } from 'react'
import CustomizedTables from '@/components/common/CustomizedTables'
import { deleteSale, getSales } from '@/lib/features/sales/salesThunk'
import { useTableHandler } from '@/hooks/tableHandler'
import { RootState } from '@/lib/store'

function CustomersSaless() {
    const formatedData = (data: any[]) =>
        data.map(({ ...rest }) => ({
            ...rest,
            createdBy: rest.createdBy.fullName,
            updatedBy: rest.updatedBy.fullName,
            client: rest.client.fullName,
            product: rest.product.name,
        }));
    const fetchSales = useCallback(() => {
        return getSales({ page: 1, limit: 10 });
    }, []);
    const { formattedData, selected, handleSelectAll, handleSelectRow, handleEdit, handleDelete } = useTableHandler(
        fetchSales,
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

export default CustomersSaless
