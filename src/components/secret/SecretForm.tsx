"use client";
import React from 'react'
import { useState } from 'react';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CustomInput from '@/components/common/CustomInput';
import CustomForm from '@/components/common/CustomForm';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getSecretToken } from '@/lib/features/users/usersThunk';
import { setState } from '@/lib/features/users/usersSlice';
import { useSnackbar } from '../common/SnakeBarProvider';
import { useRouter } from 'next/navigation';
function SecretForm() {
    const [showPassword, setShowPassword] = useState(true);
    const router = useRouter()
    const dispatch = useAppDispatch()
    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };
    const { loading, error, secret } = useAppSelector((state) => state.users)
    const { showSnackbar } = useSnackbar()
    const handleOnChange = (e: any) => {
        dispatch(setState({ key: "secret", value: e.target.value }))
    }
    const handleSubmit = (e: any) => {
        e.preventDefault()
        dispatch(setState({ key: 'error', value: "" }))
        dispatch(getSecretToken({ secret })).then((res) => {
            if (res.type == 'user/secret/fulfilled') {
                showSnackbar('Request Success', 'success')
                router.push('/signin')
            }
            if (res.type == 'user/secret/rejected') {
                showSnackbar(error, 'error')
            }
        }).catch((err) => {
            showSnackbar(err.message, 'error')

        })
    }
    return (
        <Box className='flex bg-gradient-to-r from-foreground to-secondary w-full h-screen justify-center items-center '>
            <Box className="flex w-full items-center flex-col gap-3 p-6 max-w-md">
                <AccountCircleIcon sx={{ width: 100, height: 100, color: "var(--action)", }} />
                <p className='text-lightText font-semibold '>Admin</p>
                <CustomForm onSubmit={handleSubmit}>
                    <CustomInput
                        label="Secret"
                        type={showPassword ? "text" : "password"}
                        className='bg-secondary rounded-md'
                        value={secret}
                        loading={loading}
                        onChange={handleOnChange}
                        sx={{
                            '& label': { color: 'var(--foreground)' }, // Default label color
                            '& .MuiInputLabel-asterisk': {
                                color: 'red',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                fontStyle: 'italic'
                            },
                            '& label.Mui-focused': { color: 'var(--background)' }, // Label color on focus
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'gray' }, // Default border color
                                '&:hover fieldset': { borderColor: 'var(--secondary)' }, // Border color on hover
                                '&.Mui-focused fieldset': { borderColor: 'var(--surface)' }, // Border color on focus
                            },
                            '& .MuiInputBase-input': {
                                color: 'var(--lightText)',  // Text color inside input
                            },
                        }}
                        icon={
                            <IconButton onClick={handleTogglePassword} edge="end" sx={{
                                color: 'gray'
                            }}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        }
                    />

                </CustomForm>
            </Box>
        </Box>
    )
}

export default SecretForm
