import * as React from 'react';
import Stack from '@mui/material/Stack';

export default function ButtonStack({ children, className }: { children?: React.JSX.Element, className?: string }) {
    return (
        <Stack direction="row" spacing={2} className={className}>
            {children}
        </Stack>
    );
}