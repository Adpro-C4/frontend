import { DTOCartDeletionInformation } from '@/models/DTOCartDeletionInformation';
import { DTOCartItem } from '@/models/DTOCartItem';
import { DTOCartItemUpdateInformation } from '@/models/DTOCartItemUpdateInformation';
import { UserDTO } from '@/models/UserDTO';
import React from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';

interface CartItemProps {
  cartItem: DTOCartItem;
  isSelected: boolean;
  onSelect: (productId: string) => void;
  onChangeQuantity: (item: DTOCartItemUpdateInformation | undefined) => void;
  onRemove: (item: DTOCartDeletionInformation | undefined) => void;
}

const CartItemTile: React.FC<CartItemProps> = ({ cartItem, isSelected, onSelect, onChangeQuantity, onRemove }) => {
  const user: UserDTO | undefined = useSelector((state: any) => state.auth.user);

  const handleUpdate = (quantity: number): DTOCartItemUpdateInformation | undefined =>
    user
      ? {
          userId: user!.id!.toString(),
          name: cartItem.name,
          price: cartItem.price.toString(),
          productId: cartItem.productId,
          quantity: quantity.toString(),
        }
      : undefined;

  return (
    <div className={`flex items-center p-4 bg-gradient-to-r from-pink-500 to-blue-400 text-white shadow-lg rounded-lg mb-4  ${isSelected ? 'border-4 border-green-500' : ''}`}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect(cartItem.productId)}
        className="mr-4 text-lg"
      />
      <div className="flex-grow">
        <h2 className="text-xl font-bold">{cartItem.name}</h2>
      </div>
      <div className="flex items-center space-x-4">
        {cartItem.quantity === 1 ? (
          <button onClick={() => onRemove(handleUpdate(0))} className="text-white hover:text-gray-200">
            <FaTrash />
          </button>
        ) : (
          <button onClick={() => onChangeQuantity(handleUpdate(cartItem.quantity - 1))} className="text-white hover:text-gray-200">
            <FaMinus />
          </button>
        )}
        <p className="text-lg">{cartItem.quantity}</p>
        <button onClick={() => onChangeQuantity(handleUpdate(cartItem.quantity + 1))} className="text-white hover:text-gray-200">
          <FaPlus />
        </button>
      </div>
      <div className="text-right ml-4">
        <p className="text-2xl font-semibold">Rp.{cartItem.price.toFixed(0)}</p>
      </div>
    </div>
  );
};

export default CartItemTile;


