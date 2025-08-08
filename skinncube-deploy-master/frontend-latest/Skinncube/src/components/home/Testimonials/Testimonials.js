import React from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";

const Testimonials = () => {
  return (
    <div className="w-full pb-20">
      <Heading heading="Testimonials" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        <Product
          _id="1101"
          img="https://img.freepik.com/free-vector/flat-style-woman-avatar_90220-2944.jpg?semt=ais_hybrid"
          productName="Cap for Boys"
          price="35.00"
          color="Blank and White"
          badge={false}
          isShowList = {false}
          isAnotherShowList = {true}
          text = "I’m so excited to have discovered Skinncube! As someone who’s always on the lookout for new skincare finds, I was thrilled to stumble upon this new online store. What drew me in was their carefully curated selection of products from brands I already love. I've only made one purchase so far, but the entire experience has been seamless. The team’s responsiveness and attention to detail have really impressed me. I’m excited to see how Skinncube grows and evolves in the future. For now, I’m just happy to have found a reliable and trustworthy online skincare retailer! - Vidhi Agarwal"
          des="I’m so excited to have discovered Skinncube! As someone who’s always on the lookout for new skincare finds, I was thrilled to stumble upon this new online store. What drew me in was their carefully curated selection of products from brands I already love. I've only made one purchase so far, but the entire experience has been seamless. The team’s responsiveness and attention to detail have really impressed me. I’m excited to see how Skinncube grows and evolves in the future. For now, I’m just happy to have found a reliable and trustworthy online skincare retailer! - Vidhi Agarwal"
        />
        <Product
          _id="1102"
          img="https://img.freepik.com/free-vector/flat-style-woman-avatar_90220-2944.jpg?semt=ais_hybrid"
          productName="Tea Table"
          price="180.00"
          color="Gray"
          badge={false}
          isShowList = {false}
          isAnotherShowList = {true}
          text = "As someone who’s cautious about trying new skincare brands, I was pleasantly surprised by Skinncube! Their product selection is amazing, and the quality has exceeded my expectations. I received my order on time, and everything was well-packaged. It's refreshing to find a site that truly values customer satisfaction. Highly recommend to anyone looking for trustworthy skincare products! - Simran Mehta"
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
      </div>
    </div>
  );
};

export default Testimonials;
