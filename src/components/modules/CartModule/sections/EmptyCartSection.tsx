import { FaCartShopping } from "react-icons/fa6"

const EmptyCartSection = () => {
    return <div className="my-auto  mx-auto ">
    <div className='flex flex-col space-y-6 items-center'>
    <FaCartShopping className="text-6xl text-gray-700" />
    <p className="text-lg text-gray-700 mt-4">Yuk Mulai Belanja!</p>
    </div>
</div>
}

export default EmptyCartSection