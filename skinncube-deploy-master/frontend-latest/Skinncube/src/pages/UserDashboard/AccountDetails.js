import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../Account/authHandle/authSlice";

const AccountDetails = () => {
    const userInfo = useSelector(selectUserInfo);
  const [editing, setEditing] = useState(false);

  return (
    <section className="account-details-section">
      <h2>Account Details 🧑‍💻</h2>
      {editing ? (
        <form>
          <input type="text" defaultValue={userInfo?.name} placeholder="Full Name" />
          <input type="email" defaultValue={userInfo?.email} placeholder="Email" />
          <button onClick={() => setEditing(false)}>Save</button>
        </form>
      ) : (
        <>
          <p>Name: {userInfo?.name}</p>
          <p>Email: {userInfo?.email}</p>
            <div>
                {userInfo.addresses.map((address) => (
                    <p>{address.street} {address.postalCode} {address.city} {address.country}</p>
                ))}
            </div>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
    </section>
  );
};

export default AccountDetails;