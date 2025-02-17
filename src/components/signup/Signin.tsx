"use client"
import React from 'react';
import Form from '@/components/common/CustomForm';
import { Email, Lock } from '@mui/icons-material';
import CustomInput from '@/components/common/CustomInput';
import { Box, Link } from '@mui/material';
import CustomButton from '../common/CustomeButton';
import { useSnackbar } from '../common/SnakeBarProvider';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { setSignInFormState, setState } from '@/lib/features/users/usersSlice';
import { signin } from '@/lib/features/users/usersThunk';
const Signin = () => {
    const { showSnackbar } = useSnackbar()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { signInForm: { email, password }, error, loading } = useAppSelector((state) => state.users)
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        dispatch(setSignInFormState({ key: name, value }))
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(setState({ key: 'error', value: "" }))
        dispatch(signin({ email, password })).then((res) => {
            if (res.type == 'user/signin/fulfilled') {
                showSnackbar(`${email} Login Successfully `, 'success')
                router.push('/dashboard')
            }
            if (res.type == 'user/signin/rejected') {
                showSnackbar(error, 'error')
            }
        }).catch((err) => {
            showSnackbar(err.message, 'error')
        })
    };

    return (
        <Box className="bg-gradient-to-r from-foreground to-secondary min-h-screen flex justify-center items-center p-4">
            <Box className="w-full max-w-md  p-6 rounded-md">
                <p className="text-3xl font-bold h-14  flex justify-center items-center mb-6 text-forground rounded-md shadow-lg bg-action">Sign In</p>
                <Form onSubmit={handleSubmit} className='flex flex-col  gap-4' >
                    <CustomInput
                        label="Email"
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        icon={<Email />}
                    />
                    <CustomInput
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        icon={<Lock />}
                    />
                    <CustomButton type='submit' loading={loading}>
                        Sign In
                    </CustomButton>
                </Form>
                <Box className="text-center mt-4">
                    <p>
                        Don't have an account?{' '}

                        <Link href="/signup" className=" hover:underline" sx={{
                            color: 'var(--action)'
                        }}>Sign Up</Link>
                    </p>
                </Box>
            </Box>
        </Box>
    );
};

export default Signin;
