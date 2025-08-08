import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state?.data);
  }, [location]);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="About" prevLocation={prevLocation} />
      <div className="pb-10">
        <h1 className="text-primeColor font-semibold text-lg mb-2">About Skinncube</h1>
        <p className="max-w-[600px] text-base text-lightText mb-4">
          At Skinncube, we believe that true beauty stems from holistic wellness.
          We are your one-stop destination for comprehensive skin, hair, nail, and wellness care, 
          combining cutting-edge science, innovation, and personalized attention. 
          Our journey began with a passion for delivering clinically proven solutions that empower individuals 
          to achieve their health and beauty goals. Whether you’re looking for the latest dermatological products, 
          expert consultations, or wellness plans, Skinncube is here to guide you every step of the way.
        </p>
        
        <h2 className="text-primeColor font-semibold text-lg mb-2">Our Vision</h2>
        <p className="max-w-[600px] text-base text-lightText mb-4">
          To revolutionize skincare and wellness by merging advanced dermatology with holistic, 
          effective, and personalized solutions that enhance the natural beauty and well-being of every individual.
        </p>
        
        <h2 className="text-primeColor font-semibold text-lg mb-2">Our Mission</h2>
        <ul className="list-disc pl-6 text-lightText mb-4">
          <li>To provide dermatologically tested products that address a wide range of concerns, including acne, anti-aging, and sun protection.</li>
          <li>To offer professional treatments and personalized solutions for skin, hair, and nails, tailored to the unique needs of every individual.</li>
          <li>To deliver holistic wellness through customized diet and wellness plans for weight loss, overall health, and nutraceutical support.</li>
        </ul>

        <h2 className="text-primeColor font-semibold text-lg mb-2">What We Offer</h2>
        <p className="max-w-[600px] text-base text-lightText mb-4">
          <strong>Dermatology Products:</strong> At Skinncube, we offer an extensive range of dermatologist-recommended products for skin, hair, 
          and nail care, as well as specialized nutraceuticals. Whether you need sun protection, anti-aging solutions, acne control, hydration, 
          or supplements to enhance your overall health, we ensure that each product meets the highest standards of safety and effectiveness.
          <br/><br/>
          <strong>Professional Treatments:</strong> Our expert dermatologists provide advanced treatments for skin, hair, and nails, focusing on addressing 
          your specific needs. From rejuvenation therapies to hair regrowth treatments and nail care solutions, our services are designed to deliver lasting results.
          <br/><br/>
          <strong>Nutraceuticals & Wellness:</strong> We believe that beauty is a reflection of inner wellness. Our nutraceutical offerings and wellness programs 
          focus on improving your overall health. Whether you’re looking to improve skin health, hair growth, or boost your vitality, our supplements and wellness 
          solutions are scientifically formulated for maximum benefit.
          <br/><br/>
          <strong>One-Year Challenges:</strong> At Skinncube, we are committed to long-term solutions, not quick fixes. Our One-Year Challenges for acne, weight 
          loss, and hair growth are designed to deliver sustainable, transformative results. These programs include tailored treatment plans, regular consultations 
          with our expert dermatologists, and personalized product kits that evolve with your progress.
        </p>

        <h2 className="text-primeColor font-semibold text-lg mb-2">Why Skinncube?</h2>
        <ul className="list-disc pl-6 text-lightText mb-4">
          <li><strong>Expert Care:</strong> Our team comprises some of the most experienced dermatologists in India, dedicated to providing the best care for your skin, hair, nails, and overall wellness.</li>
          <li><strong>Scientific Approach:</strong> Every product and treatment we offer is backed by rigorous research and proven science, ensuring you receive the highest-quality recommendations.</li>
          <li><strong>Personalized Solutions:</strong> We understand that each individual’s needs are unique. Our treatments and products are customized to address your specific concerns and deliver the best possible results.</li>
        </ul>

        <h2 className="text-primeColor font-semibold text-lg mb-2">Our Values</h2>
        <ul className="list-disc pl-6 text-lightText mb-4">
          <li><strong>Transparency:</strong> We believe in honest and open communication, ensuring you have all the information you need to make informed decisions about your skincare, haircare, and wellness.</li>
          <li><strong>Integrity:</strong> We hold ourselves to the highest ethical standards, ensuring that every product and service we offer is safe, effective, and trustworthy.</li>
          <li><strong>Innovation:</strong> We continually push the boundaries of dermatology and wellness, using the latest research and technology to develop innovative solutions that provide real, measurable results.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
