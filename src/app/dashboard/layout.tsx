'use client';
import { Box, Menu, MenuItem, Avatar, IconButton, Typography, Button } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Person, Settings, BarChart, Menu as MenuIcon, Close as CloseIcon, People, LogoutOutlined, Inventory, EmojiTransportation, ShoppingCart, Group, Business, Category, Warehouse, MoveToInbox, LocalShipping } from '@mui/icons-material';
import Footer from '@/components/common/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function DashboardLayout({ children }: { children: React.JSX.Element }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const router = useRouter()
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleProfile = () => {
        console.log('helasljdfaskldjf')
    }
    const handleSettings = () => {

    }
    const handleSignout = () => {
        const promptMessage = confirm('Are you sure?')
        if (promptMessage) {
            router.push('/')
        }
    }
    return (
        <Box className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="bg-foreground h-20 text-lightText p-4 shadow-md w-full flex justify-between items-center">
                <div className="flex-shrink-0 md:hidden">
                    <button onClick={toggleSidebar} className="text-lightText">
                        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
                <Box className="flex items-center gap-2 justify-center flex-grow">
                    <Button>
                        <Link href="/dashboard" className="flex items-center">
                            <Image
                                src="/logistic-logo.png"
                                alt="Logo"
                                width={40}
                                height={40}
                                className="h-16 w-16 object-contain"
                            />
                        </Link>
                    </Button>
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
                        <MenuItem onClick={handleProfile}>
                            <Link href="/users" className="flex items-center">
                                <Person className="mr-2" color='primary' /> Profile
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleSettings}>
                            <Link href="/dashboard/settings" className="flex items-center">
                                <Settings className="mr-2" color='secondary' /> Settings
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleSignout}>
                            <Typography><LogoutOutlined color='error' className="mr-2" /> Logout</Typography>
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
                        {[
                            { name: 'Home', path: '/dashboard', icon: <Home /> },
                            { name: 'Company', path: '/dashboard/company', icon: <Business /> },
                            { name: 'Products', path: '/dashboard/products', icon: <Category /> },
                            { name: 'Client Distributions', path: '/dashboard/sales', icon: <ShoppingCart /> },
                            { name: 'Customers Sales', path: '/dashboard/customers-sales', icon: <ShoppingCart /> },
                            { name: 'Clients', path: '/dashboard/clients', icon: <People /> },
                            { name: 'Customers', path: '/dashboard/customers', icon: <Group /> },
                            { name: 'Transporter', path: '/dashboard/transporters', icon: <EmojiTransportation /> },
                            { name: 'Inventory', path: '/dashboard/inventory', icon: <Inventory /> },
                            { name: 'Inventory Distributions', path: '/dashboard/distributions', icon: <LocalShipping /> },
                            { name: 'Reports', path: '/dashboard/reports', icon: <BarChart /> },
                        ].map((item, index) => (
                            <Link key={index} href={item.path} passHref>
                                <motion.div
                                    className={`shadow-md flex items-center h-12 rounded-md p-3 font-semibold ${pathname === item.path ? 'bg-action' : 'hover:bg-action bg-foreground'
                                        }`}
                                    whileHover={{ scale: 1.05, x: 5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {item.icon} <span className="ml-2">{item.name}</span>
                                </motion.div>
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Animated Main Content */}
                <motion.main
                    className="flex-1 p-4 md:p-8 bg-surface overflow-auto rounded-md"
                    key={pathname}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                >
                    <AnimatePresence mode="wait">{children}</AnimatePresence>
                </motion.main>
            </Box>

            {/* Footer */}
            <Footer />
        </Box>
    );
}
