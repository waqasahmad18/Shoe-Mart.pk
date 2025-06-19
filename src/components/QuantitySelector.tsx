import React from 'react';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export default function QuantitySelector({ value, onChange, min = 1, max = 10, className = "" }: QuantitySelectorProps) {
  return (
    <div className={`flex items-center gap-2 mt-2 ${className}`}>
      <button
        type="button"
        className="w-8 h-8 rounded-full bg-gray-200 text-lg font-bold flex items-center justify-center disabled:opacity-50"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
      >
        -
      </button>
      <span className="w-8 text-center font-semibold text-lg">{value}</span>
      <button
        type="button"
        className="w-8 h-8 rounded-full bg-gray-200 text-lg font-bold flex items-center justify-center disabled:opacity-50"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
} 