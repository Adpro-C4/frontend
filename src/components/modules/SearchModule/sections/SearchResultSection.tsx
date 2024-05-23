import ProductCard, { ProductCardProps } from '@/components/elements/ProductCard';
import Stack from '@/components/elements/Stack';
import { FaSadTear } from 'react-icons/fa';

type SearchResultSectionProps = {
    lst: ProductCardProps[],
    searchText: string
}

const SearchResultSection: React.FC<SearchResultSectionProps> = ({lst, searchText}) => {
    return (
        <Stack>
        <div className="min-h-screen  rounded-md mx-auto bg-white flex flex-col w-screen max-w-6xl mt-4 md:mt-8 p-4 md:p-8">
            <h1 className="text-black text-lg md:text-2xl font-bold">
                Hasil Pencarian untuk <span className="text-blue-400">{searchText}</span>
            </h1>
            {
                lst.length > 0 && 
                <div className='grid grid-cols-2 mt-6 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                    {
                        lst.map((data: ProductCardProps)=>{
                            return <ProductCard key={data.productId + "product"} 
                            stock={data.stock}
                             price={data.price}
                              name={data.name}
                               productId={data.productId}
                                imageUrl={data.imageUrl} 
                                />
                        })
                    }
                </div>
            }

{ lst.length == 0 && <div className="my-auto  mx-auto ">
                <div className='flex flex-col space-y-6 items-center'>
                <FaSadTear className="text-6xl text-gray-700" />
                <p className="text-lg text-gray-700 mt-4">Maaf, hasil pencarian tidak ditemukan.</p>
                </div>
        </div>}
            
        
        </div>
       
        </Stack>
    );
}

export default SearchResultSection;
