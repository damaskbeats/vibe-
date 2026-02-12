
import React from 'react';
import { MenuItem } from '../types';

interface MenuCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
  isRecommended?: boolean;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onAdd, isRecommended }) => {
  const currentPrice = item.isHappyHour && item.discountPrice ? item.discountPrice : item.price;
  const originalPrice = item.price;

  return (
    <div className={`relative group p-4 bg-cream rounded-organic floating-paper border border-white/40 ${isRecommended ? 'ring-2 ring-forest/20' : ''}`}>
      <div className="absolute top-3 left-6 z-10 flex flex-col gap-1.5">
        {isRecommended && (
          <div className="bg-forest text-oat px-3 py-1 rounded-full text-xs font-accent italic shadow-sm">
            Barista's Choice
          </div>
        )}
        {item.isHappyHour && (
          <div className="bg-clay text-espresso px-3 py-1 rounded-full text-xs font-serif italic font-bold shadow-sm tracking-tighter">
            Happy Hour
          </div>
        )}
      </div>
      
      <div className="overflow-hidden rounded-2xl mb-4 aspect-square">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-serif text-xl font-semibold text-espresso">{item.name}</h3>
          <div className="flex flex-col items-end">
            <span className="font-accent text-moss font-bold text-lg">R{currentPrice.toFixed(2)}</span>
            {item.isHappyHour && (
              <span className="text-[10px] text-espresso/30 line-through font-medium">R{originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
        <p className="text-espresso/70 text-sm line-clamp-2 leading-relaxed italic h-10">
          {item.description}
        </p>
        <button 
          onClick={() => onAdd({ ...item, price: currentPrice })}
          className="w-full mt-4 py-3 bg-forest text-oat rounded-full text-sm font-serif tracking-wide italic hover:bg-espresso hover:shadow-[0_8px_20px_-6px_rgba(45,27,8,0.4)] hover:-translate-y-0.5 transition-all active:scale-95 active:translate-y-0 duration-300 border border-transparent hover:border-white/20"
        >
          Add to Tray
        </button>
      </div>
    </div>
  );
};
