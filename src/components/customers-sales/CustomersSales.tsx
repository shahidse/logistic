'use client'
import React, { useCallback } from 'react'
import CustomizedTables from '@/components/common/CustomizedTables'
import { useTableHandler } from '@/hooks/tableHandler'
import { RootState } from '@/lib/store'
import { getCustomerSales } from '@/lib/features/customer-sales/customerSalesThunk'
import { deleteCustomerSale } from '../../lib/features/customer-sales/customerSalesThunk';

function CustomersSaless() {
    const formatedData = (data: any[] = []) =>
        data.map((item) => ({
            ...item,
            sales: item?.sales?.name || '',
            customer:item?.customer?.fullName
        }));
    const fetchSales = useCallback(() => {
        return getCustomerSales();
    }, []);
    const { formattedData, selected, handleSelectAll, handleSelectRow, handleEdit, handleDelete } = useTableHandler(
        fetchSales,
        deleteCustomerSale,
        (state: RootState) => state.customerSales.data,
        formatedData,
        '/dashboard/cutomers-sales'
    );
    return (
        <div>
            <CustomizedTables data={formattedData} isCheckBox handleSelectRow={handleSelectRow} handleSelectAll={handleSelectAll} selected={selected} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
    )
}

export default CustomersSaless
