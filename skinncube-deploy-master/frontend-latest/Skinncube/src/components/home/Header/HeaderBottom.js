import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { paginationItems } from "../../../constants";
import { logoutUserAsync, selectLoggedInUser, selectUserInfo } from "../../../pages/Account/authHandle/authSlice";
import { toast } from "react-toastify";
import { fetchCart } from "../../../redux/orebiSlice";


const HeaderBottom = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();
  const user = useSelector(selectUserInfo)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
        setShowUser(false); // Close dropdown if clicking outside
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = paginationItems.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  useEffect(() => {
    if (showUser) {
      document.body.style.overflow = "hidden"; // Prevent body scroll when dropdown is open
    } else {
      document.body.style.overflow = "auto"; // Restore body scroll
    }
  }, [showUser]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserAsync());
      toast.success("Logged out successfully!");
      navigate("/signin");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
  };

  const handleProfileClick = () => {
    if (user && user.role) {
      const role = String(user.role).toUpperCase();
      if (role === "ADMIN" || role === "SUPERADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/user-profile");
      }
    } else {
      navigate("/user-profile");
    }
    setShowUser(false);
  };

  return (
    <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-200 sticky top-0 z-50">
      <div className="max-w-container mx-auto px-4">
        <Flex className="flex items-center justify-between h-full">
          <div className="flex items-center gap-2">
            <div onClick={() => setShow(!show)} className="flex items-center gap-2 cursor-pointer group">
              <HiOutlineMenuAlt4 className="text-2xl group-hover:text-primeColor duration-300" />
              <p className="text-[14px] font-normal group-hover:text-primeColor duration-300">
                All Categories
              </p>
            </div>
            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-14 left-0 z-50 bg-primeColor w-auto h-auto p-4"
              >
                <Link to="/shop">
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Shop
                  </li>
                </Link>
                <Link to="/about">
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    About
                  </li>
                </Link>
                <Link to="/contact">
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Contact
                  </li>
                </Link>
                <Link to="/consult">
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Consult
                  </li>
                </Link>
                <Link to="/blog">
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Blog
                  </li>
                </Link>
              </motion.ul>
            )}
          </div>
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Search your products here"
            />
            <FaSearch className="w-5 h-5" />
            {searchQuery && (
              <div className="w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer">
                {filteredProducts.map((item) => (
                  <div
                    onClick={() => {
                      navigate(`/product/${item.productName.toLowerCase().split(" ").join("")}`, {
                        state: { item: item },
                      });
                      setShowSearchBar(true);
                      setSearchQuery("");
                    }}
                    key={item._id}
                    className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                  >
                    <img className="w-24" src={item.img} alt="productImg" />
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-lg">{item.productName}</p>
                      <p className="text-xs">{item.des}</p>
                      <p className="text-sm">
                        Price:{" "}
                        <span className="text-primeColor font-semibold">Rs.{item.price}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div onClick={() => setShowUser(!showUser)} className="flex" ref={ref}>
              <FaUser />
              <FaCaretDown />
            </div>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 right-0 lg:right-10 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6 shadow-lg"
              >
                {!user && (<><Link to="/signin">
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Login
                  </li>
                </Link><Link onClick={() => setShowUser(false)} to="/signup">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      Sign Up
                    </li>
                  </Link></>)
                }
                {user && String(user.role || '').toUpperCase() !== "USER" && (<>
                  <Link onClick={() => setShowUser(false)} to="/dashboard">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      Dashboard
                    </li>
                  </Link>
                </>)}


                {user && (<>
                  <div onClick={handleProfileClick}>
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      Profile
                    </li>
                  </div>
                  <button onClick={handleLogout}>
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      Logout
                    </li>
                  </button>
                </>)}
              </motion.ul>
            )}
            <Link to="/cart">
              <div className="relative">
                <FaShoppingCart />
                <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                  {products.length > 0 ? products.length : 0}
                </span>
              </div>
            </Link>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
