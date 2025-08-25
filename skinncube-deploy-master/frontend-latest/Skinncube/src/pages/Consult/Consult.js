import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Consult = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    const data = location?.state?.data || "Home";
    setPrevLocation(data);
  }, [location]);
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Consults" prevLocation={prevLocation} />
      <div className="pb-10">
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">Consulting Features Coming Soon</span>{" "}
          We’re excited to announce that our personalized consulting features at Skinncube are coming soon! 
          Stay tuned for expert guidance tailored to your skincare needs, 
          including one-on-one consultations, product recommendations, and ongoing support. 
          Your journey to healthier skin is just around the corner!
        </h1>
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Consult;
