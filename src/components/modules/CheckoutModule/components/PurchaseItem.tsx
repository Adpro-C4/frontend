import React from 'react';

interface PurchaseItemProps {
  name: string;
  price: number;
  quantity: number;
}

const PurchaseItem: React.FC<PurchaseItemProps> = ({ name, price, quantity }) => {
  return (
    <div className="bg-pink-600 p-4 rounded-md shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-700 mb-2">Price: ${price}</p>
      <p className="text-gray-700 mb-2">Quantity: {quantity}</p>
      <p className="text-gray-700">Total: ${price * quantity}</p>
    </div>
  );
};

export default PurchaseItem;