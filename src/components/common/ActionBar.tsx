import { Box } from '@mui/material'
import React from 'react'

function ActionBar({ children }: { children?: React.JSX.Element }) {
    return (
        <Box sx={{
        }} className='flex bg-background min-h-[50px] p-3 justify-end'>
            {children}
        </Box>
    )
}

export default ActionBar
