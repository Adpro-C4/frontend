"use client"
import { ProductCardProps } from "@/components/elements/ProductCard"
import { useEffect, useState } from "react"
import CarouselSection from "./sections/CarouselSection"
import CategorySection from "./sections/CategorySection"
import ProductSection from "./sections/ProductSection"
import { getAllProduct } from "@/api/service"

const HomepageModule = () => {
    const [productCards, setProductCards] = useState<ProductCardProps[]>([]);
    useEffect(()=>{
        fetchProduct()
    }, [])
    const fetchProduct = async ()=> {
        setProductCards(await getAllProduct())
    }
    return <div className="flex flex-col w-screen pt-20 md:pt-24">
        <CarouselSection lst={productCards.slice(0, Math.min(6, productCards.length)).sort(() => Math.random() - 0.5)} />
        <CategorySection/>
        <ProductSection lst={productCards}/>
    </div>
}

export default HomepageModule