import React, { useEffect, useState, useCallback } from "react";
import ReactPaginate from "react-paginate";
import { useSearchParams } from 'react-router-dom';
import { fetchMedicines } from "../../../services/medicineService";
import ProductCard from '../../home/Products/ProductCard';
import ProductCardSkeleton from '../../home/Products/ProductCardSkeleton';

const SKELETON_COUNT = 9;

const Pagination = ({ itemsPerPage, selectedSubcategories }) => {
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';

  useEffect(()=>{
    const p = Number(searchParams.get('page'));
    if(p && p !== currentPage) setCurrentPage(p);
  },[searchParams,currentPage]);

  const buildQuery = useCallback((page,limit)=>{
    const q = { page, limit };
    if(searchTerm) q.search = searchTerm;
    if(sort) q.sort = sort;
    if(selectedSubcategories?.length) q.subcategories = selectedSubcategories.join(',');
    return q;
  },[searchTerm, sort, selectedSubcategories]);

  const fetchProducts = useCallback(async(page,limit)=>{
    setLoading(true); setError(null);
    try {
      const { data, meta } = await fetchMedicines(buildQuery(page,limit));
      setItems(Array.isArray(data)? data : []);
      setTotalCount(meta?.totalCount || data.length || 0);
    } catch(err){
      setError(err?.message || 'Failed to fetch products');
    } finally { setLoading(false);} 
  },[buildQuery]);

  useEffect(()=>{ fetchProducts(currentPage, itemsPerPage); },[currentPage, itemsPerPage, fetchProducts]);

  const filteredItems = selectedSubcategories?.length ? items.filter(i=> selectedSubcategories.includes(i.subcategory?._id)) : items;
  const pageCount = Math.max(1, Math.ceil((totalCount || filteredItems.length)/itemsPerPage));

  const handlePageClick = (e) => {
    const newPage = e.selected + 1;
    setCurrentPage(newPage);
    searchParams.set('page', String(newPage));
    setSearchParams(searchParams, { replace:true });
    window.scrollTo({top:0, behavior:'smooth'});
  };

  const handleAddToCart = (item) => {
    console.log('Add to cart', item._id);
  };

  return (
    <div>
      {error && <div className='mb-6 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700'>{error}</div>}
      {loading ? (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {Array.from({length:SKELETON_COUNT}).map((_,i)=>(<ProductCardSkeleton key={i}/>))}
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {filteredItems.map(item => <ProductCard key={item._id} item={item} onAdd={handleAddToCart} />)}
          {!filteredItems.length && <div className='col-span-full py-16 text-center text-sm text-[var(--color-text-secondary)]'>No products found{searchTerm?` for "${searchTerm}"`:''}.</div>}
        </div>
      )}
      <div className='flex flex-col md:flex-row justify-center md:justify-between items-center mt-8'>
        <ReactPaginate
          breakLabel='...'
          nextLabel='Next'
          previousLabel='Prev'
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          forcePage={currentPage - 1}
          containerClassName='flex gap-2 text-sm font-medium'
          pageLinkClassName='inline-flex min-w-[34px] h-9 items-center justify-center rounded border px-2 hover:bg-[var(--color-neutral-100)]'
          previousLinkClassName='inline-flex h-9 items-center px-3 rounded border hover:bg-[var(--color-neutral-100)]'
          nextLinkClassName='inline-flex h-9 items-center px-3 rounded border hover:bg-[var(--color-neutral-100)]'
          activeLinkClassName='bg-[var(--color-brand-primary)] text-white border-[var(--color-brand-primary)]'
          disabledLinkClassName='opacity-40 cursor-not-allowed'
        />
        <p className='mt-6 md:mt-0 text-xs text-[var(--color-text-tertiary)]'>Showing {filteredItems.length} of {totalCount || filteredItems.length} products</p>
      </div>
    </div>
  );
};

export default Pagination;
