"use client"
import { ProductCardProps } from "@/components/elements/ProductCard"
import { useState, useEffect } from "react"
import SearchResultSection from "./sections/SearchResultSection"
import { useSearchParams } from 'next/navigation'
import { getAllProduct } from "@/api/service"

const SearchModule = () =>{
    const searchParams = useSearchParams()
    const search: string = searchParams.get('q') ? searchParams.get('q')! : ""

    const [productCards, setProductCards] = useState<ProductCardProps[]>([]);
    const [filteredProductCards, setFilteredProductCards] = useState<ProductCardProps[]>([]);

    useEffect(()=>{
        fetchProduct()
    }, [search])
    useEffect(()=>{
        filterProducts()
    },[productCards])

    const filterProducts = () => {
        const filtered = productCards.filter((product) => {
            const nameMatch = product.name.toLowerCase().includes(search.toLowerCase())
            const categoryMatch = product.category!.toLowerCase().includes(search.toLowerCase())
            return nameMatch || categoryMatch;
        });
        setFilteredProductCards(filtered);
    }

    const fetchProduct = async ()=> {
        setProductCards(await getAllProduct())
        
    }

    return <div className="pt-24 flex flex-col min-h-screen">
        <SearchResultSection lst={filteredProductCards} searchText={search}/>
    </div>
}

export default SearchModule