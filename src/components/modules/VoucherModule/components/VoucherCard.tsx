"use client"
import { VoucherDTO } from '@/models/VoucherDTO';
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';



interface VoucherCardProps {
  voucher: VoucherDTO;
  onDelete: (id?: number) => void;
}

const VoucherCard: React.FC<VoucherCardProps> = ({ voucher, onDelete }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800 flex justify-between items-center">
          {voucher.voucherName}
          <div className="flex space-x-4">
            <a href={`/voucher/edit/${voucher.voucherId}`} className="text-blue-500 hover:text-blue-700">
              <FaEdit />
            </a>
            <button
              onClick={() => onDelete(voucher.voucherId)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
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

export default VoucherCard;
