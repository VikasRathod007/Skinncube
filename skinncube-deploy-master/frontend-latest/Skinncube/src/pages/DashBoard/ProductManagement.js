import React from "react";

const ProductManagement = () => {
  const dummyProducts = [
    { id: 1, name: "Laptop", price: "$1500", quantity: 10 },
    { id: 2, name: "Smartphone", price: "$800", quantity: 20 },
  ];

  return (
    <div>
      <h2>Product Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyProducts.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
