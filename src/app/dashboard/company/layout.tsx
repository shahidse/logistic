'use client';
import ActionBar from '@/components/common/ActionBar'
import ButtonStack from '@/components/common/ButtonStack'
import CustomButton from '@/components/common/CustomeButton'
import { Add } from '@mui/icons-material'
import { Box } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

function ProductsLayout({ children }: { children: React.JSX.Element }) {
    const router = useRouter()
    
    const handleAddProduct = () => {
        router.push('/dashboard/company/0')
    }
    const path = usePathname()
    return (
        <Box className='flex flex-col gap-8'>
            <ActionBar  >
                <ButtonStack>
                    <>
                        <CustomButton startIcon={<Add />} fullWidth={false} onClick={handleAddProduct} sx={{ backgroundColor: path == '/dashboard/company/0' ? 'var(--action)' : 'var(--success)' }}>Add Company</CustomButton>
                    </>
                </ButtonStack>

            </ActionBar>
            {children}
        </Box>
    )
}

export default ProductsLayout
