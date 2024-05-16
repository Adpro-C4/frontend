import Stack from "@/components/elements/Stack"
import CategoryCard, { CategoryCardProps } from "../components/CategoryCard"



const CategorySection = () => {
    const categories: CategoryCardProps[] = [
        {
            imageUrl: "https://res.cloudinary.com/ruparupa-com/image/upload/w_500,h_500/f_auto,q_auto:eco/v1681140329/Products/10513244_1.jpg",
            label: "Action Figure"
        },
        {
            imageUrl: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//99/MTA-66720760/double_e_double_e_cada_bricks_dark_knight_supercar_c63003w_full01_re2nteek.jpg",
            label: "Model Kits"
        },
        {
            imageUrl: "https://images-cdn.ubuy.co.id/652e907f0759b171ec0a8cfe-monopoly-the-mega-edition-board-game.jpg",
            label: "Board Games"
        },
        {
            imageUrl: "https://m.media-amazon.com/images/I/610QKQ2Ji4L.jpg",
            label: "RC Vehicles"
        },
      
        {
            imageUrl: "https://templatelab.com/wp-content/uploads/2017/04/puzzle-piece-template-13.jpg",
            label: "Puzzle & Brain Teasers"
        },
        {
            imageUrl: "https://globalmusic.ph/wp-content/uploads/2023/12/GL-38-SBL-ord-2.png",
            label: "Musical Instruments"
        },
        {
            imageUrl: "https://www.vaude.com/media/catalog/product/cache/1029c646f4061fbc0096ff5cb1294bde/1/4/14223_170_6__142231700_e1895831.jpg",
            label: "Sports & Outdoor Gear"
        }
    ];
    return <Stack>
        <div className="mx-auto p-6 rounded-lg -mt-28 max-w-[90%] md:max-w-3xl lg:max-w-6xl w-full bg-white min-h-64 flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-black mb-4">Category</h1>
            <div className="grid grid-cols-4 gap-2 md:gap-4">
                {
                    categories.map((category, index)=>{
                        return <CategoryCard imageUrl={category.imageUrl} label={category.label} key={"category"+index}/>
                    })
                }
            </div>
        </div>
    </Stack>
}
export default CategorySection