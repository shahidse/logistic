import React from 'react';
import { TextField, FormControl, InputAdornment, FormHelperText } from '@mui/material';

interface InputProps {
    label?: string; // Label text for the input field
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'; // Allowed input types (can be extended as needed)
    name?: string; // Name attribute for the input
    placeholder?: string; // Placeholder text for the input field
    value?: string | number; // Value of the input (either string or number)
    onChange?: React.ChangeEventHandler<HTMLInputElement>; // Change event handler for the input
    required?: boolean; // Whether the field is required or not
    icon?: React.ReactNode; // Icon to be shown in the input field
    error?: boolean; // Whether the input field has an error (for validation purposes)
    helperText?: string; // Helper text to display below the input field (usually for errors)
    className?: string;
    sx?: any; // Custom styles
}

const CustomInput: React.FC<InputProps> = ({
    label,
    type = 'text',
    name,
    placeholder,
    value,
    onChange,
    required = false,
    icon,
    error = false,
    helperText,
    className,
    sx
}) => {
    return (
        <FormControl fullWidth error={error}>
            <TextField
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                variant="outlined"
                fullWidth
                label={label}
                className={`bg-secondary rounded-[8px] ${className}  shadow-lg border-transparent`}
                sx={{
                    ...sx,
                    '& label': { color: 'var(--foreground)' }, // Default label color
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
                }}
                InputProps={{
                    endAdornment: icon ? (
                        <InputAdornment position="end">{icon}</InputAdornment>
                    ) : null,
                }}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default CustomInput;
