import ClientsForm from '@/components/clients/ClientsForm';
import React from 'react'
export interface ProductPageProps {
    params: any; // params contain the dynamic route
}

async function page({ params }: ProductPageProps) {
    const { id } = await params;
    return (
        <ClientsForm id={id} />
    )
}

export default page
