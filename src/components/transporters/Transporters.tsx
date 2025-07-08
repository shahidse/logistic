'use client'
import { useTableHandler } from '@/hooks/tableHandler'
import { deleteClient, getTransporters } from '@/lib/features/users/usersThunk';
import { RootState } from '@/lib/store';
import React from 'react'
import CustomizedTables from '@/components/common/CustomizedTables';

function Transporters() {
    const formatedData = (data: any[]) =>
        data.map(({ password, encryptedPassword, profilePic, ...rest }) => ({
            ...rest,
            roles: rest.roles.role,
        }));
    const { formattedData, selected, handleSelectAll, handleSelectRow, handleEdit, handleDelete } = useTableHandler(
        getTransporters,
        deleteClient,
        (state: RootState) => state.users.data,
        formatedData,
        '/dashboard/transporters'
    );
    return (
        <div>
            <CustomizedTables data={formattedData} isCheckBox handleSelectRow={handleSelectRow} handleSelectAll={handleSelectAll} selected={selected} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
    )

}

export default Transporters
