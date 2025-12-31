import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/userService";
import { LoginContext } from "../App";
import AppNavbar from "../components/AppNavbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loginStatus, setLoginStatus } = useContext(LoginContext);

  // ✅ Block login page if already logged in (NO toast here)
  useEffect(() => {
    if (loginStatus) {
      navigate("/", { replace: true });
    }
  }, [loginStatus, navigate]);

  const signin = async () => {
    if (!email) {
      toast.warn("Email must be entered");
      return;
    }

    if (!password) {
      toast.warn("Password must be entered");
      return;
    }

    const result = await loginUser(email, password);

    if (result?.status === "success") {
      sessionStorage.setItem("token", result.data.token);
      sessionStorage.setItem("role", result.data.role);

      setLoginStatus(true);

      if (result.data.role === "admin") {
        navigate("/course/all-courses", { replace: true });
      } else {
        navigate("/my-courses", { replace: true });
      }

      toast.success("Login successful");
    } else {
      toast.error(result?.error || "Invalid credentials");
    }
  };

  return (
    <>
      <AppNavbar />

      <div className="container w-50 mt-3">
        <h2 className="mb-4">Login</h2>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-success" onClick={signin}>
          Sign in
        </button>
      </div>
    </>
  );
}

export default Login;
