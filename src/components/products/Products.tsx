'use client'
import React from 'react'
import CustomizedTables from '@/components/common/CustomizedTables'
import { deleteProducts, getProducts } from '@/lib/features/producsts/productsThunk'
import { useTableHandler } from '@/hooks/tableHandler'
import { RootState } from '@/lib/store'

function Products() {
    const formatedData = (data: any[]) =>
        data.map(({ pros, cons, description, usage, ...rest }) => ({
            ...rest,
            addedBy: rest.addedBy.fullName,
            company: rest.company?.name,

        }));
    const { formattedData, selected, handleSelectAll, handleSelectRow, handleEdit, handleDelete } = useTableHandler(
        getProducts,
        deleteProducts,
        (state: RootState) => state.products.data,
        formatedData,
        '/dashboard/products'
    );
    return (
        <div>
            <CustomizedTables data={formattedData} isCheckBox handleSelectRow={handleSelectRow} handleSelectAll={handleSelectAll} selected={selected} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
    )
}

export default Products
