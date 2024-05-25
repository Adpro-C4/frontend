import { ProductCardProps } from "@/components/elements/ProductCard";
import axios from "axios";
import { UserDTO } from "@/models/UserDTO";

import { VoucherDTO } from "@/models/VoucherDTO";
import { Product } from "@/models/Product";
import { DTOCartItemUpdateInformation } from "@/models/DTOCartItemUpdateInformation";
import { DTOCartItem } from "@/models/DTOCartItem";
import { DTOCartDeletionInformation } from "@/models/DTOCartDeletionInformation";
import { DTOPurchaseInformation } from "@/models/DTOPurchaseInformation";

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
        quantity: data.quantity,
    }

  };

export const createProduct = async (product: Product): Promise<void> => {
    await axios.post("api-gateway-proxy/product-service/product/create", product);
  };
  
export const updateProduct = async (product: Product): Promise<void> => {
    await axios.post("api-gateway-proxy/product-service/product/edit", product);
  };
  
export const deleteProduct = async (product: Product): Promise<void> => {
    await axios.post("api-gateway-proxy/product-service/product/delete", product);
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


    const user: UserDTO = {...res.data.data.user, role: "CUSTOMER"}
    console.log(user.id);
    return user
}

export const loginAsAdmin = async (username: string, password: string) : Promise<UserDTO>=>{
    const res = await axios.post("/api-gateway-proxy/auth-service/auth/login/admin",{
        username: username,
        password: password
    })

    const user: UserDTO = {...res.data.data.user, role: "ADMIN"}
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

export const getShoppingcartData = async (id: string) => {
    const res = await axios.get("/api-gateway-proxy/purchase-service/shopping-cart/data/"+id)
    const shoppingCartItems: DTOCartItem[] = []
    console.log(res.data)
    const shoppingCart = res.data.data.shoppingCart;
    shoppingCart.map((data:any)=>{
        shoppingCartItems.push({
            ...data
        })
    })
    return shoppingCartItems
}

export const modifyShoppingCartData = async (data: DTOCartItemUpdateInformation) => {
    await axios.post("/api-gateway-proxy/purchase-service/shopping-cart/update",
        {
            ...data
        }
    )
}

export const deleteShoppingCartItemData = async (data: DTOCartDeletionInformation) => {
    try {
      const response = await axios.post(`/api-gateway-proxy/purchase-service/shopping-cart/delete`, {
          userId: data.userId,
          productId: data.productId
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting shopping cart item:', error);
      throw error;
    }
  };

export const createPurchaseRequest = async (data: DTOPurchaseInformation) => {
    console.log(data)
    await axios.post("/api-gateway-proxy/purchase-service/order/create",
        {...data}
    )
}