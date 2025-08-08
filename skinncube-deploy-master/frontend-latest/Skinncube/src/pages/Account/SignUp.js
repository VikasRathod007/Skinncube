import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { registerUser } from "../../services/userService";
import { ToastContainer,toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  // ============= Initial State Start here =============
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [checked, setChecked] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setshowPrivacy] = useState(false);
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [errCity, setErrCity] = useState("");
  const [errCountry, setErrCountry] = useState("");
  const [errZip, setErrZip] = useState("");
  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============
  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrPhone("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
    setErrAddress("");
  };
  const handleCity = (e) => {
    setCity(e.target.value);
    setErrCity("");
  };
  const handleCountry = (e) => {
    setCountry(e.target.value);
    setErrCountry("");
  };
  const handleZip = (e) => {
    setZip(e.target.value);
    setErrZip("");
  };
  // ============= Event Handler End here ===============
  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  const handleSignUp = async(e) => {
    e.preventDefault();
    if (checked) {
      if (!clientName) {
        setErrClientName("Enter your name");
      }
      if (!email) {
        setErrEmail("Enter your email");
      } else {
        if (!EmailValidation(email)) {
          setErrEmail("Enter a Valid email");
        }
      }
      if (!phone) {
        setErrPhone("Enter your phone number");
      }
      if (!password) {
        setErrPassword("Create a password");
      } else {
        if (password.length < 6) {
          setErrPassword("Passwords must be at least 6 characters");
        }
      }
      if (!address) {
        setErrAddress("Enter your address");
      }
      if (!city) {
        setErrCity("Enter your city name");
      }
      if (!country) {
        setErrCountry("Enter the country you are residing");
      }
      if (!zip) {
        setErrZip("Enter the zip code of your area");
      }
      // ============== Getting the value ==============
      if (
        clientName &&
        email &&
        EmailValidation(email) &&
        password &&
        password.length >= 6
      ) {
        try {
          // Prepare user data
          const userData = {
            name: clientName,
            email,
            phno: phone,
            password
          };
    
          // Call the registerUser service
          const response = await registerUser(userData);
          setSuccessMsg(response.message || "Account created successfully!");
          toast.success("Sign up successful! Redirecting to login...");
          setTimeout(() => navigate("/signin", { replace: true }), 2000);

    
          // Clear fields
          setClientName("");
          setEmail("");
          setPhone("");
          setPassword("");
          setAddress("");
          setCity("");
          setCountry("");
          setZip("");
        } catch (error) {
          console.error("Error registering user:", error);
          setErrEmail(error.message || "An error occurred. Please try again.");
          console.log(error);
          
          toast.error(error.message);
        }
      }
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-start">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Get started for free
            </h1>
            <p className="text-base">Create your account to access more</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with SkinnCube
              </span>
              <br />
              SkinnCube is your go-to online pharmacy platform, 
              designed to simplify your medication management.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all SkinnCube services
              </span>
              <br />
              SkinnCube provides a comprehensive range of services to meet your pharmacy needs. 
              Our platform allows you to easily manage your prescriptions, order medications, and access health consultations from the comfort of your home.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
              <br />
              SkinnCube has earned the trust of countless online shoppers by prioritizing safety, convenience, and customer satisfaction.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              © SkinnCube
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300"  onClick={() => {
                    setShowTerms(true);
                  }}>
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300"onClick={() => {
                    setshowPrivacy(true);
                  }}>
              Privacy
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signin">
              <button
                className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign in
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Create your account
              </h1>
              <div className="flex flex-col gap-3">
                {/* client name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Full Name
                  </p>
                  <input
                    onChange={handleName}
                    value={clientName}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="xyz abc"
                  />
                  {errClientName && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errClientName}
                    </p>
                  )}
                </div>
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Email
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="xyz@gmail.com"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>
                {/* Phone Number */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Phone Number
                  </p>
                  <input
                    onChange={handlePhone}
                    value={phone}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="1234567890"
                  />
                  {errPhone && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPhone}
                    </p>
                  )}
                </div>
                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Create password"
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>
                {/* Address */}
                {/* <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Address
                  </p>
                  <input
                    onChange={handleAddress}
                    value={address}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="House-01, Street-01, Example area"
                  />
                  {errAddress && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errAddress}
                    </p>
                  )}
                </div> */}
                {/* City */}
                {/* <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    City
                  </p>
                  <input
                    onChange={handleCity}
                    value={city}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Your city"
                  />
                  {errCity && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errCity}
                    </p>
                  )}
                </div> */}
                {/* Country */}
                {/* <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Country
                  </p>
                  <input
                    onChange={handleCountry}
                    value={country}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Your country"
                  />
                  {errCountry && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errCountry}
                    </p>
                  )}
                </div> */}
                {/* Zip code */}
                {/* <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Zip/Postal code
                  </p>
                  <input
                    onChange={handleZip}
                    value={zip}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Your country"
                  />
                  {errZip && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errZip}
                    </p>
                  )}
                </div> */}
                {/* Checkbox */}
                <div className="flex items-start mdl:items-center gap-2">
                  <input
                    onChange={() => setChecked(!checked)}
                    className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                    type="checkbox"
                  />
                  <p className="text-sm text-primeColor">
                    I agree to the SkinnCube{" "}
                    <span className="text-blue-500" onClick={() => {
                    setShowTerms(true);
                  }}>Terms of Service </span>and{" "}
                    <span className="text-blue-500" onClick={() => {
                    setshowPrivacy(true);
                  }}>Privacy Policy</span>.
                  </p>
                </div>
                <button
                  onClick={handleSignUp}
                  className={`${
                    checked
                      ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                      : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                  } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                >
                  Create Account
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                  Don't have an Account?{" "}
                  <Link to="/signin">
                    <span className="hover:text-blue-600 duration-300">
                      Sign in
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
      {/* Terms of Service Modal */}
      {showTerms && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-md w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Skinncube Terms and Conditions</h2>
      <p className="text-sm text-gray-600 whitespace-pre-line">
        Welcome to Skinncube! By accessing and using our website and services, you agree to comply with the following terms and conditions. Please read them carefully before using our site. If you do not agree with these terms, please refrain from using our website.
        {"\n"}{"\n"}
        ________________________________________
        {"\n"}
        1. Acceptance of Terms
        {"\n"}
        By accessing or using www.skinncube.com, you agree to these terms and conditions, along with any future updates or modifications. If you do not agree, please discontinue your use of the website.
        {"\n"}{"\n"}
        ________________________________________
        {"\n"}
        2. Use of Website
        {"\n"}
        Skinncube grants you a limited, non-exclusive, non-transferable, and revocable license to access and use the website for personal and non-commercial purposes only. You agree not to use the website for illegal activities or in ways that violate any applicable laws or regulations.
        {"\n"}{"\n"}
        ________________________________________
        {"\n"}
        3. Account Registration
        {"\n"}
        To access certain features of our website, you may need to create an account. When registering, you agree to provide accurate, current, and complete information. You are responsible for keeping your account credentials secure and are solely responsible for all activities that occur under your account.
        {"\n"}{"\n"}
        ________________________________________
        {"\n"}
        4. Privacy and Data Protection
        {"\n"}
        Your privacy is important to us. Please refer to our Privacy Policy to learn how we collect, use, and safeguard your personal data. By using this website, you consent to the collection and use of your data as outlined in our Privacy Policy.
        {"\n"}{"\n"}
        ________________________________________
        {"\n"}
        5. Product Information
        {"\n"}
        We strive to provide accurate information about our products, including descriptions, prices, and availability. However, we do not guarantee the accuracy or completeness of the information on the website. In case of any discrepancies, Skinncube reserves the right to correct errors and update product details.
        {"\n"}{"\n"}
        ________________________________________
        {"\n"}
        6. Pricing and Payments
        {"\n"}
        All prices are listed in Indian Rupees (INR) unless otherwise specified. Prices are subject to change without notice. Payments for products and services are processed through secure third-party payment gateways. Skinncube does not store your payment information.
        {"\n"}{"\n"}
        ________________________________________
        {"\n"}
        7. Shipping and Delivery
        {"\n"}
        Skinncube offers domestic shipping in Madhya Pradesh State Only. Shipping costs and delivery times vary depending on your location and the chosen delivery method. For detailed shipping information. Delivery times are estimates and may be subject to delays beyond our control.
        {"\n"}
        Delivery Time Frame: Currently the Web Application is only functional for the state Madhya Pradesh and we will deliver the products in 7 days.
        {"\n"}{"\n"}
        ________________________________________
        {"\n"}
        8. Returns, Refunds, and Exchanges
        {"\n"}
        Your satisfaction is important to us. If you're not completely satisfied with your purchase, you may be eligible for a return or exchange in accordance with our Return and Refund Policy. Returns must be initiated within the specified time frame and meet our policy conditions.
        {"\n"}
        Note: Some items may not be eligible for returns due to hygiene or other reasons. Please refer to our policy for further details.
        {"\n"}{"\n"}
        ________________________________________
        {"\n"}
        9. Intellectual Property
        {"\n"}
        All content on the Skinncube website, including but not limited to text, images, logos, graphics, and trademarks, is owned by Skinncube or its licensors and is protected by intellectual property laws. You may not copy, modify, or distribute any of this content without prior written permission from Skinncube.
        {"\n"}{"\n"}
        ________________________________________
        {"\n"}
        10. Third-Party Links
        {"\n"}
        Skinncube may contain links to external websites. We are not responsible for the content, privacy policies, or practices of these websites. We recommend that you review the terms and conditions and privacy policies of any third-party websites you visit.
        {"\n"}{"\n"}
        ________________________________________
        {"\n"}
        11. User Conduct
        {"\n"}
        You agree to use the Skinncube website in a lawful manner and refrain from any conduct that could damage, disable, or impair the website or interfere with other users' ability to access and enjoy the services. This includes, but is not limited to, spamming, fraud, or any illegal activities.
        {"\n"}{"\n"}
        ________________________________________
        {"\n"}
        12. Limitation of Liability
        {"\n"}
        Skinncube will not be held liable for any direct, indirect, incidental, or consequential damages resulting from your use or inability to use the website or its services. This includes, but is not limited to, loss of data, profits, or business opportunities.
        {"\n"}{"\n"}
        ________________________________________
        {"\n"}
        13. Indemnification
        {"\n"}
        You agree to indemnify, defend, and hold harmless Skinncube, its affiliates, employees, partners, and licensors from any claims, damages, or liabilities arising from your use of the website or violation of these terms and conditions.
        {"\n"}{"\n"}
        ________________________________________
        {"\n"}
        14. Force Majeure
        {"\n"}
        Skinncube shall not be liable for any failure or delay in performance of its obligations due to events beyond our control, including natural disasters, pandemics, technical failures, or any other unforeseen circumstances.
        {"\n"}{"\n"}
        ________________________________________
        {"\n"}
        15. Governing Law
        {"\n"}
        These Terms and Conditions are governed by the laws of India. Any disputes related to these terms will be subject to the exclusive jurisdiction of the courts located in India.
        {"\n"}{"\n"}
        ________________________________________
        {"\n"}
        16. Modifications to Terms
        {"\n"}
        Skinncube reserves the right to update or modify these Terms and Conditions at any time. Any changes will be posted on this page, and the updated terms will become effective immediately upon publication. We encourage you to review this page periodically.
        {"\n"}{"\n"}
        ________________________________________
        {"\n"}
        17. Contact Us
        {"\n"}
        If you have any questions or concerns regarding these Terms and Conditions, please reach out to us:
        {"\n"}
        Skinncube
        {"\n"}
        Email: skinncube@gmail.com
        {"\n"}
        ________________________________________
        {"\n"}
        By using this website, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
      </p>
      <button
        onClick={() => setShowTerms(false)}
        className="mt-4 bg-primeColor text-white py-2 px-4 rounded-md hover:bg-black"
      >
        Close
      </button>
    </div>
  </div>
      )}

      {showPrivacy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-96 overflow-auto max-h-[80vh]">
            <h2 className="text-lg font-bold mb-4">Privacy Policy for Skinncube</h2>

            {/* Privacy Policy Content */}
            <p className="text-sm">
              At Skinncube, your privacy is important to us. This Privacy Policy outlines the types of personal information we collect, how we use it, and how we protect your data. By using our website and services, you agree to the terms outlined in this Privacy Policy.
            </p>

            <h3 className="font-semibold mt-4">1. Information We Collect</h3>
            <ul className="list-disc ml-6 text-sm">
              <li><strong>a. Personal Information:</strong> We may collect your name, email address, phone number, shipping address, billing information, and payment details when you register or make a purchase.</li>
              <li><strong>b. Usage Data:</strong> Information about how you use our website, including IP addresses, browser types, device information, and browsing activity.</li>
              <li><strong>c. Cookies and Tracking Technologies:</strong> We use cookies to enhance your experience, analyze traffic, and tailor advertisements.</li>
            </ul>

            <h3 className="font-semibold mt-4">2. How We Use Your Information</h3>
            <ul className="list-disc ml-6 text-sm">
              <li><strong>a. To Provide and Improve Services:</strong> Process orders, deliver products, and respond to customer support requests.</li>
              <li><strong>b. To Personalize Your Experience:</strong> Customize your website experience, recommend products based on preferences.</li>
              <li><strong>c. To Communicate with You:</strong> Send promotional emails, order updates, or other communications with your consent.</li>
              <li><strong>d. To Enhance Website Functionality:</strong> Improve website performance and user interface by analyzing usage data.</li>
            </ul>

            <h3 className="font-semibold mt-4">3. How We Protect Your Data</h3>
            <ul className="list-disc ml-6 text-sm">
              <li><strong>Encryption:</strong> Sensitive data is encrypted during transmission using Secure Socket Layer (SSL) technology.</li>
              <li><strong>Access Control:</strong> Only authorized personnel have access to personal data.</li>
            </ul>
            <p className="text-sm">
              However, please note that no data transmission over the Internet is 100% secure, and we cannot guarantee the complete security of your data.
            </p>

            <h3 className="font-semibold mt-4">4. Sharing Your Information</h3>
            <ul className="list-disc ml-6 text-sm">
              <li><strong>a. Service Providers:</strong> We may share your data with third-party service providers who assist with processing payments, shipping, or customer support.</li>
              <li><strong>b. Legal Requirements:</strong> We may disclose your data if required by law, to comply with a legal process, or government requests.</li>
            </ul>

            <h3 className="font-semibold mt-4">5. Your Rights and Choices</h3>
            <ul className="list-disc ml-6 text-sm">
              <li><strong>a. Access and Update:</strong> Request access to your personal data and update any inaccurate information.</li>
              <li><strong>b. Deletion of Data:</strong> You can request that we delete your personal data, subject to applicable laws.</li>
              <li><strong>c. Opt-Out of Marketing:</strong> You can opt out of receiving promotional emails by clicking the unsubscribe link.</li>
              <li><strong>d. Cookie Preferences:</strong> Manage cookie preferences via your browser settings. Disabling cookies may affect website functionality.</li>
            </ul>

            <h3 className="font-semibold mt-4">6. Third-Party Websites</h3>
            <p className="text-sm">
              Our website may contain links to third-party websites. This Privacy Policy only applies to Skinncube. We are not responsible for other websites' privacy practices.
            </p>

            <h3 className="font-semibold mt-4">7. Children's Privacy</h3>
            <p className="text-sm">
              We do not knowingly collect personal information from children under 18. If we discover a child under 18 has provided us with personal information, we will delete it.
            </p>

            <h3 className="font-semibold mt-4">8. Changes to This Privacy Policy</h3>
            <p className="text-sm">
              We may update this Privacy Policy at any time. Changes will be posted here with the updated date. We encourage you to review it periodically.
            </p>

            <h3 className="font-semibold mt-4">9. Contact Us</h3>
            <p className="text-sm">
              If you have questions about this policy or the handling of your personal information, contact us:
            </p>
            <p className="text-sm">Skinncube</p>
            <p className="text-sm">Email: skinncube@gmail.com</p>

            <button
              onClick={() => setshowPrivacy(false)}
              className="mt-4 bg-primeColor text-white py-2 px-4 rounded-md hover:bg-black"
            >
              Close
            </button>

            {/* Refund Policy Section */}
            <h2 className="text-lg font-bold mt-6 mb-4">Refund Policy for Skinncube</h2>

            {/* Refund Policy Content */}
            <p className="text-sm">
              Thank you for shopping with Skinncube. We strive to provide high-quality products and services. If you are not fully satisfied with your purchase, please review the refund policy below.
            </p>

            <h3 className="font-semibold mt-4">1. Return, Exchanges and Refund Eligibility</h3>
            <ul className="list-disc ml-6 text-sm">
              <li><strong>Product Condition:</strong> Items must be unused, unopened, and in original packaging to be eligible for a refund.</li>
              <li><strong>Timeframe:</strong> Return requests must be made within 7 days from the date of delivery (Please refer terms of service for deliver time frame).</li>
              <li><strong>Proof of Purchase:</strong> A valid proof of purchase is required for a refund.</li>
            </ul>

            <h3 className="font-semibold mt-4">2. Refund/Exchange Process</h3>
            <ul className="list-disc ml-6 text-sm">
              <li><strong>Request a Refund/Exchange:</strong> Contact us with your order number and reason for requesting a refund/exchange.</li>
              <li><strong>Review and Approval:</strong> We will notify you of approval or rejection within 5-7 business days.</li>
              <li><strong>Return/Exchange Shipping:</strong> Return/Exchange shipping costs are borne by the customer.</li>
              <li><strong>Exchange:</strong> Exchange of products will be done in 10-15 buisness days.</li>
              <li><strong>Refund Method:</strong> Refund will be credited to the original payment method within 7-10 business days.</li>
            </ul>

            <h3 className="font-semibold mt-4">3. Non-Refundable Items</h3>
            <ul className="list-disc ml-6 text-sm">
              <li><strong>Opened or Used Products:</strong> Items that have been opened or used are non-refundable.</li>
              <li><strong>Personal Care Products:</strong> Due to hygiene reasons, certain products such as skincare are non-refundable.</li>
            </ul>

            <h3 className="font-semibold mt-4">4. Defective or Damaged Products</h3>
            <p className="text-sm">
              If you receive a defective or damaged product, please contact us immediately with photos. We will either issue a refund or send a replacement, as per your preference.
            </p>

            <h3 className="font-semibold mt-4">5. Cancellations</h3>
            <p className="text-sm">
              Orders can be canceled before they are processed or shipped. Contact us within 24 hours of placing the order for cancellation requests.
            </p>

            <button
              onClick={() => setshowPrivacy(false)}
              className="mt-4 bg-primeColor text-white py-2 px-4 rounded-md hover:bg-black"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
