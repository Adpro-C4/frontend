"use client"
import { ProductCardProps } from "@/components/elements/ProductCard"
import axios from "axios"
import { useState, useEffect } from "react"
import SearchResultSection from "./sections/SearchResultSection"
import { useSearchParams } from 'next/navigation'

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
            const nameMatch = product.name.toLowerCase().includes(search.toLowerCase()) //|| 
            //search.toLowerCase().includes(product.name.toLowerCase());
            const categoryMatch = product.category!.toLowerCase().includes(search.toLowerCase())// ||
          //  search.toLowerCase().includes(product.category!.toLowerCase());
            return nameMatch || categoryMatch;
        });
        setFilteredProductCards(filtered);
    }

    const fetchProduct = async ()=> {
        const res = await axios.get("https://api-gateway-specialitystore.up.railway.app/product-service/product/all", {
            headers: {
                'Origin': 'http://random-origin.com'
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
                category: datum.category,
                onAddToCart: function (productId: string): void {
                    throw new Error("Function not implemented.")
                }
            })
        })
        setProductCards(nwProductCards)
    }

    return <div className="pt-24 flex flex-col min-h-screen">
        <SearchResultSection lst={filteredProductCards} searchText={search}/>
    </div>
}

export default SearchModule