'use client';
import ActionBar from '@/components/common/ActionBar'
import ButtonStack from '@/components/common/ButtonStack'
import CustomButton from '@/components/common/CustomeButton'
import CustomIconButton from '@/components/common/CustomIconButton';
import { resetState } from '@/lib/features/producsts/productsSlice';
import { useAppDispatch, } from '@/lib/hooks';
import { Add, ArrowBack } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
function SalesLayout({ children }: { children: React.JSX.Element }) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { id } = useParams()

    const handleAddProduct = () => {
        dispatch(resetState())
        router.push('/dashboard/customers-sales/add')
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
                            <Box className="flex items-center font-bold text-xl md:text-2xl gap-2">
                                <CustomIconButton handle={handleBack}>
                                    <ArrowBack />
                                </CustomIconButton>
                                {id === 'add' ? (
                                    <p>
                                        Add New Customers Sale
                                    </p>
                                ) : id ? `Edit Sale with id ${id}` : ''}
                            </Box>

                            {/* Animated Button */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <CustomButton
                                    startIcon={<Add />}
                                    fullWidth={false}
                                    onClick={handleAddProduct}
                                    sx={{ backgroundColor: id === 'add' ? 'var(--action)' : 'var(--success)' }}
                                >
                                    Add New Customers Sale
                                </CustomButton>
                            </motion.div>
                        </>
                    </ButtonStack>
                </ActionBar>
            </motion.div>

            {/* Animated Page Content */}
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

export default SalesLayout
