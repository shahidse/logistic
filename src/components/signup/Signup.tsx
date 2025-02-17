"use client"
import React from 'react';
import Form from '@/components/common/CustomForm';
import { Email, Lock, LockOpen, Person } from '@mui/icons-material';
import CustomInput from '@/components/common/CustomInput';
import { Box, Link } from '@mui/material';
import CustomButton from '../common/CustomeButton';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setSignUpFormState, setState } from '@/lib/features/users/usersSlice';
import { signup } from '@/lib/features/users/usersThunk';
import { useSnackbar } from '../common/SnakeBarProvider';
import { useRouter } from 'next/navigation';

const Signup = () => {
    const { showSnackbar } = useSnackbar()
    const dispatch = useAppDispatch()
    const router = useRouter()

    const { signUpForm: { fullName, email, password, confirmPassword, userName }, error, loading } = useAppSelector((state) => state.users)
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setSignUpFormState({ key: name, value }))
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(setState({ key: 'error', value: "" }))
        dispatch(signup({ fullName, email, password, confirmPassword, userName })).then((res) => {
            if (res.type == 'user/signup/fulfilled') {
                showSnackbar(`${fullName} Registered Successfully `, 'success')
                router.push('/signin')
            }
            if (res.type == 'user/signup/rejected') {
                showSnackbar(error, 'error')
            }
        }).catch((err) => {
            showSnackbar(err.message, 'error')
        })
    };

    return (
        <Box className="bg-gradient-to-r from-foreground to-secondary min-h-screen flex justify-center items-center px-4">
            <Box className="w-full max-w-md  p-6 rounded-md">
                <p className="text-3xl font-bold h-14  flex justify-center items-center mb-6 text-forground rounded-md shadow-lg bg-action">Sign Up</p>
                <Form onSubmit={handleSubmit} className='flex flex-col  gap-4'>
                    <CustomInput
                        label="Full Name"
                        type="text"
                        name="fullName"
                        value={fullName}
                        onChange={handleChange}
                        icon={<Person />}
                    />
                    <CustomInput
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        icon={<Email />}
                    />
                    <CustomInput
                        label="UserName"
                        type="text"
                        name="userName"
                        value={userName}
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
                    <CustomInput
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        icon={<LockOpen />}
                    />
                    <CustomButton type='submit' loading={loading}>
                        Sign Up
                    </CustomButton>
                </Form>
                <Box className="text-center mt-4">
                    <p>
                        Already have an account?{' '}
                        <Link href="/signin" className=" hover:underline" sx={{
                            color: 'var(--action)'
                        }} >Sign In</Link>
                    </p>
                </Box>
            </Box>
        </Box>
    );
};

export default Signup;
