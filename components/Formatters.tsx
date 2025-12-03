import React from 'react';

export const PercentChange: React.FC<{ value: number; className?: string }> = ({ value, className = '' }) => {
  const isUp = value > 0;
  const isZero = value === 0;
  
  let colorClass = 'text-trade-down';
  if (isUp) {
    colorClass = 'text-trade-up';
  } else if (isZero) {
    colorClass = 'text-trade-muted';
  }

  const sign = isUp ? '+' : '';
  
  return (
    <span className={`${colorClass} ${className} font-mono font-medium`}>
      {sign}{value.toFixed(2)}%
    </span>
  );
};

export const PriceDisplay: React.FC<{ value: number; className?: string; color?: boolean; change?: number }> = ({ value, className = '', color = false, change = 0 }) => {
    let colorClass = 'text-trade-text';
    
    if (color) {
        if (change > 0) {
            colorClass = 'text-trade-up';
        } else if (change === 0) {
            colorClass = 'text-trade-muted';
        } else {
            colorClass = 'text-trade-down';
        }
    }
    
    return (
        <span className={`${colorClass} ${className} font-mono`}>
            {value.toFixed(2)}
        </span>
    );
}