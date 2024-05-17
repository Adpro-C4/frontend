"use client"
import ProductCard, { ProductCardProps } from "@/components/elements/ProductCard"
import Stack from "@/components/elements/Stack"
import axios from "axios"
import { useEffect, useState } from "react"
type ProductSectionProps = {
    lst: ProductCardProps[]
}
const ProductSection: React.FC<ProductSectionProps> = ({lst}) =>{
    
    return  <Stack className="mt-32 bg-pinvk-600">
    <div className="mx-auto  p-6 rounded-lg -mt-28 max-w-[90%] md:max-w-3xl lg:max-w-6xl w-full bg-white min-h-64 flex flex-col">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-black mb-4">Products</h1>
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
        {lst.map((product, index) => (
        <ProductCard key={"product-card"+index}
        stock={product.stock} 
        price={product.price} 
        name={product.name} 
        productId={product.productId} 
        imageUrl={product.imageUrl} 
        onAddToCart={function (productId: string): void {
                throw new Error("Function not implemented.")
            } }/>
      ))}
        </div>
    </div>
</Stack>
}

export default ProductSection