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
                    backgroundColor: 'var(--error)', color: 'var(--error)',
                    backdropFilter: 'blur(10px)',
                    borderLeft: '20px solid var(--error)',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 6px var(--lightError)',
                    fontSize: '16px',
                };
            case 'success':
                return {
                    backgroundColor: 'var(--success)', color: 'var(--success)',
                    backdropFilter: 'blur(10px)',
                    borderLeft: '20px solid var(--success)',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 6px var(--lightSuccess)',
                };
            case 'info':
                return {
                    backgroundColor: 'var(--info)', color: 'var(--info)',
                    backdropFilter: 'blur(10px)',
                    borderLeft: '20px solid var(--info)',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 6px var(--lightInfo)',
                };
            case 'warning':
                return {
                    backgroundColor: 'var(--warning)', color: 'var(--warning)',
                    backdropFilter: 'blur(10px)',
                    borderLeft: '20px solid var(--warning)',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 6px var(--lightWarning)',
                    fontSize: '22px',

                };
            default:
                return { backgroundColor: '#1976d', color: '#fff' };
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
                <div style={{ padding: '24px', borderRadius: '8px', display: 'flex', alignItems: 'center',backgroundColor: 'white',  }}>
                    {getSeverityIcon()}
                    {message}
                </div>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};