import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { fetchMedicines } from "../../../services/medicineService";
import { getAssetUrl } from "../../../utils/apiUtils"

const Items = ({ currentItems }) => {
  console.log(currentItems)
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item._id} className="w-full">
            <Product
              _id={item._id}
              productName={item.name}
              price={item.price}
              color={item.category.name}
              badge={item.badge}
              isShowList={true}
              isAnotherShowList={false}
              des={item.description}
              img={`${getAssetUrl()}/${item.images}`}
            />
          </div>
        ))}
    </>
  );
};

const Pagination = ({ itemsPerPage, selectedSubcategories }) => {
  const [items, setItems] = useState([]); // Store products
  const [totalCount, setTotalCount] = useState(0); // Total products count
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch products
  const fetchProducts = async (page, limit) => {
    setLoading(true);
    setError(null);
    try {
      const { data, meta } = await fetchMedicines({ page, limit });
      setItems(data); // Update products
      setTotalCount(meta.totalCount); // Update total count
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Effect to call fetchProducts when the component mounts or page changes
  useEffect(() => {
    fetchProducts(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const filteredItems = selectedSubcategories.length
    ? items.filter((item) =>
      selectedSubcategories.includes(item.subcategory?._id)
    )
    : items;

  // Pagination logic
  const pageCount = Math.ceil(totalCount / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1); // ReactPaginate is 0-based
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={filteredItems} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="Previous"
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
          forcePage={currentPage - 1}
        />
        <p className="text-base font-normal text-lightText">
          Showing {filteredItems.length} of {totalCount} products
        </p>
      </div>
    </div>
  );
};

export default Pagination;
