import React from 'react'
import { ProductPageProps } from '../../company/[id]/page'
import CustomersSalessForm from '@/components/customers-sales/CustomersSalesForm'

async function page({ params }: ProductPageProps) {
    const { id } = await params
    return (
        <CustomersSalessForm id={id} />
    )
}

export default page
