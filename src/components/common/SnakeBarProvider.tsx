'use client'
import React, { createContext, useContext, useState, } from 'react';
import { Snackbar, SxProps } from '@mui/material';
import { Error as ErrorBoundary, CheckCircle, Info, Warning } from '@mui/icons-material';

interface SnackbarContextType {
    showSnackbar: (message: string, severity: 'error' | 'success' | 'info' | 'warning') => void;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('success message');
    const [severity, setSeverity] = useState<'error' | 'success' | 'info' | 'warning'>('warning');

    const showSnackbar = (message: string, severity: 'error' | 'success' | 'info' | 'warning') => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getSnackbarStyle = (severity: string): SxProps => {
        switch (severity) {
            case 'error':
                return {
                    backgroundColor: 'var(--lightError)', color: 'var(--error)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--lightError)',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 6px var(--lightError)',
                };
            case 'success':
                return {
                    backgroundColor: 'var(--lightSuccess)', color: 'var(--success)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--lightSuccess)',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 6px var(--lightSuccess)',
                };
            case 'info':
                return {
                    backgroundColor: 'var(--lightInfo)', color: 'var(--info)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--lightInfo)',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 6px var(--lightInfo)',
                };
            case 'warning':
                return {
                    backgroundColor: 'var(--lightWarning)', color: 'var(--warning)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--lightWarning)',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 6px var(--lightWarning)',
                };
            default:
                return { backgroundColor: '#1976d2', color: '#fff' };
        }
    };

    const getSeverityIcon = () => {
        switch (severity) {
            case 'error':
                return <ErrorBoundary sx={{ color: 'inherit', marginRight: '8px' }} />;
            case 'success':
                return <CheckCircle sx={{ color: 'inherit', marginRight: '8px' }} />;
            case 'info':
                return <Info sx={{ color: 'inherit', marginRight: '8px' }} />;
            case 'warning':
                return <Warning sx={{ color: 'inherit', marginRight: '8px' }} />;
            default:
                return null;
        }
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={getSnackbarStyle(severity)}
            >
                <div style={{ padding: '16px', borderRadius: '8px', boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)', display: 'flex', alignItems: 'center' }}>
                    {getSeverityIcon()}
                    {message}
                </div>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};