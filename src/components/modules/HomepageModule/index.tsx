"use client"
import { ProductCardProps } from "@/components/elements/ProductCard"
import { useEffect, useState } from "react"
import CarouselSection from "./sections/CarouselSection"
import CategorySection from "./sections/CategorySection"
import ProductSection from "./sections/ProductSection"
import axios from "axios"

const HomepageModule = () => {
    const [productCards, setProductCards] = useState<ProductCardProps[]>([]);
    useEffect(()=>{
        fetchProduct()
    }, [])
    const fetchProduct = async ()=> {
        const res = await axios.get("https://api-gateway-specialitystore.up.railway.app/product-service/product/all", {
            headers: {
                'Origin': 'http://random-origin.com' // Ini adalah nilai acak untuk header Origin
            }
        });
        console.log(res.data)
        const nwProductCards : ProductCardProps[] = []
        res.data.map((datum:any)=>{
            nwProductCards.push({
                stock: datum.quantity.toString(),
                price: datum.price.toString(),
                name: datum.name,
                productId: datum.id.toString(),
                imageUrl: datum.image,
                onAddToCart: function (productId: string): void {
                    throw new Error("Function not implemented.")
                }
            })
        })
        setProductCards(nwProductCards)
    }
    return <div className="flex flex-col w-screen pt-20 md:pt-24">
        <CarouselSection lst={productCards.slice(0, Math.min(6, productCards.length)).sort(() => Math.random() - 0.5)} />
        <CategorySection/>
        <ProductSection lst={productCards}/>
    </div>
}

export default HomepageModule