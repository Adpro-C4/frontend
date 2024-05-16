import CarouselSection from "./sections/CarouselSection"
import CategorySection from "./sections/CategorySection"
import ProductSection from "./sections/ProductSection"

const HomepageModule = () => {
    return <div className="flex flex-col w-screen pt-20 md:pt-24">
        <CarouselSection/>
        <CategorySection/>
        <ProductSection/>
    </div>
}

export default HomepageModule