"use client"
import ButtonStack from '@/components/common/ButtonStack'
import CustomButton from '@/components/common/CustomeButton'
import CustomForm from '@/components/common/CustomForm'
import CustomInput from '@/components/common/CustomInput'
import { Box } from '@mui/material'
import React from 'react'

function page() {
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        console.log(e)
    }
    const styles = {
        '& label': { color: 'var(--foreground)' }, // Default label color
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
            <CustomForm onSubmit={handleSubmit} className='flex flex-row flex-wrap justify-between gap-3 md:gap-5 p-[32px]'>
                <CustomInput fullWidth={false} className=' md:w-[450px]' label='Product Name' sx={styles} />
                <CustomInput fullWidth={false} className=' md:w-[450px]' label='Product Name' sx={styles} />
                <CustomInput fullWidth={false} className=' md:w-[450px]' label='Product Name' sx={styles} />
                <CustomInput fullWidth={false} className=' md:w-[450px]' label='Product Name' sx={styles} />
                <CustomInput fullWidth={false} className=' md:w-[450px]' label='Product Name' sx={styles} />
                <CustomInput fullWidth={false} className=' md:w-[450px]' label='Product Name' sx={styles} />
                <CustomInput fullWidth={false} className=' md:w-[450px]' label='Product Name' sx={styles} />
                <CustomInput fullWidth={false} className=' md:w-[450px]' label='Product Name' sx={styles} />
                <CustomInput fullWidth={false} className=' md:w-[450px]' label='Product Name' sx={styles} />
                <CustomInput fullWidth={false} className=' md:w-[450px]' label='Product Name' sx={styles} />
                <CustomInput fullWidth={false} className=' md:w-[450px]' label='Product Name' sx={styles} />
                <CustomInput fullWidth={false} className=' md:w-[450px]' label='Product Name' sx={styles} />
                <ButtonStack className='flex justify-end w-full pt-4'>
                    <Box className=" flex justify-between gap-4 w-[450px] mr-24">
                        <CustomButton className='flex ' variant='outlined'  sx={{backgroundColor:"transparent"}}>
                            Cancel
                        </CustomButton>
                        <CustomButton className='flex  ' sx={{backgroundColor:"var(--info) "}}>
                            Submit
                        </CustomButton>
                    </Box>
                </ButtonStack>
            </CustomForm>
        </Box>
    )
}

export default page
