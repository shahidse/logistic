import * as React from 'react';
import Stack from '@mui/material/Stack';

export default function ButtonStack({ children }: { children?: React.JSX.Element }) {
    return (
        <Stack direction="row" spacing={2}>
            {children}
        </Stack>
    );
}