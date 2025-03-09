import { IconButton } from '@mui/material'
import React from 'react'
type CustomIconButtonProps = {
    handle: () => void;
    children: React.ReactNode;
    color?: any;
    className?: string
}
function CustomIconButton({ handle, color = 'primary', children, className }: CustomIconButtonProps) {
    return (
        <IconButton onClick={handle} color={color} className={
            className
        }>
            {children}
        </IconButton >
    )
}

export default CustomIconButton
