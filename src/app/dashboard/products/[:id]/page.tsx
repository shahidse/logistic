"use client"
import ButtonStack from '@/components/common/ButtonStack'
import CustomButton from '@/components/common/CustomeButton'
import CustomForm from '@/components/common/CustomForm'
import CustomInput from '@/components/common/CustomInput'
import { currencyArray } from '@/constants'
import { Box } from '@mui/material'
import React from 'react'

function page() {
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        console.log(e.currentTarget.getAttributeNames())
    }
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
            '&:hover fieldset': { borderColor: 'var(--foreground)' }, // Border color on hover
            '&.Mui-focused fieldset': { borderColor: 'var(--foreground)' }, // Border color on focus
        },
        '& .MuiInputBase-input': {
            color: 'var(--lightText)', // Text color inside input
        },
    }
    return (
        <Box className='' >
            <CustomForm onSubmit={handleSubmit} className='flex flex-row flex-wrap justify-start gap-3 md:gap-5 p-[32px]'>
                <CustomInput fullWidth={false} className=' md:w-[450px]' label='Product Name' sx={styles} />
                <CustomInput fullWidth={false} className=' md:w-[450px]' label='Product Company' sx={styles} select />
                <CustomInput fullWidth={false} className=' md:w-[250px]' label='Sale Currency' sx={styles} select options={currencyArray} />
                <CustomInput fullWidth={false} className=' md:w-[250px]' label='Purchase Currency' sx={styles} select options={currencyArray} />
                <CustomInput fullWidth={false} className=' md:w-[200px]' label='Product Unit' sx={styles} type='number' />
                <CustomInput fullWidth={false} className=' md:w-[200px]' label='Unit Sale Price' sx={styles} />
                <CustomInput fullWidth={false} className=' md:w-[200px]' label='Product Quantities'  sx={styles} />
                <CustomInput fullWidth={false} className=' md:w-[200px]' label='Product Expiry' required={false} sx={styles} type='date' />
                <Box className='flex flex-row flex-wrap gap-3 md:gap-5'>
                    <CustomInput fullWidth={false} className=' md:w-[450px]' label='Product Pros' required={false} sx={styles} multiline />
                    <CustomInput fullWidth={false} className=' md:w-[450px]' label='Product Cons' required={false} sx={styles} multiline />
                    <CustomInput fullWidth={false} className=' md:w-[450px]' label='Product Usage' required={false} sx={styles} multiline />
                    <CustomInput fullWidth={false} className=' md:w-[450px]' label='Product Description' required={false} sx={styles} multiline />
                </Box>
                <ButtonStack className='flex justify-end w-full pt-4'>
                    <Box className=" flex justify-between gap-4 w-[450px] ">
                        <CustomButton className='flex ' variant='outlined' sx={{ backgroundColor: "transparent" }} type='reset'>
                            Cancel
                        </CustomButton>
                        <CustomButton className='flex  ' sx={{ backgroundColor: "var(--info) " }} type='submit'>
                            Submit
                        </CustomButton>
                    </Box>
                </ButtonStack>
            </CustomForm>
        </Box>
    )
}

export default page
