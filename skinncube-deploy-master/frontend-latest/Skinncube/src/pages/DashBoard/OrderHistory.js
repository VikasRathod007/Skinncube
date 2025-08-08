import React from "react";

const OrderHistory = () => {
  const dummyOrders = [
    { id: 1, user: "John Doe", product: "Laptop", quantity: 1, status: "Delivered" },
    { id: 2, user: "Jane Smith", product: "Smartphone", quantity: 2, status: "Pending" },
  ];

  return (
    <div>
      <h2>Order History</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
