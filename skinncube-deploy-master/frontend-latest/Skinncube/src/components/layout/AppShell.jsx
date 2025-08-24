import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NewHeader from './NewHeader';
import CartDrawer from './CartDrawer';
import Breadcrumb from '../ui/Breadcrumb';

// Utility: apply a wider container for large displays while reducing side white space visually
// Using max-w-[1700px] in header already; here we introduce a slightly narrower readable width for content (1400px) and full-bleed option for home hero sections later.

const AppShell = () => {
	const location = useLocation();
	const showBreadcrumb = location.pathname !== '/';
	const isHome = location.pathname === '/';
	return (
		<div className='min-h-screen flex flex-col bg-[var(--color-bg-base)] text-[var(--color-text-primary)]'>
			<NewHeader />
			<div className={`flex-1 w-full mx-auto px-4 pt-4 pb-16 ${isHome ? 'max-w-[1500px]' : 'max-w-[1350px]'}`}> 
				{showBreadcrumb && <Breadcrumb />}
				<Outlet />
			</div>
			<footer className='border-t border-[var(--color-border)] mt-auto'>
				<div className='w-full mx-auto px-4 py-8 grid gap-6 md:grid-cols-4 text-sm max-w-[1350px]'>
					<div>
						<h3 className='font-semibold mb-3'>Shop</h3>
						<ul className='space-y-1 text-[var(--color-text-secondary)]'>
							<li><a href='/shop' className='hover:text-[var(--color-text-primary)]'>All Products</a></li>
							<li><a href='/consult' className='hover:text-[var(--color-text-primary)]'>Consult</a></li>
							<li><a href='/offer' className='hover:text-[var(--color-text-primary)]'>Offers</a></li>
						</ul>
					</div>
					<div>
						<h3 className='font-semibold mb-3'>Resources</h3>
						<ul className='space-y-1 text-[var(--color-text-secondary)]'>
							<li><a href='/blog' className='hover:text-[var(--color-text-primary)]'>Blog</a></li>
							<li><a href='/about' className='hover:text-[var(--color-text-primary)]'>About</a></li>
							<li><a href='/contact' className='hover:text-[var(--color-text-primary)]'>Contact</a></li>
						</ul>
					</div>
					<div>
						<h3 className='font-semibold mb-3'>Support</h3>
						<ul className='space-y-1 text-[var(--color-text-secondary)]'>
							<li>Help Center</li>
							<li>Shipping</li>
							<li>Returns</li>
						</ul>
					</div>
					<div>
						<h3 className='font-semibold mb-3'>Stay Updated</h3>
						<form className='space-y-2'>
							<input type='email' placeholder='Email address' className='w-full h-10 px-3 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-alt)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] text-sm' />
							<button type='submit' className='w-full h-10 rounded-md bg-[var(--color-brand-primary)] text-white text-sm font-medium hover:bg-[var(--color-brand-primary-hover)]'>Subscribe</button>
						</form>
					</div>
				</div>
				<div className='border-t border-[var(--color-border)] py-4 text-center text-xs text-[var(--color-text-tertiary)]'>© {new Date().getFullYear()} SkinnCube. All rights reserved.</div>
			</footer>
			<CartDrawer />
		</div>
	);
};

export default AppShell;
