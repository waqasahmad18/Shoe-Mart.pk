'use client';
import React from 'react';

interface Props {
  colors?: string[] | string;
  selectedColor: string | null;
  onSelect: (color: string) => void;
}

export default function ColorsSelector({ colors, selectedColor, onSelect }: Props) {
  let arr: string[] = [];
  if (Array.isArray(colors)) arr = colors;
  else if (typeof colors === 'string') arr = colors.split(',').map(c => c.trim()).filter(Boolean);
  console.log('ColorsSelector received:', colors, 'Parsed:', arr);
  if (!arr || arr.length === 0) {
    return <div className="text-gray-400 text-sm">Not available</div>;
  }
  return (
    <div className="flex gap-2 flex-wrap">
      {arr.map((color) => (
        <button
          key={color}
          onClick={() => onSelect(color)}
          className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${selectedColor === color ? 'border-yellow-400 ring-2 ring-yellow-200' : 'border-gray-300'} bg-white flex items-center justify-center`}
          style={{ background: color.toLowerCase() }}
          title={color}
        >
          {selectedColor === color && <span className="block w-3 h-3 bg-white rounded-full border border-yellow-400"></span>}
        </button>
      ))}
    </div>
  );
} 