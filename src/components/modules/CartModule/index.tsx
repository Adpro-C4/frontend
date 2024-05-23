"use client"
import { UserDTO } from "@/models/UserDTO";
import { useSelector } from "react-redux";
import EmptyCartSection from "./sections/EmptyCart"
import { useEffect } from "react";
import { getShoppingcartData } from "@/api/service";

const CartModule = ()=> {
    const user: undefined|UserDTO = useSelector((state:any)=> state.auth.user);
    useEffect(()=>{
        console.log(user)
        fetchShoppingCart()
    },[user])
    const fetchShoppingCart =async  () => {
        if(user){
            await getShoppingcartData(user.id!.toString())
        }
    }
    return <div className="flex flex-col w-full min-h-screen bg-white max-w-6xl px-4 md:px-8 pt-28">
        <h1 className="text-black text-2xl md:text-3xl font-bold">Your Cart</h1>
        <EmptyCartSection/>
    </div>
}
export default CartModule