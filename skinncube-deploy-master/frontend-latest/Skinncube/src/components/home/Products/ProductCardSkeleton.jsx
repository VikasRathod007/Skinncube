import React from 'react';

const ProductCardSkeleton = () => (
  <div className='animate-pulse flex flex-col border rounded-md overflow-hidden'>
    <div className='aspect-[4/5] w-full bg-[var(--color-neutral-100)]' />
    <div className='p-3 space-y-2'>
      <div className='h-3 w-3/4 bg-[var(--color-neutral-100)] rounded' />
      <div className='h-3 w-1/2 bg-[var(--color-neutral-100)] rounded' />
      <div className='h-4 w-1/3 bg-[var(--color-neutral-200)] rounded mt-2' />
    </div>
  </div>
);

export default ProductCardSkeleton;
