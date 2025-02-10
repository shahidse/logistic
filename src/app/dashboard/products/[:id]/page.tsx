"use client"
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
        <Box >
            <CustomForm onSubmit={handleSubmit} className='flex flex-row flex-wrap gap-4  '>
                <CustomInput fullWidth={false} className=' md:w-96' label='Product Name' sx={styles} />
                <CustomInput fullWidth={false} className=' md:w-96' label='Product Name' sx={styles}/>
                <CustomInput fullWidth={false} className=' md:w-96' label='Product Name' sx={styles}/>
                <CustomInput fullWidth={false} className=' md:w-96' label='Product Name' sx={styles}/>
                <CustomInput fullWidth={false} className=' md:w-96' label='Product Name' sx={styles}/>
                <CustomInput fullWidth={false} className=' md:w-96' label='Product Name' sx={styles}/>
                <CustomInput fullWidth={false} className=' md:w-96' label='Product Name' sx={styles}/>
                <CustomInput fullWidth={false} className=' md:w-96' label='Product Name' sx={styles}/>
            </CustomForm>
        </Box>
    )
}

export default page
