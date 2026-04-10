import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
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
      await axios.post("http://localhost:5000/users/register", form);

      // slight delay feels intentional (not forced)
      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (err) {
      setError(err.response?.data?.error || "registration failed");
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
          <p className="text-gray-400 text-sm mb-2">create access</p>
          <h2 className="text-3xl leading-snug font-medium">
            start tracking <br /> what actually matters
          </h2>
        </div>

        <p className="text-xs text-gray-600">minimal setup • no friction</p>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm px-6">
          <div className="bg-[#171717] border border-gray-800 p-6 rounded-xl shadow-lg translate-y-2">
            <h2 className="text-lg font-medium mb-6">register</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* username */}
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

              {/* password */}
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
                {loading ? "creating..." : "create account"}
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-6 text-center">
              already have access?{" "}
              <span
                onClick={() => navigate("/")}
                className="underline cursor-pointer hover:text-white"
              >
                sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
