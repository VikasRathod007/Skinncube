import React from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
} from "../../../assets/images/index";

const BestSellers = () => {
  return (
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        <Product
          _id="1013"
          img={"https://images.pexels.com/photos/5632330/pexels-photo-5632330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
          productName="Acne Removers"
          price="25.00"
          color="Mixed"
          isShowList={true}
          isAnotherShowList={false}
          badge={true}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
        <Product
          _id="1014"
          img={"https://images.pexels.com/photos/28116998/pexels-photo-28116998/free-photo-of-a-bottle-of-a-facial-cream-sitting-on-a-table.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
          productName="Hair Spray"
          price="220.00"
          color="Black"
          isShowList={true}
          isAnotherShowList={false}
          badge={false}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
      </div>
    </div>
  );
};

export default BestSellers;
