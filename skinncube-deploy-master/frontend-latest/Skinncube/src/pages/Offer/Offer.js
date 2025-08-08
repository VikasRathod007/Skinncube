import React, { useState } from "react";
import Testimonials from "../../components/home/Testimonials/Testimonials";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Offer = () => {
  const [prevLocation] = useState("");

  return (
    <div className="max-w-container mx-auto">
      <Breadcrumbs title="Offer" prevLocation={prevLocation} />
      <div className="pb-10">
        <Testimonials />
      </div>
    </div>
  );
};

export default Offer;
