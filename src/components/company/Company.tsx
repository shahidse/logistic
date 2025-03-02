'use client'
import React, { useEffect } from 'react'
import CustomizedTables from '../common/CustomizedTables'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { deleteCompany, getCompany } from '@/lib/features/company/comapanyThunk'
import { useRouter } from 'next/navigation'
import { useSnackbar } from '../common/SnakeBarProvider'

function Company() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { showSnackbar } = useSnackbar()
    const [selected, setSelected] = React.useState<number[]>([]);
    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelected(data.map((row) => row.id)); // Select all IDs
        } else {
            setSelected([]);
        }
    };
    const handleEdit = (id: number) => {
        router.push(`/dashboard/company/${id}`)
    };
    const handleDelete = (id: string) => {
        dispatch(deleteCompany(id)).then((res) => {
            if (res.type === 'company/delete/fulfilled') {
                showSnackbar('Company deleted successfully!', 'success')
                dispatch(getCompany())
            }
            if (res.type === 'company/delete/rejected') {
                showSnackbar('Company deletion failed!', 'error')
            }
        }
        ).catch((err) => {
            console.log(err)
            showSnackbar('Company deletion failed!', 'error')
        }
        )
    };
    const handleSelectRow = (id: number) => {
        setSelected((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((selectedId) => selectedId !== id)
                : [...prevSelected, id]
        );
    };
    const { data } = useAppSelector(state => state.company)
    const formattedData = React.useMemo(() =>
        data.map(({ products, ...rest }) => ({
            ...rest,
            addedBy: rest.addedBy.fullName,
            foundingDate: new Date(rest.foundingDate).toLocaleDateString(),
        })),
        [data]);
    useEffect(() => {
        dispatch(getCompany())
    }, [dispatch])

    return (
        <div className='h-[650px]' >
            <CustomizedTables data={formattedData} isCheckBox handleSelectRow={handleSelectRow} handleSelectAll={handleSelectAll} selected={selected} handleEdit={handleEdit} handleDelete={handleDelete}></CustomizedTables>
        </div>
    )
}

export default Company
