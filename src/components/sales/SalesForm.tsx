'use client'
import { Box, Divider, IconButton, SelectChangeEvent } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
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
import { Add, Delete } from '@mui/icons-material'
import CustomIconButton from '../common/CustomIconButton'
import MultipleSelectChip from '../common/MultipleSelectChip'

function SalesForm({ id }: { id: string }) {
    const { form, loading, handleSubmit, handleChange } = useFormHandler({
        sliceKey: "products",
        submitAction: addProducts,
        redirectPath: "products",
        setFormState,
        getDataById: getProductsById,
        id,
        resetState: resetState
    });

    const { companyId, saleCurrency, purchaseCurrency } = form;
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

    const [productFields, setProductFields] = useState([{}]); 

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
    const addProductField = () => {
        setProductFields(prevFields => [...prevFields, {}]);
    };
    const removeProductField = (index: number) => {
        if (productFields.length > 1) {
            setProductFields(prevFields => prevFields.filter((_, i) => i !== index));
        }
    };

    useEffect(() => {
        dispatch(getCompany())
    }, [dispatch])
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handleSelectChange = (event: SelectChangeEvent<typeof selectedValues>) => {
        const { value } = event.target;
        setSelectedValues(typeof value === 'string' ? value.split(',') : value);
    };

    const options = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
    ];
    return (
        <Box className='h-[65vh]'>
            <CustomForm onSubmit={handleSubmit} className='max-h-full overflow-y-auto flex flex-row flex-wrap justify-start gap-3 md:gap-5 p-[32px] bg-background'>
                <Box className='flex w-full flex-col gap-5'>
                    <p className='text-2xl font-semibold'>Client</p>
                    <MultipleSelectChip label="Select Clients"
                        options={options}
                        value={selectedValues}
                        onChange={handleSelectChange} />
                    <Divider />
                </Box>
                <Box className="flex w-full flex-col gap-4">
                    <p className='text-2xl font-semibold'>Products</p>
                    <Box className="flex gap-4 flex-wrap">
                        {productFields.map((_, index) => (
                            <Fragment key={index}>
                                <Box className="flex gap-4 flex-wrap w-full">
                                    {/* Delete Button to remove the field set */}
                                    {productFields.length > 1 && (
                                        <CustomIconButton handle={() => removeProductField(index)} color="error" >
                                            <Delete />
                                        </CustomIconButton>
                                    )
                                    }
                                    <CustomInput
                                        name={`productId_${index}`}
                                        onChange={handleChange}
                                        // value={product.companyId || ""}
                                        fullWidth={false}
                                        className='md:w-[450px]'
                                        label={`Product Company ${index + 1}`}
                                        sx={styles}
                                    />

                                    <CustomInput
                                        name={`productQuantities_${index}`}
                                        onChange={handleChange}
                                        // value={product.productQuantities || 0}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        label={`Product Quantity ${index + 1}`}
                                        sx={styles}

                                    />
                                    {/* <CustomInput
                                        name={`saleCurrency_${index}`}
                                        onChange={handleChange}
                                        // value={product.saleCurrency || ""}
                                        fullWidth={false}
                                        className='md:w-[250px]'
                                        label={`Sale Currency ${index + 1}`}
                                        select
                                        options={currencyArray}
                                    />

                                    <CustomInput
                                        name={`purchaseCurrency_${index}`}
                                        onChange={handleChange}
                                        // value={product.purchaseCurrency || ""}
                                        fullWidth={false}
                                        className='md:w-[250px]'
                                        label={`Purchase Currency ${index + 1}`}
                                        select
                                        options={currencyArray}
                                    /> */}


                                    <CustomInput
                                        name={`netPrice_${index}`}
                                        onChange={handleChange}
                                        // value={product.netPrice || 0}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        sx={styles}

                                        label={`Net Price ${index + 1}`}
                                    />

                                    <CustomInput
                                        name={`netPriceCurrency_${index}`}
                                        onChange={handleChange}
                                        // value={product.netPriceCurrency || ""}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        label={`Net Price Currency ${index + 1}`}
                                        sx={styles}

                                    />

                                    <CustomInput
                                        name={`paidAmount_${index}`}
                                        onChange={handleChange}
                                        // value={product.paidAmount || 0}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        label={`Paid Amount ${index + 1}`}
                                        sx={styles}

                                    />

                                    <CustomInput
                                        name={`remainingAmount_${index}`}
                                        onChange={handleChange}
                                        // value={product.remainingAmount || 0}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        label={`Remaining Amount ${index + 1}`}
                                        sx={styles}

                                    />

                                    <CustomInput
                                        name={`descriptions_${index}`}
                                        onChange={handleChange}
                                        // value={product.descriptions || ""}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        label={`Descriptions ${index + 1}`}
                                        sx={styles}

                                    />

                                    <CustomInput
                                        name={`status_${index}`}
                                        onChange={handleChange}
                                        // value={product.status || ""}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        label={`Status ${index + 1}`}
                                        sx={styles}

                                    />

                                    <CustomInput
                                        name={`paymentMethod_${index}`}
                                        onChange={handleChange}
                                        // value={product.paymentMethod || ""}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        label={`Payment Method ${index + 1}`}
                                        sx={styles}

                                    />

                                    <CustomInput
                                        name={`paymentDate_${index}`}
                                        onChange={handleChange}
                                        // value={product.paymentDate || ""}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        label={`Payment Date ${index + 1}`}
                                        sx={styles}

                                    />

                                    <CustomInput
                                        name={`shippingAddress_${index}`}
                                        onChange={handleChange}
                                        // value={product.shippingAddress || ""}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        label={`Shipping Address ${index + 1}`}
                                        sx={styles}

                                    />

                                    <CustomInput
                                        name={`deliveryDate_${index}`}
                                        onChange={handleChange}
                                        // value={product.deliveryDate || ""}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        label={`Delivery Date ${index + 1}`}
                                        sx={styles}

                                    />

                                    <CustomInput
                                        name={`shippingStatus_${index}`}
                                        onChange={handleChange}
                                        // value={product.shippingStatus || ""}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        label={`Shipping Status ${index + 1}`}
                                        sx={styles}

                                    />

                                    <CustomInput
                                        name={`specialInstructions_${index}`}
                                        onChange={handleChange}
                                        // value={product.specialInstructions || ""}
                                        fullWidth={false}
                                        className="md:w-[250px]"
                                        label={`Special Instructions ${index + 1}`}
                                        sx={styles}

                                    />
                                </Box>
                                {productFields.length > 1 && index != productFields.length - 1 && (<Divider className='w-full' />)}
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
                            onClick={addProductField} // Add a product field when clicked
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
