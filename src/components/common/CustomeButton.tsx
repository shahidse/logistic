import React from 'react';
import { Button as MUIButton, SxProps } from '@mui/material';
import { ReactNode } from 'react';

// Define CustomButtonProps interface
interface CustomButtonProps {
    children?: ReactNode;
    type?: 'button' | 'submit' | 'reset';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    color?: 'primary' | 'secondary' | 'error' | 'inherit';
    bgColor?: string;
    textColor?: string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    variant?: 'contained' | 'outlined' | 'text';
    disableRipple?: boolean;
    loading?: boolean; // Set default as false
    fullWidth?: boolean;
    sx?: SxProps
}

// Generic Custom Button Component
const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    type = 'button',
    onClick,
    className = '',
    color = 'primary',
    startIcon,
    endIcon,
    variant = 'contained',
    disableRipple = false,
    loading = false,
    fullWidth = true,
    sx = {
        backgroundColor: 'var(--foreground)'
    },
    ...props
}) => {
    // Set TailwindCSS and MUI Button classes dynamically
    const buttonClasses = ` h-12  text-sm font-medium rounded-[10px] shadow-lg focus:bg-action focus:text-blue-400 focus:border-white ${variant === 'contained'
        ? ' text-surface hover:bg-action'
        : variant === 'outlined'
            ? 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
            : 'text-blue-500 hover:bg-blue-50 focus:text-blue-500'
        } ${className}`;

    return (
        <MUIButton
            type={type}
            onClick={onClick}
            className={buttonClasses}
            color={color}
            variant={variant}
            startIcon={startIcon}
            endIcon={endIcon}
            disableRipple={disableRipple}
            disabled={loading}
            loading={loading}
            loadingPosition='end'
            fullWidth={fullWidth}
            sx={sx}
            {...props}
        >
            {loading ? '' : children} {/* Hide children text when loading */}
        </MUIButton>
    );
};

export default CustomButton;
