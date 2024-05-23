import { DTOCartItem } from "@/models/DTOCartItem";
import CartItemTile from "../components/CartItemTile";
import { DTOCartDeletionInformation } from "@/models/DTOCartDeletionInformation";
import { DTOCartItemUpdateInformation } from "@/models/DTOCartItemUpdateInformation";
import { deleteShoppingCartItemData, modifyShoppingCartData } from "@/api/service";
type CartListSectionProps = {
    list: DTOCartItem[],
    refresh: () => void,
    onHandleSelectItem: (id: string)=>void
    selectedItems: string[]
}
const CartListSection: React.FC<CartListSectionProps> = ({list, refresh, onHandleSelectItem, selectedItems}) => {
    return <div className="flex flex-col space-y-4 mt-4">
        {list.map((data: DTOCartItem)=>{
           

            return <CartItemTile 
                key={data.id + "cart"}
                cartItem={data}
                onChangeQuantity={
                    async function (item: DTOCartItemUpdateInformation | undefined): Promise<void> {
                        if (item) {
                            await modifyShoppingCartData(item);
                            refresh();
                        }
                    } }
                onRemove={async function (item: DTOCartDeletionInformation | undefined): Promise<void> {
                    if (item) {
                        await deleteShoppingCartItemData(item);
                        if(selectedItems.includes(item.productId)){
                            onHandleSelectItem(item.productId)
                        }
                        refresh();
                    }
                } } 
                isSelected={selectedItems.includes(data.productId)} 
                onSelect={function (productId: string): void {
                    onHandleSelectItem(productId)
                } }/>
        })}
    </div>
    
}

export default CartListSection