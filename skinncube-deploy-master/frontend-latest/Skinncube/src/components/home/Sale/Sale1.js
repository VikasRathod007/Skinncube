import React from "react";
import { Link } from "react-router-dom";
import {
  saleImgOne,
  saleImgTwo,
  saleImgThree,
} from "../../../assets/images/index";
import Image from "../../designLayouts/Image";

const Sale = () => {
  return (
    <div className="py-20 flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-10  container1" style={{display:"flex"}}>
        <div class="column column1">
            <img src="https://cdn01.pharmeasy.in/dam/products_otc/I01439/episoft-ac-sunscreen-spf30-cream-75gm-6.1-1718975150.jpg?dim=360x360&q=75" alt="Image 1"></img>
        </div>
        <div class="column column2">
            <img src="https://cdn01.pharmeasy.in/dam/products_otc/I01439/episoft-ac-sunscreen-spf30-cream-75gm-6.1-1718975150.jpg?dim=360x360&q=75" alt="Image 2" class="stacked-image"></img>
            <img src="https://cdn01.pharmeasy.in/dam/products_otc/I01439/episoft-ac-sunscreen-spf30-cream-75gm-6.1-1718975150.jpg?dim=360x360&q=75" alt="Image 3" class="stacked-image"></img>
        </div>
    </div>
  );
};

export default Sale;
