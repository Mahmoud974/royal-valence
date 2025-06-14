import React from 'react'
import Image from "next/image";
import { CircleX } from 'lucide-react';

export default function Artwork() {
  return (
    <div className="relative w-fit  ">
     
      <button
        className="absolute top-1 right-1 text-red-600 hover:text-red-800 cursor-pointer z-10"
        title="Supprimer"
      >
        <CircleX size={20} />
      </button>

      
      <div className="flex flex-col items-center bg-white rounded shadow p-2 ">
        <Image
          width={74}
          height={74}
          src="/burger.jpg"
          alt="Le building"
          className="w-16 h-16 object-cover rounded-full"
        />
        <div className="text-center mt-2">
          <p className="text-md font-bold">Le building</p>
          <p className="text-xs text-gray-500">XL</p>
          <p className="text-orange-500 font-bold text-sm mt-1">30 €</p>
        </div>
      </div>
    </div>
  );
}
