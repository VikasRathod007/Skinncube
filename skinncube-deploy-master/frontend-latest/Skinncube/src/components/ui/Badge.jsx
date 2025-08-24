import React from 'react';
export const Badge=({children,tone='accent',className=''})=>{const toneMap={accent:'bg-[var(--color-brand-accent)] text-white',neutral:'bg-[var(--color-neutral-200)] text-[var(--color-text-primary)]',success:'bg-[var(--color-success)] text-white',danger:'bg-[var(--color-danger)] text-white'};return <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${toneMap[tone]} ${className}`}>{children}</span>;};
export default Badge;
