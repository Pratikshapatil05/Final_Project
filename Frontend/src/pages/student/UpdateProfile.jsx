import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import AppNavbar from "../../components/AppNavbar"
import config from "../../services/config"

function UpdateProfile() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")
  const [newEmail, setNewEmail] = useState("")

  // Get the token from sessionStorage
  const token = sessionStorage.getItem("token")

  const updateProfile = async () => {
    // Basic validation to ensure name and mobile aren't empty
    if (!name || !mobile) {
      toast.warn("Name and Mobile Number are required")
      return
    }

    try {
      const response = await axios.put(
        config.BASE_URL + "/student/update-profile",
        {
          name,
          mobile_no: mobile,
          newEmail
        },
        {
          headers: { 
            // FIXED: Changed 'Authorization' to 'token' 
            // to match backend expectations
            token: token 
          }
        }
      )

      if (response.data.status === "success") {
        toast.success("Profile updated successfully")

        // If email changed → force logout as the old token might become invalid
        if (newEmail) {
          sessionStorage.clear()
          navigate("/")
        }
      } else {
        toast.error(response.data.error || "Update failed")
      }
    } catch (err) {
      console.error("Update error:", err)
      toast.error("Unauthorized: Please login again")
    }
  }

  return (
    <>
      <AppNavbar />
      <div className="container mt-5 col-md-4 shadow-sm p-4 rounded border">
        <h4 className="mb-4 text-center">Update Profile</h4>

        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            className="form-control"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mobile Number</label>
          <input
            className="form-control"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">New Email (leave blank to keep current)</label>
          <input
            className="form-control"
            placeholder="example@email.com"
            value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100" onClick={updateProfile}>
          Save Changes
        </button>
      </div>
    </>
  )
}

export default UpdateProfile