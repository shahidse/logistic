'use client';
import ActionBar from '@/components/common/ActionBar'
import ButtonStack from '@/components/common/ButtonStack'
import CustomButton from '@/components/common/CustomeButton'
import { resetState } from '@/lib/features/producsts/productsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Add, Delete } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React from 'react'

function ProductsLayout({ children }: { children: React.JSX.Element }) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { form: { name } } = useAppSelector(state => state.products)
    const handleAddProduct = () => {
        dispatch(resetState())
        router.push('/dashboard/products/add')
    }
    const { id } = useParams()
    return (
        <Box className='flex flex-col gap-8'>
            <ActionBar  >
                <ButtonStack className='flex justify-between w-full '>
                    <>
                        <Box className="flex items-center font-bold text-2xl pl-4">
                            {id === 'add' ? 'Add New Product' : id ? `Edit ${name}` : ''}
                        </Box>                        <Box className=" flex  gap-4  ">
                            <CustomButton startIcon={<Add />} fullWidth={false} onClick={handleAddProduct} sx={{ backgroundColor: id == 'add' ? 'var(--action)' : 'var(--success)' }}>Add New Product</CustomButton>
                        </Box>
                    </>
                </ButtonStack>
            </ActionBar>
            {children}
        </Box>
    )
}

export default ProductsLayout
