'use client';
import ActionBar from '@/components/common/ActionBar'
import ButtonStack from '@/components/common/ButtonStack'
import CustomButton from '@/components/common/CustomeButton'
import { Add } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { resetState } from '@/lib/features/company/comapanySlice';

function CompanyLayout({ children }: { children: React.JSX.Element }) {
    const router = useRouter()
    const param = useParams()
    const { id } = param
    const dispatch = useAppDispatch()
    const { form: { name } } = useAppSelector(state => state.company)
    const handleAddProduct = () => {
        dispatch(resetState())
        router.push('/dashboard/company/add')
    }
    return (
        <Box className='flex flex-col gap-8'>
            <ActionBar>
                <ButtonStack className='flex justify-between w-full '>
                    <>
                        <Box className="flex items-center font-bold text-2xl pl-4">
                            {id === 'add' ? 'Add New Company' : id ? `Edit ${name}` : ''}
                        </Box>

                        <CustomButton
                            startIcon={<Add />}
                            fullWidth={false}
                            onClick={handleAddProduct}
                            sx={{ backgroundColor: id !== 'add' ? 'var(--success)' : 'var(--action)' }}
                        >
                            Add New Company
                        </CustomButton>
                    </>
                </ButtonStack>
            </ActionBar>
            {children}
        </Box>
    )
}

export default CompanyLayout
