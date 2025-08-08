import React from "react";

const DeliveryStatus = () => {
  const dummyDeliveries = [
    { orderId: 1, trackingNumber: "ABC123", status: "Delivered" },
    { orderId: 2, trackingNumber: "XYZ456", status: "In Transit" },
  ];

  return (
    <div>
      <h2>Delivery Status</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Tracking Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyDeliveries.map(delivery => (
            <tr key={delivery.orderId}>
              <td>{delivery.orderId}</td>
              <td>{delivery.trackingNumber}</td>
              <td>{delivery.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryStatus;
