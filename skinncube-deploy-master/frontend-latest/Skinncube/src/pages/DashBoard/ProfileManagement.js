import React from "react";

const ProfileManagement = () => {
  return (
    <div>
      <h2>Edit Admin Profile</h2>
      <form>
        <label>Name:</label>
        <input type="text" />
        <label>Email:</label>
        <input type="email" />
        <label>Password:</label>
        <input type="password" />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileManagement;
