import { ProductCardProps } from "@/components/elements/ProductCard";
import axios from "axios";
import { UserDTO } from "@/models/UserDTO";

import { VoucherDTO } from "@/models/VoucherDTO";
import { Product } from "@/models/Product";

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

export const getProductById = async (id: number): Promise<Product> => {
    const response = await axios.get(`api-gateway-proxy/product-service/product/${id}`);
    const data = response.data
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        discount: data.discount,
        brand: data.brand,
        category: data.category,
        image: data.image,
        quantity: data.quantity
    }

  };

export const createProduct = async (product: Product): Promise<Product> => {
    const response = await axios.post(`api-gateway-proxy/product-service/create`, product);
    return response.data;
  };
  
export const updateProduct = async (product: Product): Promise<void> => {
    await axios.post(`api-gateway-proxy/product-service/edit`, product);
  };
  
export const deleteProduct = async (product: Product): Promise<void> => {
    await axios.post(`api-gateway-proxy/product-service/delete`, product);
  };



export const register = async (user: UserDTO): Promise<void> => {
    await axios.post("/api-gateway-proxy/auth-service/auth/register/customer",
    {user:{...user}, passwordConfirmation: user.password}
    );
}

export const loginAsCustomer = async (username: string, password: string) : Promise<UserDTO>=>{
    const res = await axios.post("/api-gateway-proxy/auth-service/auth/login/customer",{
        username: username,
        password: password
    })

    const user: UserDTO = {...res.data.user, role: "CUSTOMER"}
    console.log(user.id);
    return user
}

export const loginAsAdmin = async (username: string, password: string) : Promise<UserDTO>=>{
    const res = await axios.post("/api-gateway-proxy/auth-service/auth/login/admin",{
        username: username,
        password: password
    })

    const user: UserDTO = {...res.data.user, role: "ADMIN"}
    console.log(user.id);

    return user
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