'use client'
import { Box, Divider, IconButton, SelectChangeEvent } from '@mui/material'
import React, { useEffect, useState } from 'react'
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

    const { name, companyId, saleCurrency, purchaseCurrency } = form;
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

    const [productFields, setProductFields] = useState([{}]); // Manage product fields dynamically

    // Styles for the fields
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

    // Add a new product field
    const addProductField = () => {
        setProductFields(prevFields => [...prevFields, {}]); // Add an empty object to represent a new field
    };

    // Remove a product field at a specific index
    const removeProductField = (index: number) => {
        // Prevent removing all fields
        if (productFields.length > 1) {
            setProductFields(prevFields => prevFields.filter((_, i) => i !== index)); // Remove field at the given index
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
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];
    return (
        <Box>
            <CustomForm onSubmit={handleSubmit} className='flex flex-row flex-wrap justify-start gap-3 md:gap-5 p-[32px] bg-background'>
                <Box className='flex w-full flex-col gap-4'>
                    <p className='text-2xl font-semibold'>Client</p>
                    <CustomInput name='client' onChange={handleChange} value={name} fullWidth={false} className=' md:w-[450px]' label='Product Name' sx={styles} />
                    <MultipleSelectChip label="Select Users"
                        options={options}
                        value={selectedValues}
                        onChange={handleSelectChange} />
                    <Divider />
                </Box>
                <Box className="flex w-full flex-col gap-4 overflow-auto h-auto md:h-[40vh]">
                    <p className='text-2xl font-semibold'>Products</p>
                    <Box className="flex gap-4 flex-wrap">
                        {productFields.map((_, index) => (
                            <>
                                <Box key={index} className="flex gap-4 flex-wrap w-full">
                                    {/* Delete Button to remove the field set */}
                                    {productFields.length > 1 && (
                                        <CustomIconButton handle={() => removeProductField(index)} color="error" >
                                            <Delete />
                                        </CustomIconButton>
                                    )
                                    }

                                    {/* Product field set */}
                                    <CustomInput
                                        name={`companyId_${index}`}
                                        onChange={handleChange}
                                        value={companyId}
                                        fullWidth={false}
                                        className=' md:w-[450px]'
                                        label={`Product Company ${index + 1}`}
                                        sx={styles}
                                        select
                                        options={formattedData}
                                    />
                                    <CustomInput
                                        name={`saleCurrency_${index}`}
                                        onChange={handleChange}
                                        value={saleCurrency}
                                        fullWidth={false}
                                        className=' md:w-[250px]'
                                        label={`Sale Currency ${index + 1}`}
                                        sx={styles}
                                        select
                                        options={currencyArray}
                                    />
                                    <CustomInput
                                        name={`purchaseCurrency_${index}`}
                                        onChange={handleChange}
                                        value={purchaseCurrency}
                                        fullWidth={false}
                                        className=' md:w-[250px]'
                                        label={`Purchase Currency ${index + 1}`}
                                        sx={styles}
                                        select
                                        options={currencyArray}
                                    />
                                </Box>
                                {productFields.length > 1 && index != productFields.length - 1 && (<Divider className='w-full' />)}
                            </>
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
