"use client"
import React, { useState } from 'react';
import Form from '@/components/common/CustomForm';
import { Email, Lock, LockOpen } from '@mui/icons-material';
import CustomInput from '@/components/common/CustomInput';
import { Box, Link } from '@mui/material';
import CustomButton from '../common/CustomeButton';
import NextLink from 'next/link';
const Signin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Handle form submission logic
        console.log('Form submitted:', formData);
    };

    return (
        <Box className="bg-gradient-to-r from-foreground to-secondary min-h-screen flex justify-center items-center p-4">
            <Box className="w-full max-w-md  p-6 rounded-md">
                <p className="text-3xl font-bold h-14  flex justify-center items-center mb-6 text-forground rounded-md shadow-lg bg-action">Sign In</p>
                <Form onSubmit={handleSubmit}>
                    <CustomInput
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        icon={<Email />}
                    />
                    <CustomInput
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        icon={<Lock />}
                    />
                    <CustomButton>
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
