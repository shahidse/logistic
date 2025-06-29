'use client'
import { useTableHandler } from '@/hooks/tableHandler'
import { deleteClient, getClient } from '@/lib/features/users/usersThunk';
import { RootState } from '@/lib/store';
import React from 'react'
import CustomizedTables from '@/components/common/CustomizedTables';

function Inventory() {
    const formatedData = (data: any[]) =>
        data.map(({ ...rest }) => ({
            ...rest,
            roles: rest.roles.role,
        }));
    const { formattedData, selected, handleSelectAll, handleSelectRow, handleEdit, handleDelete } = useTableHandler(
        getClient,
        deleteClient,
        (state: RootState) => state.users.data,
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
