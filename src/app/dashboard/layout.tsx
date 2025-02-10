'use client';
import { Box, Menu, MenuItem, Avatar, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Home, Person, Settings, BarChart, Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';

export default function DashboardLayout({ children }: { children: React.JSX.Element }) {
    const pathname = usePathname();
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
        <Box className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="bg-foreground h-20 text-lightText p-4 shadow-md w-full flex justify-between items-center">
                <div className="flex-shrink-0 md:hidden">
                    <button onClick={toggleSidebar} className="text-lightText">
                        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
                <Box className="flex-grow text-center">
                    <h2 className="text-lg font-semibold">Dashboard Panel</h2>
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

            {/* Main Content */}
            <Box className="flex flex-1 p-2">
                {/* Sidebar */}
                <aside
                    className={`fixed md:relative md:block md:w-64 text-lightText p-2 bg-gradient-to-r from-secondary to-surface rounded-md transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } md:translate-x-0 z-50 h-[85%] md:h-auto`}
                >
                    <nav className="flex flex-col space-y-4 h-1/2 rounded-md">
                        <Link
                            href="/dashboard"
                            className={`shadow-md flex items-center h-12 rounded-md p-3 font-semibold ${pathname === '/dashboard' ? 'bg-action' : 'hover:bg-action hover:translate-x-2 hover:translate-y-2 bg-foreground'
                                }`}
                        >
                            <Home className="mr-2" /> Home
                        </Link>
                        <Link
                            href="/dashboard/products"
                            className={`shadow-md flex items-center h-12 rounded-md p-3 font-semibold ${pathname === '/dashboard/products' ? 'bg-action' : 'hover:bg-action hover:translate-x-2 hover:translate-y-2 bg-foreground'
                                }`}
                        >
                            <Person className="mr-2" /> Products
                        </Link>
                        <Link
                            href="/dashboard/products"
                            className={`shadow-md flex items-center h-12 rounded-md p-3 font-semibold ${pathname === '/dashboard/settings' ? 'bg-secondary' : 'hover:bg-action hover:translate-x-2 hover:translate-y-2 bg-foreground'
                                }`}
                        >
                            <Settings className="mr-2" /> Sales
                        </Link>
                        <Link
                            href="/dashboard/reports"
                            className={`shadow-md flex items-center h-12 rounded-md p-3 font-semibold ${pathname === '/dashboard/reports' ? 'bg-secondary' : 'hover:bg-action hover:translate-x-2 hover:translate-y-2 bg-foreground'
                                }`}
                        >
                            <BarChart className="mr-2" /> Reports
                        </Link>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-4 md:p-8 bg-surface overflow-auto rounded-md">
                    {children}
                </main>
            </Box>

            {/* Footer */}
            <footer className="flex justify-center bg-foreground items-center text-lightText h-10">
                &copy; Copyright @2024
            </footer>
        </Box>
    );
}