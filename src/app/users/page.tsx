'use client';

import { Avatar, Box, Typography, Divider, Button } from '@mui/material';
import { Email, Phone, LocationOn, Cake, Edit } from '@mui/icons-material';

export default function UserProfilePage() {
    // Dummy data — replace with actual fetched user data
    const user = {
        fullName: "Shahid Hussain",
        email: "shahid@example.com",
        phone: "+92 300 1234567",
        location: "Peshawar, Pakistan",
        dob: "1997-08-15",
        avatar: "/images/profile.jpg",
    };

    return (
        <Box className="flex flex-col gap-6 max-w-3xl mx-auto mt-6">
            <Box className="flex flex-col md:flex-row items-center gap-6 p-6 bg-background shadow-lg rounded-2xl border border-border">
                <Avatar src={user.avatar} sx={{ width: 120, height: 120 }} />

                <Box className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
                    <Typography variant="h5" className="font-semibold">{user.fullName}</Typography>
                    <Box className="flex items-center gap-2">
                        <Email fontSize="small" color="primary" />
                        <Typography>{user.email}</Typography>
                    </Box>
                    <Box className="flex items-center gap-2">
                        <Phone fontSize="small" color="primary" />
                        <Typography>{user.phone}</Typography>
                    </Box>
                    <Box className="flex items-center gap-2">
                        <LocationOn fontSize="small" color="primary" />
                        <Typography>{user.location}</Typography>
                    </Box>
                    <Box className="flex items-center gap-2">
                        <Cake fontSize="small" color="primary" />
                        <Typography>{user.dob}</Typography>
                    </Box>
                </Box>
            </Box>

            <Divider />

            <Box className="flex justify-end">
                <Button
                    startIcon={<Edit />}
                    variant="outlined"
                    className="bg-transparent"
                >
                    Edit Profile
                </Button>
            </Box>
        </Box>
    );
}
