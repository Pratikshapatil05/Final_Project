import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AppNavbar from "../../components/AppNavbar";
// 1. Import config to use the standard BASE_URL
import config from "../../services/config"; 

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePassword = async () => {
    // Basic Validation
    if (newPassword === "" || confirmPassword === "") {
      toast.warn("Please enter both password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // 2. Get the token from sessionStorage
    const token = sessionStorage.getItem("token");

    try {
      // 3. Construct the URL using config
      const URL = config.BASE_URL + "/student/change-password";

      const response = await axios.put(
        URL,
        { newPassword, confirmPassword },
        { 
          // 4. CHANGE 'Authorization' to 'token' to match your backend expectations
          headers: { token: token } 
        }
      );

      // 5. Check if the backend sent a success status
      if (response.data.status === "success") {
        toast.success("Password changed successfully");
        // Optional: clear inputs
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(response.data.error || "Failed to update password");
      }
      
    } catch (err) {
      console.error(err);
      toast.error("Unauthorized: Please login again");
    }
  };

  return (
    <>
      <AppNavbar />
      <div className="container mt-5 col-md-4 shadow-sm p-4 rounded border">
        <h4 className="mb-4 text-center">Change Password</h4>

        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100" onClick={changePassword}>
          Update Password
        </button>
      </div>
    </>
  );
}

export default ChangePassword;