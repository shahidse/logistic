'use client'
import React, { useCallback } from 'react'
import CustomizedTables from '@/components/common/CustomizedTables'
import { useTableHandler } from '@/hooks/tableHandler'
import { RootState } from '@/lib/store'
import { deleteDistribution, getDistributions } from '@/lib/features/distributions/distributionsThunk'

function Distributions() {
    const formatedData = (data: any[]) =>
        data.map(({ ...rest }) => ({
            ...rest,
            product: rest.product.name,
            inventory: rest.inventory.name,
        }));
    const fetchSales = useCallback(() => {
        return getDistributions({ page: 1, limit: 10 });
    }, []);
    const { formattedData, selected, handleSelectAll, handleSelectRow, handleEdit, handleDelete } = useTableHandler(
        fetchSales,
        deleteDistribution,
        (state: RootState) => state.distributions.data,
        formatedData,
        '/dashboard/distributions',
    );
    return (
        <div>
            <CustomizedTables data={formattedData} isCheckBox handleSelectRow={handleSelectRow} handleSelectAll={handleSelectAll} selected={selected} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
    )
}

export default Distributions
