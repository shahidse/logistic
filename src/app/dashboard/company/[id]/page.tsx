import CompanyForm from '@/components/company/CompanyForm'
import React from 'react'
export interface ProductPageProps {
    params: { id: string }; // params contain the dynamic route
}

async function page({ params }: ProductPageProps) {
    const { id } = await params;
    return (
        <CompanyForm id={id}/>
    )
}

export default page
