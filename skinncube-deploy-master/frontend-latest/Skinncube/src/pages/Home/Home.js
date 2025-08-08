import React from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Sale from "../../components/home/Sale/Sale";
import Testimonials from "../../components/home/Testimonials/Testimonials";
import YearProduct from "../../components/home/YearProduct/YearProduct";

const Home = () => {
  return (
    <div className="w-full mx-auto">
      <Banner />
      {/* <BannerBottom /> */}
      <div className="max-w-container mx-auto px-4">
        {/* <Sale /> */}
        <NewArrivals />
        {/* <BestSellers /> */}
        <YearProduct />
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;
