import React, { useState } from 'react';

type PengirimanSectionProps = {
  onSelectPengiriman: (pengiriman: string) => void;
};

const PengirimanSection: React.FC<PengirimanSectionProps> = ({ onSelectPengiriman }) => {
  const [selectedPengiriman, setSelectedPengiriman] = useState<string | null>(null);

  const handleSelectPengiriman = (pengiriman: string) => {
    setSelectedPengiriman(pengiriman);
    onSelectPengiriman(pengiriman);
  };

  return (
    <div className="w-full  mt-4 p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Pilih Metode Pengiriman</h2>
      <div className="flex flex-col space-y-4 text-black">
        <div>
          <input
            type="radio"
            id="jte"
            value="JTE"
            checked={selectedPengiriman === 'JTE'}
            onChange={() => handleSelectPengiriman('JTE')}
            className="mr-2 text-black"
          />
          <label htmlFor="jte">Pengiriman JTE</label>
        </div>
        <div>
          <input
            type="radio"
            id="siwuzz"
            value="SiWuzz"
            checked={selectedPengiriman === 'SiWuzz'}
            onChange={() => handleSelectPengiriman('SiWuzz')}
            className="mr-2 text-black"
          />
          <label htmlFor="siwuzz">Pengiriman SiWuzz</label>
        </div>
        <div>
          <input
            type="radio"
            id="gobek"
            value="Go-bek"
            checked={selectedPengiriman === 'Go-bek'}
            onChange={() => handleSelectPengiriman('Go-bek')}
            className="mr-2 text-black"
          />
          <label htmlFor="gobek">Pengiriman Go-bek</label>
        </div>
      </div>
    </div>
  );
};

export default PengirimanSection;
