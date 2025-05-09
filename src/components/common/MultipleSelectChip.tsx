import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { CircularProgress, InputAdornment } from '@mui/material';

interface MultipleSelectChipProps {
    label: string;
    options: any[]; // List of options to display in the select
    value: string[]; // The selected values
    onChange: (event: SelectChangeEvent<any>) => void; // Change handler for the select
    width?: number; // Optional: width of the FormControl
    loading?: boolean; // Whether to show loading spinner
    error?: boolean; // Whether there is an error
    helperText?: string; // Error message
    required?: boolean; // Whether the field is required
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, selectedNames: readonly string[], theme: Theme) {
    return {
        fontWeight: selectedNames.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

const MultipleSelectChip: React.FC<MultipleSelectChipProps> = ({
    label,
    options,
    value,
    onChange,
    width = 300, // default width if not provided
    loading = false,
    error = false,
    helperText = '',
    required = true,
}) => {
    const theme = useTheme();

    return (
        <FormControl sx={{ width: width }} error={error}>
            <InputLabel id="multiple-chip-select-label" sx={{
                color: 'var(--secondary)',
            }}>{label}</InputLabel>
            <Select
                labelId="multiple-chip-select-label"
                id="multiple-chip-select"
                multiple
                value={value}
                required={required}
                onChange={onChange}
                input={<OutlinedInput id="select-multiple-chip" label={label} />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((id) => {
                            const label = options.find(option => option.value === id)?.label || id;
                            return <Chip key={id} label={label} color="info" />;
                        })}
                    </Box>
                )}
                MenuProps={MenuProps}
                // Custom styles based on CustomInput
                className={`flex bg-inputBorder backdrop-blur rounded-[6px] text-[info] shadow-lg`}
                sx={{
                    backdropFilter: 'blur(10px)',
                    'label + &': {
                        color: "var(--inputBorder)"
                    },
                    '& .MuiInputBase-input': {
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                    },
                    '& fieldset': {
                        borderColor: error ? 'red' : 'var(--inputBorder)', // Border color based on error state
                    },
                    '&:hover fieldset': { borderColor: 'var(--secondary)' }, // Border color on hover
                }}
                endAdornment={
                    loading ? (
                        <InputAdornment position="end">
                            <CircularProgress color="inherit" size={20} />
                        </InputAdornment>
                    ) : null
                }
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value} style={getStyles(option, value, theme)}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {helperText && <Box sx={{ mt: 1, color: 'red', fontSize: '0.75rem' }}>{helperText}</Box>}
        </FormControl >
    );
};

export default MultipleSelectChip;
