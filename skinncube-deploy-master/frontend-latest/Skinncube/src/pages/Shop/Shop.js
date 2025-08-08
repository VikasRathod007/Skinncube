import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Parse the subcategory from the query string
    const queryParams = new URLSearchParams(location.search);
    const subcategory = queryParams.get("subcategory");

    if (subcategory) {
      setSelectedSubcategories([subcategory]); // Initialize with the subcategory from the query
    }
  }, [location]);

  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  const handleSubcategoryChange = (subcategories) => {
    setSelectedSubcategories(subcategories); // Update selected subcategories
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav onSubcategoryChange={handleSubcategoryChange} />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
          <Pagination itemsPerPage={itemsPerPage} selectedSubcategories={selectedSubcategories} />
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;
