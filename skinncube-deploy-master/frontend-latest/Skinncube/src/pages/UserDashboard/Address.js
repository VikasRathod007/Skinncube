import React, { useState } from "react";

const Address = ({ userInfo }) => {
  const { address } = userInfo || {};
  const [editing, setEditing] = useState({ billing: false, shipping: false });

  const toggleEditing = (type) => setEditing((prev) => ({ ...prev, [type]: !prev[type] }));

  return (
    <section className="address-section">
      <h2>Manage Your Address 📍</h2>
      <div className="address-grid">
        {["billing", "shipping"].map((type) => (
          <div className="address-box" key={type}>
            <h3>{type === "billing" ? "Billing Address" : "Shipping Address"}</h3>
            {editing[type] ? (
              <form>
                {/* Render form fields */}
                <button onClick={() => toggleEditing(type)}>Save</button>
              </form>
            ) : (
              <>
                <p>{address?.[type]?.addressLine1}</p>
                {/* Add other fields */}
                <button onClick={() => toggleEditing(type)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Address;