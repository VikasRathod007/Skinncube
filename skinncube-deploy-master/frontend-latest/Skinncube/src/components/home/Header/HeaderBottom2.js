import React, { useState, useEffect } from "react";
import { MdClose, MdArrowDropDown } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import "./HeaderBottom2.css";
import { fetchCategories } from "../../../services/categoryService";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [categories, setCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [extraCategories, setExtraCategories] = useState([]);
  const navigate = useNavigate();
  const [closeTimeout, setCloseTimeout] = useState(null); // For delayed close

  const handleSubcategoryClick = (subcategoryId) => {
    navigate(`/shop?subcategory=${subcategoryId}`);
  };

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      const fetchedCategories = data.data;
      const main = fetchedCategories.slice(0, 6);
      const extra = fetchedCategories;
      setCategories(fetchedCategories);
      setMainCategories(main);
      setExtraCategories(extra);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDropdownToggle = (index) => {
    // Clear any existing timeout if the dropdown is toggled
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setActiveDropdown(index);
  };

  const closeDropdown = () => {
    // Add a delay before closing the dropdown
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // Adjust delay (300ms in this case)
    setCloseTimeout(timeout);
  };

  // const navItems = [
  //   {
  //     title: "Brands",
  //     dropdown: ["Brand 1", "Brand 2", "Brand 3", "Brand 4", "Brand 5"],
  //   },
  //   {
  //     title: "Skin Care",
  //     dropdown: [
  //       {
  //         title: "Face Care",
  //         items: ["Cleansers", "Moisturizers", "Serums & Treatments", "Masks & Exfoliants"],
  //       },
  //       {
  //         title: "Acne Solutions",
  //         items: ["Acne Cleansers", "Spot Treatments", "Pore Minimizers"],
  //       },
  //       {
  //         title: "Anti-Aging",
  //         items: ["Wrinkle Creams", "Firming Serums", "Collagen Boosters", "Retinol Treatments"],
  //       },
  //       {
  //         title: "Sun Care",
  //         items: ["SPF Sunscreens", "Tinted Sunscreens", "Mineral Sunscreens", "After-Sun Soothing Care"],
  //       },
  //       {
  //         title: "Body Care",
  //         items: ["Moisturizers", "Exfoliators", "Hand & Foot Care", "Targeted Treatments"],
  //       },
  //     ],
  //   },
  //   {
  //     title: "Hair Care",
  //     dropdown: [
  //       {
  //         title: "Shampoos",
  //         items: ["Anti-Hair Fall", "Anti-Dandruff", "Dry & Damaged Hair"],
  //       },
  //       {
  //         title: "Conditioners",
  //         items: ["Moisturizing Conditioners", "Protein Conditioners"],
  //       },
  //       {
  //         title: "Treatments & Serums",
  //         items: ["Strengthening Serums", "Hair Growth Serums", "Scalp Treatments"],
  //       },
  //     ],
  //   },
  //   {
  //     title: "Shop All",
  //     dropdown: [],
  //   },
  //   {
  //     title: "Specialized Treatments",
  //     dropdown: [
  //       "Pigmentation & Brightening",
  //       "Acne Treatments",
  //       "Scar & Stretch Mark Solutions",
  //       "Eczema & Psoriasis Care",
  //       "Rosacea Treatments",
  //       "Hairfall Solutions"
  //     ],
  //   },
  //   {
  //     title: "Baby Care",
  //     dropdown: ["Baby Lotions", "Gentle Cleansers", "Diaper Rash Creams"],
  //   },
  //   {
  //     title: "More",
  //     dropdown: ["Fragrance-Free Products", "Tablets & Capsules", "Antiperspirants", "Tools & Accessories"],
  //   },
  // ];

  return (
    <div className="w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200 navColor header2">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <div className="flex items-center justify-center h-full">
          <div className="justify-content-center">
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center w-auto z-50 p-0 gap-6"
              >
                {mainCategories.map(({ name, sub_cat }, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => handleDropdownToggle(index)}
                    onMouseLeave={() => closeDropdown()}
                  >
                    <button className="nav-link">
                      {name}
                      {sub_cat.length > 0 && <MdArrowDropDown className="ml-1" />}
                    </button>
                    {activeDropdown === index && sub_cat.length > 0 && (
                      <motion.ul
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bg-white border border-gray-300 shadow-lg mt-2 w-64 text-left max-h-48 overflow-y-auto"
                      >
                        {sub_cat.map(({name: subName, _id:subid}, subIndex) =>
                            <li
                              key={subIndex}
                              className="px-4 py-2 text-sm hover:bg-gray-100 hover:text-black cursor-pointer border-b border-gray-300"
                              onClick={() => handleSubcategoryClick(subid)}
                            >
                              {subName}
                            </li>                          
                        )}
                      </motion.ul>
                    )}
                  </div>
                ))}

            {/* "More" Dropdown for extra categories */}
            {extraCategories.length > 0 && (
                  <div
                    className="relative"
                    onMouseEnter={() => handleDropdownToggle("more")}
                    onMouseLeave={closeDropdown}
                  >
                    <button className="nav-link">
                      More
                      <MdArrowDropDown className="ml-1" />
                    </button>
                    {activeDropdown === "more" && (
                      <motion.ul
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bg-white border border-gray-300 shadow-lg mt-2 w-64 text-left max-h-48 overflow-y-auto"
                      >
                        {extraCategories.map(({ name, sub_cat }, index) => (
                          <li key={index} className="px-4 py-2 border-b border-gray-300">
                            <p className="font-semibold">{name}</p>
                            {sub_cat.length > 0 && (
                              <ul className="pl-4">
                                {sub_cat.map(({name: subName, _id:subid}, subIndex) => (
                                  <li
                                    key={subIndex}
                                    className="py-1 hover:bg-gray-100 hover:text-black cursor-pointer"
                                    onClick={() => handleSubcategoryClick(subid)}
                                  >
                                    {subName}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </div>
                )}
              </motion.ul>
            )}

            <HiMenuAlt2
              onClick={() => setSidenav(!sidenav)}
              className="inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-4"
            />
            {sidenav && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[80%] h-full relative"
                >
                  <div className="w-full h-full bg-primeColor p-6">
                    <ul className="text-gray-200 flex flex-col gap-2">
                      {categories.map(({ name }, index) => (
                        <li
                          key={index}
                          className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline hover:text-white"
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span
                    onClick={() => setSidenav(false)}
                    className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                  >
                    <MdClose />
                  </span>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;