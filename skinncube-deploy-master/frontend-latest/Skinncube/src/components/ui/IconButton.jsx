import React from 'react';
export const IconButton=({label,children,className='',...rest})=> (<button aria-label={label} className={`relative inline-flex items-center justify-center w-10 h-10 rounded-md bg-[var(--color-neutral-100)] hover:bg-[var(--color-neutral-200)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] ${className}`} {...rest}>{children}</button>);
export default IconButton;
