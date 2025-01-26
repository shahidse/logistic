'use client'
import { Box } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Home, Person, Settings, BarChart, Menu as MenuIcon } from '@mui/icons-material';

export default function DashboardLayout({ children }: { children: React.JSX.Element }) {
    const pathname = usePathname();

    return (
        <Box className="flex ">
            <Box className="flex flex-col h-screen">
                <header className="bg-foreground h-20 text-lightText p-4 shadow-md w-screen flex justify-center items-center ">
                    <div className='flex-shrink-0 md:hidden'>
                        <MenuIcon className='hidden md:flex' />
                    </div>
                    <Box className="flex-grow text-center items-center">
                        <h2 className="text-lg font-semibold">Dashboard Panel</h2>
                    </Box>
                </header>
                <Box className='flex p-5 h-full'>
                    <aside className="hidden md:block md:w-64  text-lightText p-2  bg-gradient-to-r from-secondary to-surface rounded-md">
                        <nav className="flex flex-col space-y-4 h-1/2 rounded-md">
                            <Link href="/dashboard" className={`shadow-md flex items-center h-12 rounded-md p-3 font-semibold ${pathname === '/dashboard' ? 'bg-action' : 'hover:bg-action hover:translate-x-2 hover:translate-y-2 bg-foreground'}`}>
                                <Home className="mr-2" /> Home
                            </Link>
                            <Link href="/dashboard/profile" className={`shadow-md flex items-center h-12 rounded-md p-3 font-semibold ${pathname === '/dashboard/profile' ? 'bg-secondary' : 'hover:bg-action hover:translate-x-2 hover:translate-y-2 bg-foreground'}`}>
                                <Person className="mr-2" /> Profile
                            </Link>
                            <Link href="/dashboard/settings" className={`shadow-md flex items-center h-12 rounded-md p-3 font-semibold ${pathname === '/dashboard/settings' ? 'bg-secondary' : 'hover:bg-action hover:translate-x-2 hover:translate-y-2 bg-foreground'}`}>
                                <Settings className="mr-2" /> Settings
                            </Link>
                            <Link href="/dashboard/reports" className={`shadow-md flex items-center h-12 rounded-md p-3 font-semibold ${pathname === '/dashboard/reports' ? 'bg-secondary' : 'hover:bg-action hover:translate-x-2 hover:translate-y-2 bg-foreground'}`}>
                                <BarChart className="mr-2" /> Reports
                            </Link>
                        </nav>
                    </aside>
                    <main className="flex flex-col md:flex-1 md:p-2 p-8 bg-surface overflow-auto rounded-md">
                        {children}
                    </main>
                </Box>
                <footer className='flex justify-center bg-foreground items-center text-lightText h-10'>copy right @2024</footer>
            </Box>
        </Box>
    );
}
