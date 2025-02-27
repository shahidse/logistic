'use client';
import ActionBar from '@/components/common/ActionBar'
import ButtonStack from '@/components/common/ButtonStack'
import CustomButton from '@/components/common/CustomeButton'
import { Add, Delete } from '@mui/icons-material'
import { Box } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

function ProductsLayout({ children }: { children: React.JSX.Element }) {
    const router = useRouter()
    const handleAddProduct = () => {
        router.push('/dashboard/products/edit')
    }
    const path = usePathname()
    const lastPath = path.split('/')[path.split('/').length - 1]
    return (
        <Box className='flex flex-col gap-8'>
            <ActionBar  >
                <ButtonStack className='flex justify-between w-full '>
                    <>
                        <Box className="flex items-center font-bold text-2xl pl-4"> {path.split('/')[path.split('/').length - 1] != 'edit' ? 'Add New Product' : 'Edit'}</Box>
                        <Box className=" flex  gap-4  ">

                            {lastPath == 'edit' && <CustomButton startIcon={<Delete />} fullWidth={false} onClick={handleAddProduct} sx={{ backgroundColor: 'var(--error)', }}>Delete Product</CustomButton>}
                            <CustomButton startIcon={<Add />} fullWidth={false} onClick={handleAddProduct} sx={{ backgroundColor: path == '/dashboard/products/0' ? 'var(--action)' : 'var(--success)' }}>Add Product</CustomButton>
                        </Box>
                    </>
                </ButtonStack>
            </ActionBar>
            {children}
        </Box>
    )
}

export default ProductsLayout
