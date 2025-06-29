import CustomersForm from '@/components/customers/CustomersForm';
import React from 'react'
export interface ProductPageProps {
    params: any; // params contain the dynamic route
}

async function page({ params }: ProductPageProps) {
    const { id } = await params;
    return (
        <CustomersForm id={id} />
    )
}

export default page
