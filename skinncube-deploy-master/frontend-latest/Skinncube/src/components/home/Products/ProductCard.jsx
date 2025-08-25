import React from 'react';
import { getAssetUrl } from '../../../utils/apiUtils';

const ProductCard = ({ item, onAdd }) => {
  if (!item) return null;
  const { _id, name, price, category, images } = item;
  return (
    <div className='group relative flex flex-col border rounded-md overflow-hidden bg-white hover:shadow-sm transition-shadow' aria-labelledby={`prod-title-${_id}`}>
      <div className='aspect-[4/5] w-full overflow-hidden bg-[var(--color-neutral-100)]'>
        <img
          src={images ? `${getAssetUrl()}/${images}` : 'https://via.placeholder.com/400x500?text=Product'}
          alt={name}
          className='h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105'
          loading='lazy'
          draggable='false'
        />
      </div>
      <div className='flex flex-col gap-1 p-3'>
        <h3 id={`prod-title-${_id}`} className='font-semibold text-sm line-clamp-2 text-[var(--color-text-primary)]' title={name}>{name}</h3>
        <p className='text-xs text-[var(--color-text-tertiary)]'>{category?.name || ''}</p>
        <div className='flex items-center justify-between mt-1'>
          <span className='font-medium text-sm'>Rs.{Number(price).toFixed(2)}</span>
          <button type='button' aria-label={`Add ${name} to cart`} onClick={() => onAdd?.(item)} className='text-xs px-2 py-1 rounded bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-primary-hover)] transition'>Add</button>
        </div>
      </div>
      <div className='pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition flex items-start justify-end p-2'>
        <button type='button' className='pointer-events-auto bg-white/90 backdrop-blur px-2 py-1 text-[10px] rounded shadow hover:bg-white'>View</button>
      </div>
    </div>
  );
};

export default ProductCard;
