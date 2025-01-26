"use client";
import { useState } from 'react';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CustomInput from '@/components/common/CustomInput';
import CustomForm from '@/components/common/CustomForm';

export default function Home() {
  const [showPassword, setShowPassword] = useState(true);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box className='flex bg-gradient-to-r from-foreground to-secondary w-full h-screen justify-center items-center '>
      <Box className="flex w-full items-center flex-col gap-3 p-6 max-w-md">
        <AccountCircleIcon sx={{ width: 100, height: 100 }} />
        <p className='text-lightText font-semibold '>Admin</p>
        <CustomForm onSubmit={handleTogglePassword}>
          <CustomInput
            label="Secret"
            type={showPassword ? "text" : "password"}
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
              },
            }}

            icon={
              <IconButton onClick={handleTogglePassword} edge="end" sx={{
                color: 'gray'
              }}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            }
          />

        </CustomForm>
      </Box>
    </Box>
  );
}
