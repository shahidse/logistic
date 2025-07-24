'use client';

import {
    Avatar,
    Box,
    Typography,
    Divider,
    Button,
    Tooltip,
    Skeleton,
    Chip,
} from '@mui/material';
import {
    Email,
    Phone,
    LocationOn,
    Cake,
    Edit,
    Person,
    AccountCircle,
    CalendarToday,
    Security,
    Business,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import { getUserInfo } from '@/lib/features/users/usersThunk';

function formatDate(dateString?: string): string {
    if (!dateString) return 'Not Provided';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';

    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

export default function UserProfilePage() {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.users.data);
    const loading = useAppSelector((state) => state.users.loading);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);

    const user = {
        fullName: data?.fullName || 'Unknown User',
        userName: data?.userName || 'N/A',
        email: data?.email || 'N/A',
        phone: data?.phone || 'N/A',
        location:
            [data?.city, data?.country].filter(Boolean).join(', ') || 'Not Provided',
        dob: formatDate(data?.dob),
        createdAt: formatDate(data?.createdAt),
        role: data?.roles?.role || 'Unknown',
        brand: data?.roles?.brands?.name || 'Not Assigned',
        avatar: data?.profilePic || '',
        acl: data?.roles?.acl || [],
    };

    return (
        <Box className="flex flex-col gap-6 max-w-3xl mx-auto mt-6">
            <Box className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
                {loading ? (
                    <Skeleton variant="circular" width={120} height={120} />
                ) : (
                    <Avatar
                        src={user.avatar}
                        sx={{ width: 120, height: 120 }}
                        alt={user.fullName}
                    >
                        <Person fontSize="large" />
                    </Avatar>
                )}

                <Box className="flex flex-col items-center md:items-start text-center md:text-left gap-2 w-full">
                    <Typography variant="h5" className="font-semibold">
                        {loading ? <Skeleton width={160} /> : user.fullName}
                    </Typography>

                    <InfoItem icon={<AccountCircle />} label={`Username: ${user.userName}`} loading={loading} />
                    <InfoItem icon={<Email />} label={user.email} loading={loading} />
                    <InfoItem icon={<Phone />} label={user.phone} loading={loading} />
                    <InfoItem icon={<LocationOn />} label={user.location} loading={loading} />
                    <InfoItem icon={<Cake />} label={`DOB: ${user.dob}`} loading={loading} />
                    <InfoItem icon={<CalendarToday />} label={`Joined: ${user.createdAt}`} loading={loading} />
                    <InfoItem icon={<Security />} label={`Role: ${user.role}`} loading={loading} />
                    <InfoItem icon={<Business />} label={`Brand: ${user.brand}`} loading={loading} />
                </Box>
            </Box>

            <Divider />

            <Box className="p-6 bg-white shadow-md rounded-2xl border border-gray-200">
                <Typography variant="h6" gutterBottom>
                    Access Control
                </Typography>

                {loading ? (
                    <Skeleton height={100} />
                ) : user.acl.length === 0 ? (
                    <Typography variant="body2" color="textSecondary">
                        No access control data available.
                    </Typography>
                ) : (
                    <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {user.acl.map((perm: any) => (
                            <Box key={perm.id} className="border p-4 rounded-xl shadow-sm">
                                <Typography variant="subtitle1" className="font-medium mb-2">
                                    {perm.resource.name}
                                </Typography>
                                <Box className="flex flex-wrap gap-2">
                                    {perm.read && <Chip label="Read" color="success" />}
                                    {perm.write && <Chip label="Write" color="primary" />}
                                    {perm.update && <Chip label="Update" color="warning" />}
                                    {perm.delete && <Chip label="Delete" color="error" />}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>

            <Box className="flex justify-end">
                <Button startIcon={<Edit />} variant="outlined">
                    Edit Profile
                </Button>
            </Box>
        </Box>
    );
}

function InfoItem({
    icon,
    label,
    loading,
}: {
    icon: React.ReactNode;
    label: string;
    loading: boolean;
}) {
    return (
        <Box className="flex items-center gap-2 text-gray-700">
            <Tooltip title={label}>
                <span className="text-blue-600">{icon}</span>
            </Tooltip>
            <Typography variant="body2">
                {loading ? <Skeleton width={120} /> : label}
            </Typography>
        </Box>
    );
}
