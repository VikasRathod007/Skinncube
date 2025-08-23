import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Orders from "./Orders";
import { toast } from "react-toastify";
import { checkAuthAsync, selectUserInfo, logoutUserAsync } from "../Account/authHandle/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { fetchOrders } from "../../services/orderService";

const UserProfile = () => {

  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  console.log(userInfo);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    city: "New York",
    country: "USA",
    orderStats: {
      totalOrders: 10,
      delivered: 8,
      pending: 2,
    },
    address: {
      billing: {
        name: "John Doe",
        addressLine1: "123 Main St",
        addressLine2: "Apt 4B",
        landmark: "Near Central Park",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "USA",
      },
      shipping: {
        name: "John Doe",
        addressLine1: "456 Elm St",
        addressLine2: "Suite 3",
        landmark: "Near Union Square",
        city: "Brooklyn",
        state: "NY",
        zip: "11201",
        country: "USA",
      },
    },
    orderDetails: [
      {
        id: 1,
        product: "Medicine A",
        status: "Delivered",
        totalAmount: "Rs.59.99",
        trackingId: "TRK12345",
      },
      {
        id: 2,
        product: "Medicine B",
        status: "Pending",
        totalAmount: "Rs.29.99",
        trackingId: "TRK67890",
      },
    ],
  });

  const [selectedSection, setSelectedSection] = useState("Dashboard");
  const [editingAddress, setEditingAddress] = useState({ billing: false, shipping: false });
  const [editingAccount, setEditingAccount] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [passwordFields, setPasswordFields] = useState({ old: "", new: "", confirm: "" });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderTrackingDetails, setOrderTrackingDetails] = useState({
    trackingId: "",
    mobileEmail: "",
    trackingDetails: "",
  });
  const [orders, setOrders] = useState([]);
  const [deliveredCount, setDeliveredCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserAsync());
      toast.success("Logged out successfully!");
      navigate("/signin");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
  };

  const getQueryParams = (queryString) => {
    const params = new URLSearchParams(queryString);
    return Object.fromEntries(params.entries());
  };

  const checkAuth = async () => {
    const result = await dispatch(checkAuthAsync());
    // Check if the payload has a status 401 indicating unauthorized access
    if (result?.payload?.status === 401) {
      toast.error("You must be logged in to access this page");
      navigate("/signin");
      return;
    }

    const user = result?.payload?.user || result?.payload?.data?.user;
    console.log("👤 UserProfile - User info:", {
      email: user?.email,
      role: user?.role,
      _id: user?._id
    });

    // Redirect admins to dashboard
    const role = String(user?.role || '').toUpperCase();
    if (role === "ADMIN" || role === "SUPERADMIN") {
      console.log("🔄 UserProfile - Admin detected, redirecting to dashboard");
      toast.info("Redirecting to admin dashboard");
      navigate("/dashboard");
      return;
    }

    setLoading(false);
  };

  useEffect(() => {
    const params = getQueryParams(location.search);
    if (params.section) {
      setSelectedSection(params.section);
    }
    checkAuth();
  }, [location.search]);

  const countOrders = (orders) => {
    const delivered = orders.filter(order => order.status === "Delivered").length;
    const others = orders.filter(order => order.status !== "Delivered").length;
    setDeliveredCount(delivered);
    setOtherCount(others);
  };

  const fetchUserOrders = async () => {
    try {
      const response = await fetchOrders();
      setOrders(response.data);
      countOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (userInfo && !loading) {
      fetchUserOrders();
    }
  }, [userInfo, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#007bff" />
      </div>
    );
  }

  const renderSection = () => {
    switch (selectedSection) {
      case "Dashboard":
        return (
          <section className="dashboard-summary">
            <h1>Welcome, {userInfo?.name || "User"} 👋</h1>
            <p>Manage your pharmacy orders, addresses, and account details here.</p>
            <div className="dashboard-stats">
              <div className="card">
                <p>Total Orders</p>
                <h2>{orders.length}</h2>
              </div>
              <div className="card">
                <p>Delivered</p>
                <h2>{deliveredCount}</h2>
              </div>
              <div className="card">
                <p>Pending</p>
                <h2>{otherCount}</h2>
              </div>
            </div>
          </section>
        );
      case "Orders":
        return <Orders />;
      case "Address":
        return (
          <section className="address-section">
            <h2>Manage Your Address 📍</h2>
            <div className="address-grid">
              {/* Billing Address */}
              <div className="address-box">
                <h3>Billing Address</h3>
                {editingAddress.billing ? (
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="text"
                      value={user.address.billing.addressLine1}
                      onChange={(e) => setUser({ ...user, address: { ...user.address, billing: { ...user.address.billing, addressLine1: e.target.value } } })}
                      placeholder="Address Line 1"
                    />
                    <input
                      type="text"
                      value={user.address.billing.addressLine2}
                      onChange={(e) => setUser({ ...user, address: { ...user.address, billing: { ...user.address.billing, addressLine2: e.target.value } } })}
                      placeholder="Address Line 2"
                    />
                    <input
                      type="text"
                      value={user.address.billing.landmark}
                      onChange={(e) => setUser({ ...user, address: { ...user.address, billing: { ...user.address.billing, landmark: e.target.value } } })}
                      placeholder="Landmark"
                    />
                    <input
                      type="text"
                      value={user.address.billing.city}
                      onChange={(e) => setUser({ ...user, address: { ...user.address, billing: { ...user.address.billing, city: e.target.value } } })}
                      placeholder="City"
                    />
                    <input
                      type="text"
                      value={user.address.billing.state}
                      onChange={(e) => setUser({ ...user, address: { ...user.address, billing: { ...user.address.billing, state: e.target.value } } })}
                      placeholder="State"
                    />
                    <input
                      type="text"
                      value={user.address.billing.zip}
                      onChange={(e) => setUser({ ...user, address: { ...user.address, billing: { ...user.address.billing, zip: e.target.value } } })}
                      placeholder="Zip Code"
                    />
                    <input
                      type="text"
                      value={user.address.billing.country}
                      onChange={(e) => setUser({ ...user, address: { ...user.address, billing: { ...user.address.billing, country: e.target.value } } })}
                      placeholder="Country"
                    />
                    <button
                      type="button"
                      className="save-btn"
                      onClick={() => setEditingAddress({ ...editingAddress, billing: false })}
                    >
                      Save Changes 📝
                    </button>
                  </form>
                ) : (
                  <>
                    <p>{user.address.billing.addressLine1}</p>
                    <p>{user.address.billing.addressLine2}</p>
                    <p>{user.address.billing.landmark}</p>
                    <p>{user.address.billing.city}, {user.address.billing.state} {user.address.billing.zip}</p>
                    <p>{user.address.billing.country}</p>
                    <button
                      className="edit-btn"
                      onClick={() => setEditingAddress({ ...editingAddress, billing: true })}
                    >
                      ✏️ Edit
                    </button>
                  </>
                )}
              </div>

              {/* Shipping Address */}
              <div className="address-box">
                <h3>Shipping Address</h3>
                {editingAddress.shipping ? (
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="text"
                      value={user.address.shipping.addressLine1}
                      onChange={(e) => setUser({ ...user, address: { ...user.address, shipping: { ...user.address.shipping, addressLine1: e.target.value } } })}
                      placeholder="Address Line 1"
                    />
                    <input
                      type="text"
                      value={user.address.shipping.addressLine2}
                      onChange={(e) => setUser({ ...user, address: { ...user.address, shipping: { ...user.address.shipping, addressLine2: e.target.value } } })}
                      placeholder="Address Line 2"
                    />
                    <input
                      type="text"
                      value={user.address.shipping.landmark}
                      onChange={(e) => setUser({ ...user, address: { ...user.address, shipping: { ...user.address.shipping, landmark: e.target.value } } })}
                      placeholder="Landmark"
                    />
                    <input
                      type="text"
                      value={user.address.shipping.city}
                      onChange={(e) => setUser({ ...user, address: { ...user.address, shipping: { ...user.address.shipping, city: e.target.value } } })}
                      placeholder="City"
                    />
                    <input
                      type="text"
                      value={user.address.shipping.state}
                      onChange={(e) => setUser({ ...user, address: { ...user.address, shipping: { ...user.address.shipping, state: e.target.value } } })}
                      placeholder="State"
                    />
                    <input
                      type="text"
                      value={user.address.shipping.zip}
                      onChange={(e) => setUser({ ...user, address: { ...user.address, shipping: { ...user.address.shipping, zip: e.target.value } } })}
                      placeholder="Zip Code"
                    />
                    <input
                      type="text"
                      value={user.address.shipping.country}
                      onChange={(e) => setUser({ ...user, address: { ...user.address, shipping: { ...user.address.shipping, country: e.target.value } } })}
                      placeholder="Country"
                    />
                    <button
                      type="button"
                      className="save-btn"
                      onClick={() => setEditingAddress({ ...editingAddress, shipping: false })}
                    >
                      Save Changes 📝
                    </button>
                  </form>
                ) : (
                  <>
                    <p>{user.address.shipping.addressLine1}</p>
                    <p>{user.address.shipping.addressLine2}</p>
                    <p>{user.address.shipping.landmark}</p>
                    <p>{user.address.shipping.city}, {user.address.shipping.state} {user.address.shipping.zip}</p>
                    <p>{user.address.shipping.country}</p>
                    <button
                      className="edit-btn"
                      onClick={() => setEditingAddress({ ...editingAddress, shipping: true })}
                    >
                      ✏️ Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>
        );
      case "Account Details":
        return (
          <section className="account-details-section">
            <h2>Account Details 🧑‍💻</h2>
            {editingAccount ? (
              <form>
                <input type="text" defaultValue={user.fullName} placeholder="Full Name" />
                <input type="email" defaultValue={user.email} placeholder="Email" />
                <input type="text" defaultValue={user.phoneNumber} placeholder="Phone Number" />
                <button
                  type="button"
                  className="save-btn"
                  onClick={() => setEditingAccount(false)}
                >
                  Save Changes 📝
                </button>
              </form>
            ) : (
              <>
                <p>Name: {user.fullName}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phoneNumber}</p>
                <button className="edit-btn" onClick={() => setEditingAccount(true)}>
                  ✏️ Edit
                </button>
              </>
            )}
            <button className="change-password-btn" onClick={() => setChangePassword(true)}>
              🔑 Change Password
            </button>
            {changePassword && (
              <div className="password-change-popup">
                <button className="close-btn" onClick={() => setChangePassword(false)}>
                  &times;
                </button>
                <h3>Change Your Password 🔐</h3>
                <form>
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={passwordFields.old}
                    onChange={(e) => setPasswordFields({ ...passwordFields, old: e.target.value })}
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={passwordFields.new}
                    onChange={(e) => setPasswordFields({ ...passwordFields, new: e.target.value })}
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordFields.confirm}
                    onChange={(e) => setPasswordFields({ ...passwordFields, confirm: e.target.value })}
                  />
                  <button
                    type="button"
                    className="save-btn"
                    onClick={() => {
                      setPasswordFields({ old: "", new: "", confirm: "" });
                      setChangePassword(false);
                    }}
                  >
                    Save Changes 🔒
                  </button>
                </form>
              </div>
            )}
          </section>
        );
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>My Profile</h2>
        <ul>
          <li
            className={selectedSection === "Dashboard" ? "active" : ""}
            onClick={() => setSelectedSection("Dashboard")}
          >
            Dashboard
          </li>
          <li
            className={selectedSection === "Orders" ? "active" : ""}
            onClick={() => setSelectedSection("Orders")}
          >
            Orders
          </li>
          <li
            className={selectedSection === "Address" ? "active" : ""}
            onClick={() => setSelectedSection("Address")}
          >
            Address
          </li>
          <li
            className={selectedSection === "Account Details" ? "active" : ""}
            onClick={() => setSelectedSection("Account Details")}
          >
            Account Details
          </li>
          <li
            className="logout-item"
            onClick={handleLogout}
            style={{ cursor: 'pointer' }}
          >
            Logout
          </li>
        </ul>
      </aside>
      <main className="main-content">{renderSection()}</main>
    </div>
  );
};

export default UserProfile;
