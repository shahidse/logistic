import InventoryForm from '@/components/inventory/InventoryForm';
import React from 'react'
export interface ProductPageProps {
    params: any; // params contain the dynamic route
}

async function page({ params }: ProductPageProps) {
    const { id } = await params;
    return (
        <InventoryForm id={id} />
    )
}

export default page
