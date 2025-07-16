import React from 'react'
import { ProductPageProps } from '../../company/[id]/page'
import CustomersSalesForm from '@/components/customers-sales/CustomersSalesForm'

async function page({ params }: ProductPageProps) {
    const { id } = await params
    return (
        <CustomersSalesForm id={id} />
    )
}

export default page
