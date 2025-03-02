'use client';
import ActionBar from '@/components/common/ActionBar'
import ButtonStack from '@/components/common/ButtonStack'
import CustomButton from '@/components/common/CustomeButton'
import { Add } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

function ProductsLayout({ children, params }: { children: React.JSX.Element, params: { id: string }; }) {
    const router = useRouter()
    const { id } = params;
    const handleAddProduct = () => {
        router.push('/dashboard/company/add')
    }
    return (
        <Box className='flex flex-col gap-8'>
            <ActionBar  >
                <ButtonStack>
                    <>
                        <CustomButton startIcon={<Add />} fullWidth={false} onClick={handleAddProduct} sx={{ backgroundColor: id != 'add' ? 'var(--action)' : 'var(--success)' }}>Add New Company</CustomButton>
                    </>
                </ButtonStack>

            </ActionBar>
            {children}
        </Box>
    )
}

export default ProductsLayout
