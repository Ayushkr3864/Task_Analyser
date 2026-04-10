import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router"

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        form,
        { withCredentials: true }, // for cookies
      );

      if (res.data?.user) {
        navigate("/tasks"); // redirect immediately
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0f0f0f] text-white">
      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-between w-1/2 p-10 border-r border-gray-800">
        <h1 className="text-2xl tracking-tight font-semibold">task.system</h1>

        <div>
          <p className="text-gray-400 text-sm mb-2">internal access only</p>
          <h2 className="text-3xl leading-snug font-medium">
            manage your tasks <br /> without distractions
          </h2>
        </div>

        <p className="text-xs text-gray-600">
          v1.0 • minimal interface • no noise
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-center relative">
        <div className="w-full max-w-sm px-6">
          {/* Slight offset card (human feel) */}
          <div className="bg-[#171717] border border-gray-800 p-6 rounded-xl shadow-lg translate-y-2">
            <h2 className="text-lg font-medium mb-6">sign in</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400">username</label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full mt-1 bg-transparent border-b border-gray-700 focus:border-white outline-none py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400">password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full mt-1 bg-transparent border-b border-gray-700 focus:border-white outline-none py-2 text-sm"
                />
              </div>

              {error && <p className="text-red-400 text-xs">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 mb-6 bg-white text-black py-2 text-sm hover:bg-gray-200 transition"
              >
                {loading ? "authenticating..." : "enter"}
              </button>
            </form>

            <p
              onClick={() => navigate("/register")}
              className="text-xs text-gray-500 mt-20 text-center cursor-pointer hover:text-white"
            >
              no account? just create one from API 🙂
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
