import { IconButton } from '@mui/material'
import React from 'react'
type CustomIconButtonProps = {
    handle: () => void;
    children: React.ReactNode;
    color?: any;
}
function CustomIconButton({ handle, color = 'primary', children }: CustomIconButtonProps) {
    return (
        <IconButton onClick={handle} color={color}>
            {children}
        </IconButton >
    )
}

export default CustomIconButton
