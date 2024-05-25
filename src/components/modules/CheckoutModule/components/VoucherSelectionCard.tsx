"use client";

import { VoucherDTO } from '@/models/VoucherDTO';
import React from 'react';

interface VoucherCardProps {
  voucher: VoucherDTO;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const VoucherSelectionCard: React.FC<VoucherCardProps> = ({ voucher, isSelected, onSelect }) => {
  const handleCheckboxChange = () => {
    onSelect(voucher.voucherId!);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800 flex justify-between items-center">
          {voucher.voucherName}
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>
        <p className="text-gray-700 text-xs mb-4 line-clamp-3">
          {voucher.voucherDescription}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-indigo-600">
            Discount: {voucher.voucherDiscount * 100}%
          </div>
          <div className="text-sm text-gray-600">
            Quota: {voucher.voucherQuota}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherSelectionCard;