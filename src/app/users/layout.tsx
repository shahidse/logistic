'use client';

import { Box, Tabs, Tab, Button } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        router.push(newValue);
    };

    const handleBack = () => {
        router.back(); // goes to previous page
        // OR use router.push('/dashboard') to go to a specific route
    };

    const tabValue = [
        '/users',
        '/users/edit',
        '/users/security'
    ].includes(pathname)
        ? pathname
        : '/users';

    return (
        <Box className="p-4 space-y-4">
            {/* Back Button */}
            <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
                className="mb-2"
            >
                Back
            </Button>

            {/* Tabs Navigation */}
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                indicatorColor="primary"
                textColor="primary"
                className="bg-foreground rounded-xl shadow-md"
            >
                <Tab label="Profile" value="/users" />
                {/* <Tab label="Edit Profile" value="/users/edit" />
                <Tab label="Security" value="/users/security" /> */}
            </Tabs>

            {/* Render the actual page */}
            <Box className="p-4 bg-background rounded-xl shadow-sm">
                {children}
            </Box>
        </Box>
    );
}
