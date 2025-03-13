"use client"
import ButtonStack from '@/components/common/ButtonStack'
import CustomButton from '@/components/common/CustomeButton'
import CustomForm from '@/components/common/CustomForm'
import CustomInput from '@/components/common/CustomInput'
import { countriesArray } from '@/constants'
import { setClientFormState, resetClientForm } from '@/lib/features/users/usersSlice';
import { addCompany } from '@/lib/features/company/comapanyThunk'
import { Box } from '@mui/material'
import React from 'react'
import { useFormHandler } from '@/hooks/formHandler'
import { getCompanyById } from '../../lib/features/company/comapanyThunk';
function ClientsForm({ id }: { id: string }) {
    const { form, loading, handleSubmit, handleChange, handleReset } = useFormHandler({
        sliceKey: "users",
        submitAction: addCompany,
        redirectPath: "clients",
        setFormState:setClientFormState,
        getDataById: getCompanyById,
        id,
        resetState:resetClientForm
    });
    const { fullName, address, phone, dob, country, city, email, userName, profilePic } = form;
    const styles = {
        '& label': { color: 'var(--foreground)' }, // Default label color
        '& .MuiInputLabel-asterisk': {
            color: 'red',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            fontStyle: 'italic'
        },
        '& label.Mui-focused': { color: 'var(--foreground)' }, // Label color on focus
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'var(--inputBorder)' },
            '&:hover fieldset': { borderColor: 'var(--inputBorder)' }, // Border color on hover
            '&.Mui-focused fieldset': { borderColor: 'var(--secondary)' }, // Border color on focus
        },
        '& .MuiInputBase-input': {
            color: 'var(--info)', // Text color inside input
        },
    }
    return (
        <Box className='' >
            <CustomForm onSubmit={handleSubmit} onReset={handleReset} className='flex flex-row flex-wrap justify-start gap-3 md:gap-5 p-[32px] bg-background '>
                {/* <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={role} name='fullName' label='Role' sx={styles} /> */}
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px] border-inputBorder' value={fullName} name='fullName' label='Client Name' sx={styles} />
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={email} name='fullName' label='Client Email' sx={styles} />
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={userName} name='fullName' label='Client UserName' sx={styles} />

                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={phone} name='phone' required={false} label='Client Phone' sx={styles} />
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={address} name='address' required={false} label='Client Street Address' sx={styles} />
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={country} name='country' required={false} label='Countary of Origin' sx={styles} select={true} options={countriesArray} />
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={city} name='city' required={false} label='City' sx={styles} />
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' disabled name='profilePic' required={false} label='Profile Picture' sx={styles} type='file' />
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={dob} name='dob' required={false} label='Date of Birth' type='date' sx={styles} />
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

export default ClientsForm
