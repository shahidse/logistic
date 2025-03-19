import SalesForm from '@/components/sales/SalesForm'
import React from 'react'
import { ProductPageProps } from '../../company/[id]/page'

async function page({ params }: ProductPageProps) {
    const { id } = await params
    return (
        <SalesForm id={id} />
    )
}

export default page
