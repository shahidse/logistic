import TransportersForm from '@/components/transporters/TransportersForm';
import React from 'react'
export interface ProductPageProps {
    params: any; // params contain the dynamic route
}

async function page({ params }: ProductPageProps) {
    const { id } = await params;
    return (
        <TransportersForm id={id} />
    )
}

export default page