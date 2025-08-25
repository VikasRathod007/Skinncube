import React from 'react';
export const ProgressBar=({value=0,max=100,className=''})=>{const pct=Math.min(100,Math.round((value/max)*100));return(<div className={`w-full h-2 bg-[var(--color-neutral-200)] rounded-full overflow-hidden ${className}`}> <div className='h-full bg-[var(--color-brand-primary)] transition-[width] duration-300' style={{width:pct+'%'}}/></div>);};
export default ProgressBar;
