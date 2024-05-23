export type DTOPurchaseInformation = {
    userId: string,
    voucherId: string | null,
    cartItems: string[],
    address: string,
    shippingMethod: string
}