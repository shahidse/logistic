
"use client"
import ButtonStack from '@/components/common/ButtonStack'
import CustomButton from '@/components/common/CustomeButton'
import CustomForm from '@/components/common/CustomForm'
import CustomInput from '@/components/common/CustomInput'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useFormHandler } from '@/hooks/formHandler'
import {  getRoles } from '@/lib/features/users/usersThunk'
import { useAppDispatch } from '@/lib/hooks'
import { addInventory, getInventoryById } from '@/lib/features/inventory/inventoryThunk'
import { resetState, setFormField } from '@/lib/features/inventory/inventorySlice'
function InventoryForm({ id }: { id: string }) {
    const { form, loading, handleSubmit, handleChange, handleReset } = useFormHandler({
        sliceKey: "inventory",
        submitAction: addInventory,
        redirectPath: "inventory",
        setFormState: setFormField,
        getDataById: getInventoryById,
        id,
        resetState: resetState
    });
    const { name,
        description,
        location,
        priority,
        isActive } = form;
    const dispatch = useAppDispatch()
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
        <Box className=''>
            <CustomForm
                onSubmit={handleSubmit}
                onReset={handleReset}
                className='flex flex-row flex-wrap justify-start gap-3 md:gap-5 p-[32px] bg-background'
            >
                <CustomInput
                    fullWidth={false}
                    onChange={handleChange}
                    className='md:w-[450px]'
                    value={name}
                    name='name'
                    label='Inventory Name'
                    sx={styles}
                />
                <CustomInput
                    fullWidth={false}
                    onChange={handleChange}
                    className='md:w-[450px]'
                    value={description}
                    name='description'
                    label='Description'
                    sx={styles}
                />
                <CustomInput
                    fullWidth={false}
                    onChange={handleChange}
                    className='md:w-[450px]'
                    value={location}
                    name='location'
                    label='Location (Depot/Warehouse)'
                    sx={styles}
                />
                <CustomInput
                    fullWidth={false}
                    onChange={handleChange}
                    className='md:w-[450px]'
                    value={priority}
                    name='priority'
                    label='Inventory Priority'
                    sx={styles}
                    select
                    options={[
                        { label: 'Primary', value: 'Primary' },
                        { label: 'Secondary', value: 'Secondary' },
                        { label: 'Tertiary', value: 'Tertiary' },
                        { label: 'EnRoute', value: 'EnRoute' },
                    ]}
                />
                <CustomInput
                    fullWidth={false}
                    onChange={handleChange}
                    className='md:w-[450px]'
                    value={isActive}
                    name='isActive'
                    label='Is Active'
                    sx={styles}
                    select
                    options={[
                        { label: 'Yes', value: true },
                        { label: 'No', value: false },
                    ]}
                />
                <ButtonStack className='flex justify-end w-full pt-4'>
                    <Box className='flex justify-between gap-4 w-[450px] mr-24'>
                        <CustomButton
                            className='flex'
                            variant='outlined'
                            sx={{ backgroundColor: 'transparent' }}
                            type='reset'
                        >
                            Cancel
                        </CustomButton>
                        <CustomButton
                            loading={loading}
                            className='flex'
                            sx={{ backgroundColor: 'var(--info)' }}
                            type='submit'
                        >
                            Submit
                        </CustomButton>
                    </Box>
                </ButtonStack>
            </CustomForm>
        </Box>
    )
}

export default InventoryForm
