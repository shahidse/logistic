"use client";
import { useState } from 'react';
import { Avatar, TextField, IconButton, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Home() {
  const [showPassword, setShowPassword] = useState(true);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box className='flex bg-gradient-to-r from-foreground to-secondary w-full h-screen justify-center items-center'>
      <Box className="flex justify-center items-center flex-col gap-3">
        <Avatar sx={{ width: 60, height: 60 }} >
          <AccountCircleIcon color='info' sx={{ width: 50, height: 50 }} />
        </Avatar>
        <p className='text-lightText font-semibold '>Admin</p>
        <TextField
          id="outlined-basic"
          label="Secret"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          className='bg-secondary rounded-md'
          sx={{
            '& label': { color: 'var(--foreground)' }, // Default label color
            '& label.Mui-focused': { color: 'var(--background)' }, // Label color on focus
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'gray' }, // Default border color
              '&:hover fieldset': { borderColor: 'var(--secondary)' }, // Border color on hover
              '&.Mui-focused fieldset': { borderColor: 'var(--surface)' }, // Border color on focus
            },
            '& .MuiInputBase-input': {
              color: 'var(--lightText)',  // Text color inside input
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end" sx={{
                  color:'gray'
                }}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}
