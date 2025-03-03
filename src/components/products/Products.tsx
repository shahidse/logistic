'use client'
import React, { useEffect } from 'react'
import CustomizedTables from '@/components/common/CustomizedTables'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import { useSnackbar } from '../common/SnakeBarProvider'
import { deleteProducts, getProducts } from '@/lib/features/producsts/productsThunk'

function Products() {
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
        router.push(`/dashboard/products/${id}`)
    };
    const handleDelete = (id: string) => {
        dispatch(deleteProducts(id)).then((res) => {
            if (res.type === 'products/delete/fulfilled') {
                showSnackbar('products deleted successfully!', 'success')
                dispatch(getProducts())
            }
            if (res.type === 'products/delete/rejected') {
                showSnackbar('products deletion failed!', 'error')
            }
        }
        ).catch((err) => {
            console.log(err)
            showSnackbar('products deletion failed!', 'error')
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
    const { data } = useAppSelector(state => state.products)
    const formattedData = React.useMemo(() =>
        data.map(({ ...rest }) => ({
            ...rest,
            addedBy: rest.addedBy.fullName,
            company: rest.company?.name,
            expiry: new Date(rest.foundingDate).toLocaleDateString(),
        })),
        [data]);
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <div>
            <CustomizedTables data={formattedData} isCheckBox handleSelectRow={handleSelectRow} handleSelectAll={handleSelectAll} selected={selected} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
    )
}

export default Products
