import React from 'react'
import { Box, Menu, MenuItem, Avatar, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { Person, Settings, Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import Image from 'next/image';

function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // For user menu

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // User menu handlers
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    return (
        <header className="bg-foreground h-20 text-lightText p-4 shadow-md w-full flex justify-between items-center">
            <div className="flex-shrink-0 md:hidden">
                <button onClick={toggleSidebar} className="text-lightText">
                    {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>
            <Box className="flex items-center gap-2 justify-center flex-grow">
                <Image
                    src="/public/logistic-logo.png"
                    alt="Logo"
                    className="h-6 w-6"
                />
            </Box>

            {/* User Account Menu */}
            <div>
                <IconButton onClick={handleMenuOpen} className="text-lightText">
                    <Avatar alt="User" src="/path/to/user-avatar.jpg" />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem onClick={handleMenuClose}>
                        <Link href="/dashboard/profile" className="flex items-center">
                            <Person className="mr-2" /> Profile
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        <Link href="/dashboard/settings" className="flex items-center">
                            <Settings className="mr-2" /> Settings
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        <Typography>Logout</Typography>
                    </MenuItem>
                </Menu>
            </div>
        </header>
    )
}

export default Header
