import { ProductCardProps } from "@/components/elements/ProductCard";
import axios from "axios";
import { UserDTO } from "@/models/UserDTO";

import { VoucherDTO } from "@/models/VoucherDTO";

export const getAllProduct = async (): Promise<ProductCardProps[]>=>{
    const res = await axios.get("/api-gateway-proxy/product-service/product/all");
        console.log(res.data)
        const nwProductCards : ProductCardProps[] = []
        res.data.map((datum:any)=>{
            nwProductCards.push({
                stock: datum.quantity.toString(),
                price: datum.price.toString(),
                name: datum.name,
                productId: datum.id.toString(),
                imageUrl: datum.image,
                category: datum.category,
                onAddToCart: function (productId: string): void {
                }
            })
        })
        return nwProductCards
}

export const register = async (user: UserDTO): Promise<void> => {
    await axios.post("/api-gateway-proxy/auth-service/auth/register/customer",
    {user:{...user}, passwordConfirmation: user.password}
    );
}

export const createVoucher = async (voucher: VoucherDTO): Promise<void>=> {
    await axios.post("/api-gateway-proxy/voucher-service/voucher/create",{
        ...voucher
    })
}

export const editVoucher = async (voucher: VoucherDTO): Promise<void>=>{
    await axios.post("/api-gateway-proxy/voucher-service/voucher/update",{
        ...voucher
    })
}

export const getAllVoucher = async (): Promise<VoucherDTO[]>=>{
    const res = await axios.get("/api-gateway-proxy/voucher-service/voucher/list")
    const nwVouchers: VoucherDTO[] = []
    res.data.map((datum:any)=>{
        nwVouchers.push({
            voucherDiscount: datum.voucherDiscount,
            voucherName: datum.voucherName,
            voucherDescription: datum.voucherDescription,
            voucherQuota: datum.voucherQuota,
            voucherId: datum.voucherId
        })
    })
    return nwVouchers;
}

export const deleteVoucher = async (id: number): Promise<void>=> {
    await axios.post('/api-gateway-proxy/voucher-service/voucher/delete', null, {
        params: {
          id: id,
        },
      });
}

export const getVoucherById = async (id: number): Promise<VoucherDTO> => {
    const res = await axios.get("/api-gateway-proxy/voucher-service/voucher/id", {
        params: {
            id: id
        }
    })
    const data = res.data
    return {
        voucherId: data.voucherId,
        voucherDescription: data.voucherDescription,
        voucherName: data.voucherName,
        voucherQuota: data.voucherQuota,
        voucherDiscount: data.voucherDiscount
    }

}