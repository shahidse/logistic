"use client"
import React, { ReactNode } from 'react';
interface CustomFormProps {
    onSubmit?: React.FormEventHandler<HTMLFormElement>; // Type for the onSubmit handler
    children?: ReactNode; // Type for children elements (anything you want to pass inside the form)
    className?: string;
    onReset?:React.FormEventHandler<HTMLFormElement>;
}

const CustomForm: React.FC<CustomFormProps> = ({ onSubmit, children, className, onReset }) => {
    return (
        <form onSubmit={onSubmit} className={`w-full  rounded  ${className}`} onReset={onReset}>
            {children}
        </form>
    );
};

export default CustomForm;

