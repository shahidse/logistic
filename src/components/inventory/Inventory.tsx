'use client'
import { useTableHandler } from '@/hooks/tableHandler'
import { deleteClient, getClient } from '@/lib/features/users/usersThunk';
import { RootState } from '@/lib/store';
import React from 'react'
import CustomizedTables from '@/components/common/CustomizedTables';
import { deleteInventory, getInventories } from '@/lib/features/inventory/inventoryThunk';

function Inventory() {
    const formatedData = (data: any[]) =>
        data.map(({ ...rest }) => ({
            ...rest,
            brands:rest.brands.name,
            isActive: rest.isActive ? 'Active' : 'Inactive',
        }));
    const { formattedData, selected, handleSelectAll, handleSelectRow, handleEdit, handleDelete } = useTableHandler(
        getInventories,
        deleteInventory,
        (state: RootState) => state.inventory.data,
        formatedData,
        '/dashboard/inventory'
    );
    return (
        <div>
            <CustomizedTables data={formattedData} isCheckBox handleSelectRow={handleSelectRow} handleSelectAll={handleSelectAll} selected={selected} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
    )

}

export default Inventory
