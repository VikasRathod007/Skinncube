import React, { useState,useEffect } from "react";
import "./UserProfile";
import { fetchOrders } from "../../services/orderService";

const Orders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderTrackingDetails, setOrderTrackingDetails] = useState({
    transactionId: "",
    mobileEmail: "",
    trackingDetails: "",
  });

  const fetchUserOrders = async () => {
    try {
      const response = await fetchOrders();
      setUserOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error.message);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <section className="order-section">
      <h2>Your Orders 🛒</h2>
      {selectedOrder && (
        <div className="order-detail-popup">
          <button className="close-btn" onClick={() => setSelectedOrder(null)}>
            &times;
          </button>
          <h3>Order ID: {selectedOrder._id}</h3>
          <p>Status: {selectedOrder.status}</p>
          <p>Total: ₹{selectedOrder.totalPrice}</p>
          <p>Shipping Address:</p>
          <p>{selectedOrder.shippingAddress.address}</p>
          <p>
            {selectedOrder.shippingAddress.city},{" "}
            {selectedOrder.shippingAddress.postalCode}
          </p>
          <p>{selectedOrder.shippingAddress.country}</p>
          <p>Tracking ID: {selectedOrder.transactionId || "N/A"}</p>

          <form className="tracking-form">
            <button
              type="button"
              className="track-btn"
              onClick={() =>
                setOrderTrackingDetails({
                  ...orderTrackingDetails,
                  trackingDetails: "Tracking Details Fetched!",
                })
              }
            >
              Mail Order Details 🚚
            </button>
            {orderTrackingDetails.trackingDetails && (
              <p className="tracking-details">{orderTrackingDetails.trackingDetails}</p>
            )}
          </form>
        </div>
      )}
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Status</th>
            <th>Total</th>
            <th>Tracking ID</th>
            <th>Track</th>
          </tr>
        </thead>
        <tbody>
          {userOrders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>
                {order.items.map((item, index) => (
                  <div key={index}>
                    {item.medicine.name} (x{item.quantity})
                  </div>
                ))}
              </td>
              <td>{order.status}</td>
              <td>₹{order.totalPrice}</td>
              <td>{order.transactionId || "N/A"}</td>
              <td>
                <button className="track-btn" onClick={() => setSelectedOrder(order)}>
                  🚚 Track
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </section>
  );
};

export default Orders;