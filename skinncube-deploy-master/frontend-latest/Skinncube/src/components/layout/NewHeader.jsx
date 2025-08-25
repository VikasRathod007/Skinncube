import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../../redux/uiSlice';
import { IconButton } from '../ui/IconButton';
import { FiShoppingCart, FiUser, FiHeart, FiSearch } from 'react-icons/fi';
import { navBarList } from '../../constants';
import { logo as brandLogo } from '../../assets/images';
import { toast } from 'react-toastify';
import { selectUserInfo } from '../../pages/Account/authHandle/authSlice';

const NewHeader = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const products = useSelector(s => s.orebiReducer.products || []);
	const user = useSelector(selectUserInfo);
	const [search, setSearch] = useState('');

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		if(!search.trim()) return;
		// Navigate to shop with query param (integration with filtering can be added in next phase)
		navigate(`/shop?query=${encodeURIComponent(search.trim())}`);
	};

	const handleAccount = () => {
		if(user && user._id){
			navigate('/user-profile');
		} else {
			navigate('/signin');
		}
	};

	const handleWishlist = () => {
		// Placeholder until wishlist feature implemented
		toast.info('Wishlist coming soon');
	};

		return (
			<header className='sticky top-0 z-[var(--z-header)] bg-white/95 backdrop-blur border-b border-[var(--color-border)] shadow-sm'>
				<div className='w-full max-w-[1700px] mx-auto px-6 h-16 flex items-center justify-between gap-8'>
							<div className='flex items-center gap-8'>
								<Link to='/' className='flex items-center group' aria-label='SkinnCube Home'>
									<img
										src={brandLogo}
										alt='SkinnCube logo'
										className='h-9 w-auto transition-transform duration-200 group-hover:scale-105 select-none'
										draggable='false'
										loading='lazy'
									/>
								</Link>
					<nav className='hidden lg:flex items-center gap-4'>
						{navBarList.map(item => (
							<NavLink
								key={item._id}
								to={item.link}
								className={({ isActive }) => `text-sm px-2 py-1 rounded-md transition-colors ${isActive ? 'text-[var(--color-brand-primary)] font-medium' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
							>
								{item.title}
							</NavLink>
						))}
					</nav>
				</div>
				<div className='flex-1 hidden md:flex'>
					<form onSubmit={handleSearchSubmit} className='w-full relative'>
						<input
							aria-label='Search products'
							placeholder='Search products...'
							className='w-full h-10 rounded-md bg-[var(--color-neutral-100)] px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]'
							value={search}
							onChange={(e)=>setSearch(e.target.value)}
						/>
						<button type='submit' aria-label='Submit search' className='absolute top-1/2 -translate-y-1/2 right-3 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]'>
							<FiSearch />
						</button>
					</form>
				</div>
				<div className='flex items-center gap-2'>
					<IconButton label='Wishlist' onClick={handleWishlist}><FiHeart /></IconButton>
					<IconButton label='Account' onClick={handleAccount}><FiUser /></IconButton>
					<div className='relative'>
						<IconButton label='Cart' onClick={() => dispatch(toggleCart(true))}>
							<FiShoppingCart />
							{products.length > 0 && (
								<span className='absolute -top-1 -right-1 bg-[var(--color-brand-primary)] text-white text-[10px] font-medium px-1.5 py-[1px] rounded-full'>{products.length}</span>
							)}
						</IconButton>
					</div>
				</div>
			</div>
		</header>
	);
};

export default NewHeader;
