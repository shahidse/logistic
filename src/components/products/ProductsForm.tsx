'use client'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import CustomForm from '../common/CustomForm'
import CustomInput from '../common/CustomInput'
import ButtonStack from '../common/ButtonStack'
import CustomButton from '../common/CustomeButton'
import { currencyArray, productsUnits } from '@/constants'
import { addProducts, getProductsById } from '@/lib/features/producsts/productsThunk'
import { resetState, setFormState } from '@/lib/features/producsts/productsSlice'
import { useFormHandler } from '@/hooks/formHandler'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { getCompany } from '@/lib/features/company/comapanyThunk'

function ProductsForm({ id }: { id: string }) {
    const { form, loading, handleSubmit, handleChange, } = useFormHandler({
        sliceKey: "products",
        submitAction: addProducts,
        redirectPath: "products",
        setFormState,
        getDataById: getProductsById,
        id,
        resetState: resetState
    });
    const { name, companyId, saleCurrency, purchaseCurrency, unit, purchasePrice, salePrice, quantities, netPurchasePrice, expiry, pros, cons, usage, description, netSalePrice } = form;
    const dispatch = useAppDispatch()
    const { data } = useAppSelector((state) => state.company)
    const formattedData = React.useMemo(() => {
        const formatted = data?.length
            ? data.map(({ ...rest }) => ({
                label: rest?.name,
                value: rest?.id,
            }))
            : [];
        formatted.push({ value: 0, label: "Other" }); 
        return formatted;
    }, [data]);
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
            '& fieldset':{borderColor: 'var(--inputBorder)'},
            '&:hover fieldset': { borderColor: 'var(--foreground)' }, // Border color on hover
            '&.Mui-focused fieldset': { borderColor: 'var(--foreground)' }, // Border color on focus
            backdropFilter: 'blur(10px)',
        },
        '& .MuiInputBase-input': {
            color: 'var(--info)', // Text color inside input
        },
    }
    useEffect(() => {
        dispatch(getCompany())
    }, [dispatch])
    return (
        <Box  >
            <CustomForm onSubmit={handleSubmit} className='flex flex-row flex-wrap justify-start gap-3 md:gap-5 p-[32px] bg-background'>
                <CustomInput name='name' onChange={handleChange} value={name} fullWidth={false} className=' md:w-[450px]' label='Product Name' sx={styles} />
                <CustomInput name='companyId' onChange={handleChange} value={companyId} fullWidth={false} className=' md:w-[450px]' label='Product Company' sx={styles} select options={formattedData} />
                <CustomInput name='saleCurrency' onChange={handleChange} value={saleCurrency} fullWidth={false} className=' md:w-[250px]' label='Sale Currency' sx={styles} select options={currencyArray} />
                <CustomInput name='purchaseCurrency' onChange={handleChange} value={purchaseCurrency} fullWidth={false} className=' md:w-[250px]' label='Purchase Currency' sx={styles} select options={currencyArray} />
                <CustomInput name='unit' onChange={handleChange} value={unit} fullWidth={false} className=' md:w-[200px]' label='Product Unit' sx={styles} select options={productsUnits} />
                <CustomInput name='purchasePrice' type='number' onChange={handleChange} value={purchasePrice} fullWidth={false} className=' md:w-[200px]' label='Unit Purchase Price' sx={styles} />
                <CustomInput name='salePrice' type='number' onChange={handleChange} value={salePrice} fullWidth={false} className=' md:w-[200px]' label='Unit Sale Price' sx={styles} />
                <CustomInput name='quantities' onChange={handleChange} value={quantities} fullWidth={false} className=' md:w-[200px]' label='Product Quantities' sx={styles} type='number' />
                <CustomInput name='netPurchasePrice' type='number' onChange={handleChange} value={netPurchasePrice} fullWidth={false} className=' md:w-[200px]' label='Net Purchase Price' sx={styles} />
                <CustomInput name='netSalePrice' type='number' onChange={handleChange} value={netSalePrice} fullWidth={false} className=' md:w-[200px]' label='Net Sale Price' sx={styles} />
                <CustomInput name='expiry' onChange={handleChange} value={expiry} fullWidth={false} className=' md:w-[200px]' label='Product Expiry' required={false} sx={styles} type='date' />
                <Box className='flex flex-row flex-wrap gap-3 md:gap-5'>
                    <CustomInput name='pros' onChange={handleChange} value={pros} fullWidth={false} className=' md:w-[450px]' label='Product Pros' required={false} sx={styles} multiline />
                    <CustomInput name='cons' onChange={handleChange} value={cons} fullWidth={false} className=' md:w-[450px]' label='Product Cons' required={false} sx={styles} multiline />
                    <CustomInput name='usage' onChange={handleChange} value={usage} fullWidth={false} className=' md:w-[450px]' label='Product Usage' required={false} sx={styles} multiline />
                    <CustomInput name='description' onChange={handleChange} value={description} fullWidth={false} className=' md:w-[450px]' label='Product Description' required={false} sx={styles} multiline />
                </Box>
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

export default ProductsForm
