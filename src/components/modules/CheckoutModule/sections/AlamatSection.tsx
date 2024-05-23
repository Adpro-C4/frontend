"use client"

import React, { useState } from 'react';

type AlamatSectionProps = {
  onSubmitAlamat: (text: string) => void;
};

const AlamatSection: React.FC<AlamatSectionProps> = ({ onSubmitAlamat }) => {
  const [alamat, setAlamat] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleButtonClick = () => {
    if (alamat.trim()) {
      onSubmitAlamat(alamat);
      setIsSubmitted(true);
    }
  };

  const handleClear = () => {
    setAlamat('');
    onSubmitAlamat('')
    setIsSubmitted(false);
  };

  return (
    <div className="w-full  mt-4 p-4">
      <div className="flex flex-col space-y-4">
        <label className="text-lg font-semibold text-gray-700" htmlFor="alamat">
          Alamat Pengiriman
        </label>
        <textarea
          id="alamat"
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          className="p-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-pink-300 resize-none"
          placeholder="Masukkan alamat pengiriman"
          rows={4}
          disabled={isSubmitted}
        />
        <div className="flex space-x-4">
          <button
            onClick={handleButtonClick}
            className={`self-end px-4 py-2 bg-pink-500 text-white rounded-lg shadow-md transition-colors ${isSubmitted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600'}`}
            disabled={isSubmitted}
          >
            Tambahkan Alamat
          </button>
          {isSubmitted && (
            <button
              onClick={handleClear}
              className="self-end px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlamatSection;
