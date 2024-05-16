import { CarouselCardProps } from "../interface"

type Card = {
    carouselData: CarouselCardProps
}
const CarouselCard: React.FC<Card> = ({carouselData}) => {
    return <div className="slider mr-4 rounded-lg bg-red-400  h-64 object-fill  relative">
        <img className="rounded-lg object-cover w-full h-full" src={carouselData.imageUrl} alt="" />
        <div className="absolute top-2 right-2 text-center px-4 py-1 bg-gray-300 rounded-lg">
        <h1 className=" text-pink-500 text-xs font-bold">{carouselData.price}</h1>
        </div>
        <div className="absolute bottom-0 left-0 flex flex-col w-full">
            <h1 className="px-2 py-1 bg-slate-900 bg-opacity-40 rounded-se-lg text-xs w-fit">Stok produk: 20</h1>
            <div className="flex w-full bg-white min-h-16 px-4 bg-opacity-40 rounded-b-lg  items-center justify-between">
            <p className="grow line-clamp-2 text-black font-semibold">{carouselData.name}</p>
            <a className=" bg-slate-900 bg-opacity-80 text-center text-white px-4 py-2 text-xs rounded-3xl truncate min-w-32">Detail Produk</a>
            </div>
        </div>
    </div>
}

export default CarouselCard