"use client"
import { UserDTO } from "@/models/UserDTO";
import { useSelector } from "react-redux";
import EmptyCartSection from "./sections/EmptyCartSection"
import { useEffect, useState } from "react";
import { getShoppingcartData } from "@/api/service";
import { DTOCartItem } from "@/models/DTOCartItem";
import CartListSection from "./sections/CartListSection";
import { useRouter } from "next/navigation";

const CartModule = ()=> {
    const user: undefined|UserDTO = useSelector((state:any)=> state.auth.user);
    const [selectedCartItemsIdx, setSelectedCartItemsIdx] = useState<string[]>([])
    const [cartItems, setCartItems] = useState<DTOCartItem[]>([])
    const router = useRouter();
    useEffect(()=>{
        if(!user){
            alert("Maaf hanya customer yang login yang bisa melihat page ini")
            router.push("/login")
        }
    },[user])
    useEffect(()=>{
        fetchShoppingCart()
    },[user])

    

    const handleSelectItem = (productId: string) => {
        setSelectedCartItemsIdx((prevSelected) =>
          prevSelected.includes(productId)
            ? prevSelected.filter((id) => id !== productId)
            : [...prevSelected, productId]
        );
      };

    const handleCheckout = ()=> {
        router.push(`/checkout?data=${selectedCartItemsIdx.join(",")}`)
    }

    const fetchShoppingCart =async  () => {
        if(user){
            setCartItems(await getShoppingcartData(user.id!.toString()))
        }
    }
    return (
        <div className="flex flex-col w-full min-h-screen bg-white max-w-6xl px-4 md:px-8 pt-28">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-black text-2xl md:text-3xl font-bold">Your Cart</h1>
            {selectedCartItemsIdx.length > 0 && (
              <button onClick={handleCheckout} className="flex px-8  w-fit py-2 text-white rounded-xl font-semibold
              bg-gradient-to-r from-indigo-500 to-blue-400
             xlg:text-3xl">Checkout</button>
            )}
          </div>
          {cartItems.length === 0 ? (
            <EmptyCartSection />
          ) : (
            <CartListSection
              list={cartItems}
              refresh={fetchShoppingCart}
              selectedItems={selectedCartItemsIdx}
              onHandleSelectItem={handleSelectItem}
            />
          )}
        </div>
      );
    
}
export default CartModule