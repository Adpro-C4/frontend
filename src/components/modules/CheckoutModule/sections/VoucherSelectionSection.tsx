"use client";

import React, { useState } from 'react';
import { VoucherDTO } from '@/models/VoucherDTO';
import VoucherSelectionCard from '../components/VoucherSelectionCard';

type VoucherSelectionSectionProps = {
  vouchers: VoucherDTO[];
  onVoucherSelect: (selectedVoucher: number | null) => void;
};

const VoucherSelectionSection: React.FC<VoucherSelectionSectionProps> = ({ vouchers, onVoucherSelect }) => {
  const [selectedVoucher, setSelectedVoucher] = useState<number | null>(null);

  const handleSelectVoucher = (id: number) => {
    const newSelectedVoucher = selectedVoucher === id ? null : id;
    setSelectedVoucher(newSelectedVoucher);
    onVoucherSelect(newSelectedVoucher);
  };

  return (
    <div className="w-full mt-4 p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Pilih Voucher</h2>
      <div className="flex flex-wrap">
        {vouchers
          .filter((voucher) => voucher.voucherQuota > 0)
          .map((voucher) => (
            <VoucherSelectionCard
              key={voucher.voucherId}
              voucher={voucher}
              isSelected={selectedVoucher === voucher.voucherId}
              onSelect={handleSelectVoucher}
            />
          ))}
      </div>
      {selectedVoucher && (
        <div className="flex justify-end mt-4">
          <button
            onClick={() => handleSelectVoucher(selectedVoucher)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors"
          >
            Remove Voucher
          </button>
        </div>
      )}
    </div>
  );
};

export default VoucherSelectionSection;
