import React from "react";

const UserProfile = () => {
    const userInfo = useSelector(selectUserInfo);
  const { fullName, orderStats } = userInfo || {};

  return (
    <section className="dashboard-summary">
      <h1>Welcome, {fullName || "User"} 👋</h1>
      <p>Manage your pharmacy orders, addresses, and account details here.</p>
      <div className="dashboard-stats">
        <div className="card">
          <p>Total Orders</p>
          <h2>{orderStats?.totalOrders || 0}</h2>
        </div>
        <div className="card">
          <p>Delivered</p>
          <h2>{orderStats?.delivered || 0}</h2>
        </div>
        <div className="card">
          <p>Pending</p>
          <h2>{orderStats?.pending || 0}</h2>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;