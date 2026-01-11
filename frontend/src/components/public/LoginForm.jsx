import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { userLogin } from "../../helpers/helpers";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const loginMutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      dispatch({ type: "LOGIN", payload: data });
      navigate("/dashboard");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const user = { email, password };

    loginMutation.mutate(user);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        action=""
        className="w-full max-w-md mx-auto flex flex-col gap-4"
      >
        {/* Email */}
        <div className="w-full flex flex-col items-start gap-1.5">
          <label htmlFor="email" className="font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="john@gmail.com"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Password */}
        <div className="w-full flex flex-col items-start gap-1.5">
          <label htmlFor="password" className="font-medium text-gray-700">
            Password
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 pr-11 rounded-lg border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <p className="text-red-500 text-xs font-medium">
            {loginMutation.error?.response?.data?.error}
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2.5 bg-blue-500 hover:bg-blue-600 active:scale-[0.98] text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all"
        >
          Log In
        </button>

        {/* Register link */}
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-600 hover:text-blue-700 font-medium">
            Register
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
