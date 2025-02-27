import React, { useEffect, useState } from 'react';
import { TextField, FormControl, InputAdornment, FormHelperText, SxProps, CircularProgress, MenuItem, Box } from '@mui/material';
interface Option {
    value: string;
    label: string;
}
interface InputProps {
    label?: string; // Label text for the input field
    type?: React.HTMLInputTypeAttribute; // Allowed input types (can be extended as needed)
    name?: string; // Name attribute for the input
    placeholder?: string; // Placeholder text for the input field
    value?: string | number; // Value of the input (either string or number)
    onChange?: React.ChangeEventHandler<HTMLInputElement>; // Change event handler for the input
    required?: boolean; // Whether the field is required or not
    icon?: React.ReactNode; // Icon to be shown in the input field
    error?: boolean; // Whether the input field has an error (for validation purposes)
    helperText?: string; // Helper text to display below the input field (usually for errors)
    className?: string;
    sx?: SxProps; // Custom styles
    fullWidth?: boolean,
    loading?: boolean,
    select?: boolean,
    options?: Option[],
    defaultValue?: string,
    multiline?: boolean,
    rows?: number
}

const CustomInput: React.FC<InputProps> = ({
    label,
    type = 'text',
    name,
    placeholder,
    value,
    onChange,
    required = true,
    icon,
    error = false,
    helperText,
    className,
    loading = false,
    select = false,
    options = [{
        value: 'value',
        label: 'label'
    }],
    defaultValue = '',
    multiline = false,
    rows = 4,
    sx = {

        '& label': { color: 'var(--foreground)', }, // Default label color
        '& .MuiInputLabel-asterisk': {
            color: 'red',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            fontStyle: 'italic'
        },
        '& label.Mui-focused': { color: 'var(--background)' }, // Label color on focus
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: error ? 'red' : 'var(--secondary)', // Border color based on error state
            },
            '&:hover fieldset': { borderColor: 'var(--secondary)' }, // Border color on hover
            '&.Mui-focused fieldset': { borderColor: 'var(--surface)' }, // Border color on focus
        },
        '& .MuiInputBase-input': {
            color: 'var(--lightText)', // Text color inside input
        },
    },
    fullWidth = true
}) => {
    const [screenWidth, setScreenWidth] = useState<number>(0);
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <FormControl fullWidth={screenWidth < 768 ? true : fullWidth} error={error}>
            <TextField
                type={type}
                select={select}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                variant="outlined"
                // defaultValue={defaultValue}
                fullWidth={screenWidth < 768 ? true : fullWidth}
                label={label}
                className={`flex bg-secondary rounded-[8px]  shadow-lg border-transparent ${className}`}
                sx={sx}
                multiline={multiline}
                rows={rows}
                InputLabelProps={{
                    shrink: type === 'date' || type == 'Date' || type === 'file' ? true : undefined,
                }}
                InputProps={{
                    endAdornment: icon ? (
                        <InputAdornment position="end">{icon}</InputAdornment>
                    ) : null,
                    startAdornment: loading ? (
                        <InputAdornment position='end'><CircularProgress size={24} color="inherit" /></InputAdornment>
                    ) : null
                }}
            > {select && options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}</TextField>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl >
    );
};

export default CustomInput;
