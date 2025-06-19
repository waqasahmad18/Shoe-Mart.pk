'use client';
import React from 'react';

interface Props {
  sizes?: string[] | string;
  selectedSize: string | null;
  onSelect: (size: string) => void;
}

export default function SizesSelector({ sizes, selectedSize, onSelect }: Props) {
  let arr: string[] = [];
  if (Array.isArray(sizes)) arr = sizes;
  else if (typeof sizes === 'string') arr = sizes.split(',').map(s => s.trim()).filter(Boolean);
  console.log('SizesSelector received:', sizes, 'Parsed:', arr);
  if (!arr || arr.length === 0) {
    return <div className="text-gray-400 text-sm">Not available</div>;
  }
  return (
    <div className="flex gap-2 flex-wrap">
      {arr.map((size) => (
        <button
          key={size}
          onClick={() => onSelect(size)}
          className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all duration-200 ${selectedSize === size ? 'border-yellow-400 bg-yellow-100' : 'border-gray-300 bg-white hover:border-yellow-400'}`}
        >
          {size}
        </button>
      ))}
    </div>
  );
} 