import React from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
} from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";

const NewArrivals = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        <div className="px-2">
          <Product
            _id="100001"
            img={"https://cdn01.pharmeasy.in/dam/products_otc/I01439/episoft-ac-sunscreen-spf30-cream-75gm-6.1-1718975150.jpg?dim=360x360&q=75"}
            productName="Episoft Moisturiser with Microcapsulated Sunscreen"
            price="449.00"
            color="Skin Care"
            isShowList={true}
            isAnotherShowList={false}
            badge={true}
            des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
          />
        </div>
        <div className="px-2">
          <Product
            _id="100002"
            img={"https://images.apollo247.in/pub/media/catalog/product/A/P/APM0010_1-JULY23_1.jpg?tr=w-400,q-100,f-webp,c-at_max"}
            productName="Apollo Deep Nourishing Moisturiser"
            price="106.70"
            color="Skin Care"
            isShowList={true}
            isAnotherShowList={false}
            badge={true}
            des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
          />
        </div>
        <div className="px-2">
          <Product
            _id="100004"
            img={"https://images.pexels.com/photos/7852734/pexels-photo-7852734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
            productName="CBD Hair Serum"
            price="1119.00"
            color="Hair Care"
            isShowList={true}
            isAnotherShowList={false}
            badge={false}
            des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
          />
        </div>
        <div className="px-2">
          <Product
            _id="100005"
            img={"https://images.pexels.com/photos/7852733/pexels-photo-7852733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
            productName="CBD Intensive Skin Repair Cream"
            price="1299.00"
            color="Personal Care"
            isShowList={true}
            isAnotherShowList={false}
            badge={false}
            des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
          />
        </div>
      </Slider>
    </div>
  );
};

export default NewArrivals;
