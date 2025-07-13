import DistributionsForm from '@/components/distributions/DistributionsForm';
import React from 'react'
export interface ProductPageProps {
    params: any; // params contain the dynamic route
}

async function page({ params }: ProductPageProps) {
    const { id } = await params;
    return (
        <DistributionsForm id={id} />
    )
}

export default page
