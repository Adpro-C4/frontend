'use client'

import Navbar from "@/components/elements/Navbar/CustomerNavbar";
import AlamatSection from "./sections/AlamatSection";
import { useRouter, useSearchParams } from "next/navigation";
import { UserDTO } from "@/models/UserDTO";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserSection from "./sections/UserSection";
import VoucherSelectionSection from "./sections/VoucherSelectionSection";
import { createPurchaseRequest, getAllVoucher, getShoppingcartData } from "@/api/service";
import { VoucherDTO } from "@/models/VoucherDTO";
import { DTOCartItem } from "@/models/DTOCartItem";
import PurchaseItemSection from "./sections/ItemsSection";
import PengirimanSection from "./sections/PengirimanSection";

const CheckoutModule = () => {
    const useSearch = useSearchParams()
    const productIdsString = useSearch.get("data")
    const user: undefined|UserDTO = useSelector((state:any)=> state.auth.user);
    const [selectedVoucher, setSelectedVoucher] = useState<number|null>(null)
    const [vouchers, setVouchers] = useState<VoucherDTO[]>([])
    const [items, setItems] = useState<DTOCartItem[]>([])
    const [alamat, setAlamat] = useState<string|null>(null)
    const [pengiriman, setPengiriman] = useState<string | null>(null)
    const router = useRouter();

    const isValid = () => {
        return pengiriman && alamat
    }

    useEffect(()=>{
        fetchVoucher()
    },[])

    useEffect(()=>{
        if(!productIdsString){
            alert("konfigurasi pembelian tidak valid!")
            router.back()
        }
        fetchShoppingCart()
    },[])

    const fetchShoppingCart =async  () => {
        if(user){
            const data: DTOCartItem[] = await getShoppingcartData(user.id!.toString())
            const ids = productIdsString?.split(",") ?? []
            const filteredCartItems = data.filter(item => ids.includes(item.productId));
            setItems(filteredCartItems)
        }
        
    }

    const checkout = async  () => {
        await createPurchaseRequest({
            userId: user!.id!.toString(),
            voucherId: selectedVoucher? selectedVoucher.toString() : null,
            cartItems: productIdsString!.split(","),
            address: alamat!,
            shippingMethod: pengiriman!
        })
        alert("Berhasil membuat request pembelian")
        router.push("/order-history")
    }
    
    const fetchVoucher = async () => {
        setVouchers(await getAllVoucher())
    }
    
    useEffect(()=>{
        if(!user){
            alert("Maaf hanya customer yang login yang bisa melihat page ini")
            router.push("/login")
        }
    },[user])

    return <div className="w-screen flex flex-col min-h-screen bg-gray-200 pt-28 items-center">
        <Navbar/>
        <div className="flex flex-col mx-auto max-w-6xl w-full p-4 md:p-8 bg-white">
        <h1 className="text-2xl md:text-3xl text-black font-bold mb-4">Lengkapi Data Pembelian</h1>
        <AlamatSection onSubmitAlamat={(alamat: string)=>{
            setAlamat(alamat)
        }}/>
        <UserSection 
        name={user?.name!} 
        email={user?.email!} 
        phone={user?.phoneNumber!}/>
        <VoucherSelectionSection 
        vouchers={vouchers} 
        onVoucherSelect={function (selectedVoucher: number | null): void {
                setSelectedVoucher(selectedVoucher)
            } }/>
        <PurchaseItemSection cartItems={items}/>
        <PengirimanSection onSelectPengiriman={function (maskapai: string): void {
                setPengiriman(maskapai)
            } }/>

        {
            isValid() && 
            <button onClick={checkout} className="ml-auto flex px-8  w-fit py-2 text-white rounded-xl font-semibold
            bg-gradient-to-r from-indigo-500 to-blue-400 text-2xl
          ">Beli</button>
        }
        </div>
    </div>
}

export default CheckoutModule;