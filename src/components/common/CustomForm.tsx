import React, { ReactNode } from 'react';

// Define the type for the component props
interface CustomFormProps {
    onSubmit: React.FormEventHandler<HTMLFormElement>; // Type for the onSubmit handler
    children: ReactNode; // Type for children elements (anything you want to pass inside the form)
}

const CustomForm: React.FC<CustomFormProps> = ({ onSubmit, children }) => {
    return (
        <form onSubmit={onSubmit} className="w-full max-w-md space-y-6">
            {children}
        </form>
    );
};

export default CustomForm;

