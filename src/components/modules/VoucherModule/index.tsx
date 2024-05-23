"use client"
import { useEffect, useState } from "react"
import VoucherCard from "./components/VoucherCard"
import { deleteVoucher, getAllVoucher } from "@/api/service"
import { VoucherDTO } from "@/models/VoucherDTO"

const VoucherModule = () => {

    const [vouchers, setVouchers] = useState<VoucherDTO[]>([])
    useEffect(()=>{
        fetchVoucher()
    },[])
    
    const fetchVoucher = async () => {
        setVouchers(await getAllVoucher())
    }

    const handleDeleteVoucher = async (id:number | undefined)=>{
        await deleteVoucher(id!)
        fetchVoucher()
    }

    return <div className="pt-28 min-h-screen w-screen flex flex-col bg-gray-200 md:px-8">
        <div className="flex flex-col mx-auto w-full max-w-6xl bg-white p-8">
        <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold  text-black">Daftar Voucher</h1>
        <a href="/voucher/create" className="text-base font-bold text-white  text-center bg-pink-500 rounded-md px-2 py-2">Buat Voucher</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2">
        {vouchers.map(voucher => <VoucherCard key={"voucher"+voucher.voucherName} voucher={voucher} 
        onDelete={handleDeleteVoucher}/>)}
        </div>
        </div> 
    </div>
}

export default VoucherModule