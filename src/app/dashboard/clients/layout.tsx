'use client';
import React from 'react'
import ActionBar from '@/components/common/ActionBar'
import ButtonStack from '@/components/common/ButtonStack'
import CustomButton from '@/components/common/CustomeButton'
import { Add, ArrowBack } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { resetState } from '@/lib/features/company/comapanySlice';
import CustomIconButton from '@/components/common/CustomIconButton';
import { motion, AnimatePresence } from 'framer-motion';
function ClientLayout({ children }: { children: React.JSX.Element }) {
    const router = useRouter()
    const param = useParams()
    const { id } = param
    const dispatch = useAppDispatch()
    const { form: { name } } = useAppSelector(state => state.company)

    const handleAddProduct = () => {
        dispatch(resetState())
        router.push('/dashboard/clients/add')
    }

    const handleBack = () => {
        router.back()
    }
    const safeId = typeof id === 'string' ? id : undefined;

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col gap-8'
        >
            {/* Animated Action Bar */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <ActionBar>
                    <ButtonStack className='flex justify-between w-full '>
                        <>
                            <Box className="flex items-center font-bold text-2xl gap-2">
                                {id === 'add' ? (
                                    <>
                                        <CustomIconButton handle={handleBack}>
                                            <ArrowBack />
                                        </CustomIconButton>
                                        Add New Client
                                    </>
                                ) : id ? `Edit ${name}` : ''}
                            </Box>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <CustomButton
                                    startIcon={<Add />}
                                    fullWidth={false}
                                    onClick={handleAddProduct}
                                    sx={{ backgroundColor: id !== 'add' ? 'var(--success)' : 'var(--action)' }}
                                >
                                    Add New Client
                                </CustomButton>
                            </motion.div>
                        </>
                    </ButtonStack>
                </ActionBar>
            </motion.div>

            {/* Animated Children (Page Content) */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={safeId}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    )

}

export default ClientLayout
