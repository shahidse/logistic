import React, { useEffect, useState } from 'react';
import { TextField, FormControl, InputAdornment, FormHelperText, SxProps, CircularProgress, MenuItem, Box } from '@mui/material';
interface Option {
    value: any;
    label: any;
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
    rows?: number,
    disabled?: boolean
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
    multiline = false,
    rows = 4,
    disabled = false,
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
            backdropFilter: 'blur(10px)',
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
            {/* <TextField
                type={type}
                select={select}

                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                variant="outlined"
                // defaultValue={select? value:null}
                fullWidth={screenWidth < 768 ? true : fullWidth}
                label={label}
                className={`flex bg-inputBackground backdrop-blur rounded-[6px] text-[info] shadow-lg border-inputBorder  ${className}`}
                sx={sx}
                multiline={multiline}
                rows={rows}
                disabled={disabled || loading}

                InputLabelProps={{
                    shrink: type === 'date' || type == 'Date' || type === 'file' ? true : undefined,
                }}
                InputProps={{
                    endAdornment: icon ? (
                        <InputAdornment position="end">{icon}</InputAdornment>
                    ) : null,
                    startAdornment: loading ? (
                        <InputAdornment position='start'><CircularProgress size={24} color="inherit" /></InputAdornment>
                    ) : null
                }}
            > {select &&
                (options && options.length > 0 ? options : [{ label: 'No options available', value: 0 }])
                    .map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
            </TextField> */}
            <TextField
                type={type}
                select={select}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                variant="outlined"
                fullWidth={screenWidth < 768 ? true : fullWidth}
                label={label}
                className={`flex bg-inputBackground backdrop-blur rounded-[6px] text-[info] shadow-lg border-inputBorder  ${className}`}
                sx={sx}
                multiline={multiline}
                rows={rows}
                disabled={disabled || loading}
                InputLabelProps={{
                    shrink: type === 'date' || type === 'Date' || type === 'file' ? true : undefined,
                }}
                InputProps={{
                    endAdornment: icon ? (
                        <InputAdornment position="end">{icon}</InputAdornment>
                    ) : null,
                    startAdornment: loading ? (
                        <InputAdornment position="start">
                            <CircularProgress size={24} color="inherit" />
                        </InputAdornment>
                    ) : null,
                }}
            >
                {select &&
                    (options ?? [{ label: 'No options available', value: 0 }])
                        .filter(option => option && option.value !== undefined)
                        .map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
            </TextField>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl >
    );
};

export default CustomInput;
