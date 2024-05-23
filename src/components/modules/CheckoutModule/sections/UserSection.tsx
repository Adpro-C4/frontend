"use client";

import React from 'react';

type UserSectionProps = {
  name: string;
  email: string;
  phone: string;
};

const UserSection: React.FC<UserSectionProps> = ({ name, email, phone }) => {
  return (
    <div className="w-full mt-4 p-4">
      <div className="flex flex-col space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">Data Pengguna</h2>
        <div className="flex flex-col space-y-2">
          <div>
            <span className="font-semibold text-gray-600">Nama:</span>
            <span className="ml-2 text-black">{name}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-600">Email:</span>
            <span className="ml-2 text-black">{email}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-600">Nomor Telepon:</span>
            <span className="ml-2 text-black">{phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSection;
