import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaFileDownload, FaInfoCircle } from 'react-icons/fa';
import { toast } from "react-toastify";
import { selectUserInfo } from "../Account/authHandle/authSlice";
import { fetchCart } from "../../redux/orebiSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from '../../services/userService';
import { ClipLoader } from "react-spinners";
import { checkAuthAsync } from '../Account/authHandle/authSlice';
import axios from 'axios';

const Payment = () => {

  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  console.log(userInfo);
  const navigate = useNavigate();
  const products = useSelector((state) => state.orebiReducer.products || []);
  const [loading, setLoading] = useState(true);
  const [totalAmt, setTotalAmt] = useState("");
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await dispatch(checkAuthAsync());
      // Check if the payload has a status 401 indicating unauthorized access
      if (result?.payload?.status === 401) {
        toast.error("You must be logged in to access this page");
        navigate("/signin");
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  useEffect(() => {
    if (userInfo === null) {
      console.log("Trying to fetch user data...")
      return;
    }
    setLoading(true);
    setAddresses(userInfo.addresses)
    dispatch(fetchCart(userInfo._id)).finally(() => setLoading(false));
  }, [dispatch, userInfo, navigate]);

  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price;
      return price;
    });
    setTotalAmt(price);
  }, [products]);

  const initiatePayment = async () => {
    if (!selectedAddress) {
      toast.error("Please select a shipping address.");
      return;
    }
    try {
      // console.log(selectedAddress);
      
      const response = await axios.post(`https://${process.env.REACT_APP_API_URL}/api/v1/order/initiate-payment`, {
        totalAmt,
        transactionId: `TXN${Date.now()}`,
        addressId: selectedAddress,
      },{
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response);      
      const paymentUrl = response.data.data.paymentUrl;
      console.log(paymentUrl);
      
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Payment Error: ", error.message);
    }
  };
  

  const [shippingMethods] = useState([
    'Standard Shipping',
    'Express Shipping',
    'Overnight Shipping',
  ]);

  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id);
  const [selectedMethod, setSelectedMethod] = useState(shippingMethods[0]);

  const handleAddAddress = async () => {
    try {
      const fullAddress = {
        street: newAddress.street,
        city: newAddress.city,
        postalCode: newAddress.postalCode,
        country: newAddress.country,
      };
      
      const updatedAddresses = await addAddress(fullAddress);
      console.log(updatedAddresses)
      console.log(updatedAddresses.data);
      
      
      setAddresses(updatedAddresses.data); // Assuming API returns updated addresses
      toast.success("Address added successfully!");
      setNewAddress({ street: '', city: '', postalCode: '', country: '' });
    } catch (error) {
      toast.error("Failed to add address. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#36D7B7" size={50} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
          <FaCheckCircle className="text-white text-6xl mx-auto mb-4 animate-bounce" />
          <h1 className="text-white text-2xl font-bold">Please review your order</h1>
          <p className="text-white mt-2">Get your medicine delivered 😄</p>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Items:</h3>

              {products.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-2 group">
                  <span className="group-hover:text-blue-600 transition-colors duration-200">
                    {item.medicine.name} x {item.quantity}
                  </span>
                  <span>Rs. {item.price.toFixed(2)}</span>
                </div>
              ))}

            </div>
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Shipping Address:</h3>
              {addresses.map((addr) => (
                <div key={addr._id} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`${addr._id}`}
                    name="shippingAddress"
                    value={addr._id}
                    checked={selectedAddress === addr._id}
                    onChange={() => setSelectedAddress(addr._id)}
                  />
                  <label htmlFor={`address-${addr._id}`} className="text-sm">
                    {addr.street}, {addr.city},  {addr.country} - {addr.postalCode}
                    {console.log(addr)}
                  </label>
                </div>
              ))}
              <div className="mt-4">
                <h4 className="font-medium mb-2">Add New Address:</h4>
                <input
                  type="text"
                  placeholder="Street"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={newAddress.postalCode}
                  onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={newAddress.country}
                  onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                  className="w-full mb-2 p-2 border rounded"
                />
                <button
                  onClick={handleAddAddress}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Add Address
                </button>
              </div>
            </div>
            
            <div className="border-t pt-4 flex justify-between items-center font-bold text-lg">
              <span>Total:</span>
              <span>Rs. {totalAmt}</span>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Download receipt"
              onClick={initiatePayment}
            >
              <FaFileDownload className="mr-2" />
              Payment Options
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Payment;
