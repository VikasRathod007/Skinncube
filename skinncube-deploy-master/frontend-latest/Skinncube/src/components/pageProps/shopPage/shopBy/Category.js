import React, { useState, useEffect } from "react";
import { ImPlus, ImMinus } from "react-icons/im";
import NavTitle from "./NavTitle";
import { fetchCategories } from "../../../../services/categoryService";

const Category = ({ onSubcategoryChange }) => {
  const [openCategory, setOpenCategory] = useState(null);
  const [categories1, setCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [error, setError] = useState(null);

  const loadCategories = async () => {
    try {
      const categoryData = await fetchCategories();
      setCategories(categoryData.data); // Set categories state
    } catch (error) {
      setError(error.message); // Handle error if the fetch fails
    }
  };

  useEffect(() => {    
    loadCategories();    
  }, []);

  const toggleSubCategory = (id) => {
    if (openCategory === id) {
      setOpenCategory(null);
    } else {
      setOpenCategory(id);
    }
  };
  
  const handleCheckboxChange = (subcategoryId) => {
    const updatedSelectedSubCategories = selectedSubCategories.includes(subcategoryId)
      ? selectedSubCategories.filter((id) => id !== subcategoryId)
      : [...selectedSubCategories, subcategoryId];

    setSelectedSubCategories(updatedSelectedSubCategories);
    onSubcategoryChange(updatedSelectedSubCategories); // Pass updated subcategories to parent
    console.log(updatedSelectedSubCategories);
    
  };

  return (
    <div className="w-full">
      <NavTitle title="Categories" icons={false} />
      <div>
      {error && <p className="text-red-500">{error}</p>}
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">

          {categories1.map(({ _id, name, sub_cat }) => (
            <li key={_id} className="border-b-[1px] border-b-[#F0F0F0] pb-2">
              <div className="flex items-center justify-between">
                {/* Category title in bold */}
                <span className="font-bold">{name}</span>
                <span
                  onClick={() => toggleSubCategory(_id)}
                  className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                >
                  {openCategory === _id ? <ImMinus /> : <ImPlus />}
                </span>
              </div>
              {openCategory === _id && (
                <ul className="pl-4 mt-2">
                  {sub_cat.map((sub) => (
                    <li key={sub._id} className="py-1 flex items-center text-[#767676]">
                      {/* Checkbox for subcategory */}
                      <input
                        type="checkbox"
                        className="mr-2 w-4 h-4"
                        id={`subcategory-${_id}-${sub._id}`}
                        checked={selectedSubCategories.includes(sub._id)} // Set checked state based on selection
                        onChange={() => handleCheckboxChange(sub._id)} // Update selected subcategories
                      />
                      <label htmlFor={`subcategory-${_id}-${sub._id}`}>
                        {sub.name}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
