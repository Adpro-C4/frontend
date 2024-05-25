import Navbar from "@/components/elements/Navbar/CustomerNavbar"
import CartModule from "@/components/modules/CartModule"

const Page = ()=>{
    return <div className="min-h-screen flex flex-col items-center w-screen bg-gray-200">
        <Navbar/>
        <CartModule/>
    </div>
}

export default Page