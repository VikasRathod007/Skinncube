import React from 'react';
const base='inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';
const variants={ primary:'bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-primary-hover)] focus-visible:ring-[var(--color-brand-primary)]', outline:'border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-neutral-100)]', subtle:'bg-[var(--color-neutral-100)] text-[var(--color-text-primary)] hover:bg-[var(--color-neutral-200)]', danger:'bg-[var(--color-danger)] text-white hover:bg-[var(--color-danger-hover)] focus-visible:ring-[var(--color-danger)]'};
const sizes={ sm:'h-8 px-3 text-sm', md:'h-10 px-4 text-sm', lg:'h-12 px-6 text-base' };
export const Button=({variant='primary',size='md',className='',children,...rest})=> (<button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>{children}</button>);
export default Button;
