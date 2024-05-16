import CarouselSlider from "@/components/elements/Carousel"

const CarouselSection: React.FC = () => {
    return <div className="px-6 bg-pink-600 pt-6 pb-32">
        <CarouselSlider list={[
            {
                imageUrl: "https://id-test-11.slatic.net/original/99100793c452f82e6979e2617c2ca330.jpg",
                price: "20000",
                name: "Gundam",
                productId: "1"
            },  {
            imageUrl: "https://contents.mediadecathlon.com/p2425700/k$bd8d38a8b9d2502c20c3a5d6b99f2178/arpenaz-4-pole-supported-camping-tent-4-person-1-bedroom.jpg?format=auto&quality=70&f=768x768",
            price: "20500",
            name: "Camp Tent",
            productId: "2"
        },
        {
            imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQoAy9p39o-r40UgS5gycK_E1qcBN5VXEqZTMPxe23zFoIxnt8dMiKD1YlR9qQonLbUMHuYEugtTJgeR-BVQA7dv-JnFoXoofWE4DP3TebBn2nzDI8Xv_p9&usqp=CAE",
            price: "20600",
            name: "Guitar",
            productId: "3"
        },
        {
            imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQEi64rcWGdGnzJSrUVZ1b3ZEZUL1YvuGSIt5eXTJDGdNySZGrukkyZRj0gktn5njLINPQ93f1qcnlfRvdAiuu1ZrZbrpS9cGwYqSqaQxy45jF8xZahUswt&usqp=CAE",
            price: "1200",
            name: "Puzzle",
            productId: "4"
        }
        ]}/>
    </div>
}
export default CarouselSection