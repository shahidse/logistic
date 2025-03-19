"use client"
import ButtonStack from '@/components/common/ButtonStack'
import CustomButton from '@/components/common/CustomeButton'
import CustomForm from '@/components/common/CustomForm'
import CustomInput from '@/components/common/CustomInput'
import { countriesArray } from '@/constants'
import { setClientFormState, resetClientForm } from '@/lib/features/users/usersSlice';
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useFormHandler } from '@/hooks/formHandler'
import { createClient, getClientById, getRoles } from '@/lib/features/users/usersThunk'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
function ClientsForm({ id }: { id: string }) {
    const { form, loading, handleSubmit, handleChange, handleReset } = useFormHandler({
        sliceKey: "users",
        submitAction: createClient,
        redirectPath: "clients",
        setFormState: setClientFormState,
        getDataById: getClientById,
        id,
        resetState: resetClientForm
    });
    const { fullName, address, phone, dob, country, city, email, userName, rolesId , password, confirmPassword} = form;
    const dispatch = useAppDispatch()
    const { roles } = useAppSelector((state) => state.users)
    const formattedData: [] = React.useMemo(() => {
        if (!roles || !roles.length) return [{ value: 0, label: "Other" }]; // Fallback to "Other" if no roles
        return roles?.filter((role) => role.role == 'Client').map(({ ...rest }) => ({
            label: rest?.role,
            value: rest?.id,
        }));
    }, [roles]);
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
            '&:hover fieldset': { borderColor: 'var(--info)' }, // Border color on hover
            '&.Mui-focused fieldset': { borderColor: 'var(--secondary)' }, // Border color on focus
            backdropFilter: 'blur(10px)',
        },
        '& .MuiInputBase-input': {
            color: 'var(--info)', // Text color inside input
        },
    }
    useEffect(() => {
        dispatch(getRoles())
    }, [dispatch])
    return (
        <Box className='' >
            <CustomForm onSubmit={handleSubmit} onReset={handleReset} className='flex flex-row flex-wrap justify-start gap-3 md:gap-5 p-[32px] bg-background '>
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={rolesId} name='rolesId' label='Role' sx={styles} select options={formattedData} />
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={fullName} name='fullName' label='Client Name' sx={styles} />
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={email} name='email' label='Client Email' sx={styles} />
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={userName} name='userName' label='Client UserName' sx={styles} />
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={password} name='password' label='Client Password' sx={styles} /> 
                <CustomInput fullWidth={false} onChange={handleChange} className=' md:w-[450px]' value={confirmPassword} name='confirmPassword' label='Client Confirm Password' sx={styles} />
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
