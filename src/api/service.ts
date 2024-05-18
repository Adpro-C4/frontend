import { ProductCardProps } from "@/components/elements/ProductCard";
import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const getAllProduct = async (): Promise<ProductCardProps[]>=>{
    const res = await axios.get(BASE_URL+"/product-service/product/all");
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
                }
            })
        })
        return nwProductCards
}