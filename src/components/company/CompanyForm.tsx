"use client"
import ButtonStack from '@/components/common/ButtonStack'
import CustomButton from '@/components/common/CustomeButton'
import CustomForm from '@/components/common/CustomForm'
import CustomInput from '@/components/common/CustomInput'
import { countriesArray } from '@/constants'
import { setFormState, resetState } from '@/lib/features/company/comapanySlice';
import { addCompany } from '@/lib/features/company/comapanyThunk'
import { Box } from '@mui/material'
import React from 'react'
import { useFormHandler } from '@/hooks/formHandler'
import { getCompanyById } from '../../lib/features/company/comapanyThunk';
function CompanyForm({ id }: { id: string }) {
    const { form, loading, handleSubmit, handleChange, handleReset } = useFormHandler({
        sliceKey: "company",
        submitAction: addCompany,
        redirectPath: "company",
        setFormState,
        getDataById: getCompanyById,
        id,
        resetState
    });
    const { name, address, phone, foundingDate, country, city, website } = form;
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
        },
        '& .MuiInputBase-input': {
            color: 'var(--info)', // Text color inside input
        },
    }
    return (
        <Box className='' >
            <CustomForm onSubmit={handleSubmit} onReset={handleReset} className='flex flex-row flex-wrap justify-start gap-3 md:gap-5 p-[32px] bg-background'>
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={name} name='name' label='Company Name' sx={styles} />
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={address} name='address' required={false} label='Comapnay Address' sx={styles} />
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={phone} name='phone' required={false} label='Comapny Phone' sx={styles} />
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={foundingDate} name='foundingDate' required={false} label='Founding Date' type='date' sx={styles} />
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={country} name='country' required={false} label='Countary of Origin' sx={styles} select={true} options={countriesArray} />
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={city} name='city' required={false} label='City' sx={styles} />
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' disabled name='logo' required={false} label='Logo' sx={styles} type='file' />
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={website} name='website' required={false} label='Website Url' type='url' sx={styles} />
                <ButtonStack className='flex justify-end w-full pt-4'>
                    <Box className=" flex justify-between gap-4 w-[450px] mr-24">
                        <CustomButton className='flex ' variant='outlined' sx={{ backgroundColor: "transparent" }} type='reset'>
                            Cancel
                        </CustomButton>
                        <CustomButton loading={loading} className='flex  ' sx={{ backgroundColor: "var(--info) " }} type='submit'>
                            Submit
                        </CustomButton>
                    </Box>
                </ButtonStack>
            </CustomForm>
        </Box>
    )
}

export default CompanyForm
