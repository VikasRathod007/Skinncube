import React from 'react';
export const Skeleton=({className=''})=> (<div className={`animate-pulse rounded-md bg-[var(--color-neutral-200)] ${className}`}/>);
export default Skeleton;
