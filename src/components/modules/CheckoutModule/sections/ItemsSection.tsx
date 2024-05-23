import { DTOCartItem } from "@/models/DTOCartItem";
import PurchaseItem from "../components/PurchaseItem";

interface PurchaseItemSectionProps {
    cartItems: DTOCartItem[];
  }
  
  const PurchaseItemSection: React.FC<PurchaseItemSectionProps> = ({ cartItems }) => {
    return (
        <div className="w-full p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Items to Buy</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {cartItems.map((cartItem, index) => (
              <PurchaseItem key={index + "cart-item"} 
              quantity={cartItem.quantity}
              name={cartItem.name}
              price={cartItem.price}/>
            ))}
          </div>
        </div>
      );
  };
  
  export default PurchaseItemSection;