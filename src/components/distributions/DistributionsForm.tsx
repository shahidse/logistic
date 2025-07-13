'use client'
import { Box } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import CustomForm from '../common/CustomForm'
import CustomInput from '../common/CustomInput'
import ButtonStack from '../common/ButtonStack'
import CustomButton from '../common/CustomeButton'
import { useFormHandler } from '@/hooks/formHandler'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { addDistribution, getDistributionById } from '../../lib/features/distributions/distributionsThunk';
import { resetDistributionState, setFormState } from '@/lib/features/distributions/distributionSlice'
import { getProducts } from '@/lib/features/producsts/productsThunk'
import { getInventories } from '@/lib/features/inventory/inventoryThunk'
import { selectProductOptions } from '@/lib/features/producsts/selectors'
import { selectInventoryOptions } from '@/lib/features/inventory/selectors'

function DistributionsForm({ id }: { id: string }) {
    const extraDataFetchers = useMemo(() => [getProducts, getInventories], []);
    const { form, loading, handleSubmit, handleChange, } = useFormHandler({
        sliceKey: "distributions",
        submitAction: addDistribution,
        redirectPath: "distributions",
        setFormState,
        getDataById: getDistributionById,
        id,
        resetState: resetDistributionState,
        fetchExtraData: extraDataFetchers,
    });
    const productsOptions = useAppSelector(selectProductOptions);
    const inventoryOptions = useAppSelector(selectInventoryOptions)
    const { productId, inventoryId, totalDistributed } = form;
    const styles = {
        '& label': { color: 'var(--secondary)' }, // Default label color
        '& .MuiInputLabel-asterisk': {
            color: 'red',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            fontStyle: 'italic'
        },
        '& label.Mui-focused': { color: 'var(--foreground)' }, // Label color on focus
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'var(--inputBorder)' },
            '&:hover fieldset': { borderColor: 'var(--foreground)' }, // Border color on hover
            '&.Mui-focused fieldset': { borderColor: 'var(--foreground)' }, // Border color on focus
            backdropFilter: 'blur(10px)',
        },
        '& .MuiInputBase-input': {
            color: 'var(--info)', // Text color inside input
        },
    }
    return (
        <Box  >
            <CustomForm
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 p-[32px] bg-background"
            >
                <CustomInput
                    name="productId"
                    onChange={handleChange}
                    value={productId}
                    fullWidth
                    className="w-full"
                    label="Products"
                    sx={styles}
                    select
                    options={productsOptions}
                />
                <CustomInput
                    name="inventoryId"
                    onChange={handleChange}
                    value={inventoryId}
                    fullWidth
                    className="w-full"
                    label="Inventory"
                    sx={styles}
                    select
                    options={inventoryOptions}
                />
                <CustomInput
                    name="totalDistributed"
                    type='number'
                    onChange={handleChange}
                    value={totalDistributed}
                    fullWidth
                    className="w-full"
                    label="Distributions"
                    sx={styles}
                />
                <ButtonStack className='flex justify-end w-full pt-4'>
                    <Box className=" flex justify-between gap-4 w-[450px] ">
                        <CustomButton className='flex ' variant='outlined' sx={{ backgroundColor: "transparent" }} type='reset'>
                            Cancel
                        </CustomButton>
                        <CustomButton className='flex' loading={loading} sx={{ backgroundColor: "var(--info) " }} type='submit'>
                            Submit
                        </CustomButton>
                    </Box>
                </ButtonStack>
            </CustomForm>
        </Box>
    )

}

export default DistributionsForm
