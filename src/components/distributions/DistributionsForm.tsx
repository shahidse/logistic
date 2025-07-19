'use client'
import { Box } from '@mui/material'
import React, { useMemo } from 'react'
import CustomForm from '../common/CustomForm'
import CustomInput from '../common/CustomInput'
import ButtonStack from '../common/ButtonStack'
import CustomButton from '../common/CustomeButton'
import { useFormHandler } from '@/hooks/formHandler'
import { useAppSelector } from '@/lib/hooks'
import { addDistribution, getDistributionById } from '../../lib/features/distributions/distributionsThunk';
import { resetDistributionState, setFormState } from '@/lib/features/distributions/distributionSlice'
import { getProducts } from '@/lib/features/producsts/productsThunk'
import { getInventories } from '@/lib/features/inventory/inventoryThunk'
import { selectProductOptions } from '@/lib/features/producsts/selectors'
import { selectInventoryOptions } from '@/lib/features/inventory/selectors'
import { currencyArray, productsUnits } from '@/constants'

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
    const { name: distributionName, productId, inventoryId, saleCurrency, purchaseCurrency, unit, purchasePrice, salePrice, quantities, netPurchasePrice, expiry, netSalePrice } = form;
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
                className="flex gap-5 p-[32px] bg-background flex-wrap"
            >
                <CustomInput
                    name="productId"
                    onChange={handleChange}
                    value={productId}
                    fullWidth={false}
                    className=' md:w-[450px]'
                    label="Products"
                    sx={styles}
                    select
                    options={productsOptions}
                />
                <CustomInput
                    name="name"
                    onChange={handleChange}
                    value={distributionName}
                    fullWidth={false}
                    className=' md:w-[450px]'
                    label="Name"
                    sx={styles}
                />
                <CustomInput
                    name="inventoryId"
                    onChange={handleChange}
                    value={inventoryId}
                    fullWidth={false}
                    className=' md:w-[450px]'
                    label="Inventory"
                    sx={styles}
                    select
                    options={inventoryOptions}
                />
                <CustomInput
                    name="quantities"
                    type='number'
                    onChange={handleChange}
                    value={quantities}
                    fullWidth={false}
                    className=' md:w-[450px]'
                    label="Quantities"
                    sx={styles}
                />
                <CustomInput name='saleCurrency' onChange={handleChange} value={saleCurrency} fullWidth={false} className=' md:w-[250px]' label='Sale Currency' sx={styles} select options={currencyArray} />
                <CustomInput name='purchaseCurrency' onChange={handleChange} value={purchaseCurrency} fullWidth={false} className=' md:w-[250px]' label='Purchase Currency' sx={styles} select options={currencyArray} />
                <CustomInput name='unit' onChange={handleChange} value={unit} fullWidth={false} className=' md:w-[200px]' label='Product Unit' sx={styles} select options={productsUnits} />
                <CustomInput name='purchasePrice' type='number' onChange={handleChange} value={purchasePrice} fullWidth={false} className=' md:w-[200px]' label='Unit Purchase Price' sx={styles} />
                <CustomInput name='salePrice' type='number' onChange={handleChange} value={salePrice} fullWidth={false} className=' md:w-[200px]' label='Unit Sale Price' sx={styles} />
                <CustomInput name='quantities' onChange={handleChange} value={quantities} fullWidth={false} className=' md:w-[200px]' label='Product Quantities' sx={styles} type='number' />
                <CustomInput name='netPurchasePrice' type='number' onChange={handleChange} value={netPurchasePrice} fullWidth={false} className=' md:w-[200px]' label='Net Purchase Price' sx={styles} />
                <CustomInput name='netSalePrice' type='number' onChange={handleChange} value={netSalePrice} fullWidth={false} className=' md:w-[200px]' label='Net Sale Price' sx={styles} />
                <CustomInput name='expiry' onChange={handleChange} value={expiry} fullWidth={false} className=' md:w-[200px]' label='Product Expiry' required={false} sx={styles} type='date' />
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
