import ProductsForm from '@/components/products/ProductsForm'
import React from 'react'
import { ProductPageProps } from '../../company/[id]/page'

async function page({ params }: ProductPageProps) {
    const { id } = await params
    return (
        <ProductsForm id={id}/>
    )
}

export default page
