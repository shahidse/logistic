'use client'
import { Box, Divider, SelectChangeEvent } from '@mui/material'
import React, { Fragment, useEffect, } from 'react'
import CustomForm from '../common/CustomForm'
import CustomInput from '../common/CustomInput'
import ButtonStack from '../common/ButtonStack'
import CustomButton from '../common/CustomeButton'
import { currencyArray, PaymentMethod, SaleStatus, ShippingStatus } from '@/constants'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { Add, Delete } from '@mui/icons-material'
import CustomIconButton from '../common/CustomIconButton'
import MultipleSelectChip from '../common/MultipleSelectChip'
import { getClient } from '@/lib/features/users/usersThunk'
import { addClientId, addProduct, removeProduct, resetState, setProductFormState } from '@/lib/features/sales/saleSlice'
import { useRouter } from 'next/navigation'
import { getProducts } from '@/lib/features/producsts/productsThunk'
import { addSale } from '@/lib/features/sales/salesThunk'
import { useSnackbar } from '../common/SnakeBarProvider'

function SalesForm({ id }: { id: string }) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { showSnackbar } = useSnackbar()
    const { data } = useAppSelector((state) => state.users)
    const productData = useAppSelector((state) => state.products);
    const { form: { products, clientIds }, loading, error } = useAppSelector((state) => state.sales)
    const styles = {
        '& label': { color: 'var(--secondary)' },
        '& .MuiInputLabel-asterisk': {
            color: 'red',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            fontStyle: 'italic'
        },
        '& label.Mui-focused': { color: 'var(--foreground)' },
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'var(--inputBorder)' },
            '&:hover fieldset': { borderColor: 'var(--foreground)' },
            '&.Mui-focused fieldset': { borderColor: 'var(--foreground)' },
            backdropFilter: 'blur(10px)',
        },
        '& .MuiInputBase-input': {
            color: 'var(--info)',
        },
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addSale({ products, clientIds }))
            .then((res) => {
                if (res.type.endsWith("/fulfilled")) {
                    showSnackbar("Form submitted successfully!", "success");
                    resetState();
                    router.push("/dashboard/sales");
                }
                else if (res.type.endsWith("/rejected")) {
                    showSnackbar(error || "Submission failed!", "error");
                }
            }
            )
            .catch((err) => {
                showSnackbar(err.message, "error");
            });
    }
    const addProductField = () => {
        dispatch(addProduct())
    };
    const removeProductField = (index: number) => {
        if (products.length > 1) {
            dispatch(removeProduct(index))
        }
    };
    const handleChange = (e: any, index: number) => {
        const { name, value } = e.target;
        dispatch(setProductFormState({ index, key: name, value }))
    }
    const handleSelectChange = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;
        const selectedIds = typeof value === 'string' ? value.split(',') : value;
        dispatch(addClientId(selectedIds))
    };
    const clientsOptions = React.useMemo(() => {
        const formatted = data.length
            ? data.map(({ ...rest }) => {
                return { label: rest?.fullName, value: rest?.id }
            }
            )
            : [];
        return formatted;
    }, [data]);


    const productsOptions = React.useMemo(() => {
        const formatted = productData.data.length
            ? productData.data.map((p: any) => ({
                label: p.name,
                value: Number(p.id)
            }))
            : [];
        if (formatted.length === 0) {
            formatted.push({ label: "No Product", value: 0 })
        }
        return formatted
    }, [productData.data]);
    useEffect(() => {
        dispatch(getClient());
        dispatch(getProducts())
    }, [dispatch]);
    return (
        <Box className='h-[65vh]'>
            <CustomForm onSubmit={handleSubmit} className='max-h-full overflow-y-auto flex flex-row flex-wrap justify-start gap-3 md:gap-5 p-[32px] bg-background' >
                <Box className='flex w-full flex-col gap-5'>
                    <p className='text-2xl font-semibold'>Client</p>
                    <MultipleSelectChip label="Select Clients"
                        options={clientsOptions}
                        value={clientIds}
                        onChange={handleSelectChange} />
                    <Divider />
                </Box>
                <Box className="flex w-full flex-col gap-4">
                    <p className='text-2xl font-semibold'>Products</p>
                    <Box className="flex gap-4 flex-wrap">
                        {products.map((product, index) => (
                            <Fragment key={index}>
                                <Box className="flex gap-4 flex-wrap w-full">
                                    {/* Delete Button to remove the field set */}
                                    {products.length > 1 && (
                                        <CustomIconButton handle={() => removeProductField(index)} color="error" >
                                            <Delete />
                                        </CustomIconButton>
                                    )
                                    }
                                    <CustomInput
                                        name={`id`}
                                        onChange={(e: any) => handleChange(e, index)}
                                        value={product.id}
                                        fullWidth={false}
                                        className='md:w-[250px]'
                                        label={`Product Company ${index + 1}`}
                                        sx={styles}
                                        select
                                        options={productsOptions}
                                        loading={productData.loading}
                                    />

                                    <CustomInput
                                        name={`productQuantities`}
                                        onChange={(e: any) => handleChange(e, index)}
                                        value={product.productQuantities}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        label={`Product Quantity ${index + 1}`}
                                        sx={styles}
                                        type='number'
                                    />
                                    <CustomInput
                                        name={`netPriceCurrency`}
                                        onChange={(e: any) => handleChange(e, index)}
                                        value={product.netPriceCurrency}
                                        fullWidth={false}
                                        className='md:w-[250px]'
                                        label={`Sale Currency ${index + 1}`}
                                        select
                                        options={currencyArray}
                                        sx={styles}
                                    />

                                    <CustomInput
                                        name={`netPrice`}
                                        onChange={(e: any) => handleChange(e, index)}
                                        value={product.netPrice}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        sx={styles}
                                        label={`Net Price ${index + 1}`}
                                        type='number'
                                    />

                                    <CustomInput
                                        name={`paidAmount`}
                                        onChange={(e: any) => handleChange(e, index)}
                                        value={product.paidAmount}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        label={`Paid Amount ${index + 1}`}
                                        sx={styles}
                                        type='number'
                                    />

                                    <CustomInput
                                        name={`remainingAmount`}
                                        onChange={(e: any) => handleChange(e, index)}
                                        value={product.remainingAmount}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        label={`Remaining Amount ${index + 1}`}
                                        sx={styles}
                                        type='number'
                                    />


                                    <CustomInput
                                        name={`status`}
                                        onChange={(e: any) => handleChange(e, index)}
                                        value={product.status}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        label={`Status ${index + 1}`}
                                        sx={styles}
                                        select
                                        options={SaleStatus}
                                    />

                                    <CustomInput
                                        name={`paymentMethod`}
                                        onChange={(e: any) => handleChange(e, index)}
                                        value={product.paymentMethod}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        label={`Payment Method ${index + 1}`}
                                        sx={styles}
                                        select
                                        options={PaymentMethod}
                                    />

                                    <CustomInput
                                        name={`paymentDate`}
                                        onChange={(e: any) => handleChange(e, index)}
                                        value={product.paymentDate}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        label={`Payment Date ${index + 1}`}
                                        sx={styles}
                                        type='date'
                                    />


                                    <CustomInput
                                        name={`deliveryDate`}
                                        onChange={(e: any) => handleChange(e, index)}
                                        value={product.deliveryDate}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        label={`Delivery Date ${index + 1}`}
                                        sx={styles}
                                        type='date'
                                    />

                                    <CustomInput
                                        name={`shippingStatus`}
                                        onChange={(e: any) => handleChange(e, index)}
                                        value={product.shippingStatus}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        label={`Shipping Status ${index + 1}`}
                                        sx={styles}
                                        select
                                        options={ShippingStatus}
                                        required={false}
                                    />
                                    <CustomInput
                                        name={`shippingAddress`}
                                        onChange={(e: any) => handleChange(e, index)}
                                        value={product.shippingAddress}
                                        fullWidth={true}
                                        className="md:w-[250px]"
                                        label={`Shipping Address ${index + 1}`}
                                        sx={styles}
                                        multiline
                                        rows={2}
                                        required={false}

                                    />
                                    <CustomInput
                                        name={`descriptions`}
                                        onChange={(e: any) => handleChange(e, index)}
                                        value={product.descriptions}
                                        fullWidth={true}
                                        className="md:w-[250px]"
                                        label={`Descriptions ${index + 1}`}
                                        sx={styles}
                                        multiline
                                        rows={3}
                                        required={false}

                                    />

                                    <CustomInput
                                        name={`specialInstructions`}
                                        onChange={(e: any) => handleChange(e, index)}
                                        value={product.specialInstructions}
                                        fullWidth={true}
                                        className="md:w-[250px]"
                                        label={`Special Instructions ${index + 1}`}
                                        sx={styles}
                                        multiline
                                        rows={4}
                                        required={false}
                                    />
                                </Box>
                                {products.length > 1 && index != products.length - 1 && (<Divider className='w-full' />)}
                            </Fragment>
                        ))}
                    </Box>
                    <Box className="flex">
                        <CustomButton
                            variant='text'
                            sx={{
                                backgroundColor: "transparent",
                                display: 'flex',
                                justifyContent: 'start',
                                width: 'auto'
                            }}
                            className='shadow-none flex active:bg-blue-400 focus:bg-transparent focus:text-blue-600'
                            startIcon={<Add />}
                            onClick={addProductField}
                        >
                            Additional Products
                        </CustomButton>
                    </Box>
                </Box>
                <Divider className='w-full' />
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

export default SalesForm
