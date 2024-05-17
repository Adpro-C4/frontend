import CarouselSlider from "@/components/elements/Carousel"
import { ProductCardProps } from "@/components/elements/ProductCard";
import { useState } from "react";

type CarouselSectionProps = {
    lst: ProductCardProps[]
}
const CarouselSection: React.FC<CarouselSectionProps> = ({lst}) => {
    
    return <div className="px-6 bg-pink-600 pt-6 pb-32">
        <CarouselSlider list={lst}/>
    </div>
}
export default CarouselSection