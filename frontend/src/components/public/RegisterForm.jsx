import { useState } from "react";
import { data, Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { userRegister } from "../../helpers/helpers";
import { Eye, EyeOff } from "lucide-react";

const RegisterForm = () => {
  const [diabetesType, setDiabetesType] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const registerMutation = useMutation({
    mutationFn: userRegister,
    onSuccess: (data) => {
      dispatch({ type: "REGISTER", payload: data });
      navigate("/dashboard");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const age = formData.get("age");
    const diabetesType = formData.get("diabetesType");
    const min = formData.get("minGlucose");
    const max = formData.get("maxGlucose");

    const targetGlucose = { min, max };
    const user = { name, email, password, age, diabetesType, targetGlucose };

    registerMutation.mutate(user);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        action=""
        className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* User Name */}
        <div className="w-full flex flex-col items-start gap-1.5">
          <label htmlFor="username" className="text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            name="username"
            placeholder="John Doe"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Email */}
        <div className="w-full flex flex-col items-start gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="john@gmail.com"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Password */}
        <div className="w-full flex flex-col items-start gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
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

        {/* Age */}
        <div className="w-full flex flex-col items-start gap-1.5">
          <label htmlFor="age" className="text-sm font-medium text-gray-700">
            Age
          </label>
          <input
            type="number"
            name="age"
            placeholder="25"
            min={0}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Diabetes Type */}
        <div className="col-span-1 md:col-span-2 w-full flex flex-col items-start gap-1.5">
          <label htmlFor="diabetesType" className="text-sm font-medium text-gray-700">
            Diabetes Type
          </label>

          <div className="relative w-full">
            <select
              onChange={(e) => setDiabetesType(e.target.value)}
              name="diabetesType"
              id="diabetesType"
              defaultValue=""
              className={`w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-300 shadow-sm bg-white appearance-none text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                diabetesType === "" ? "text-gray-400" : "text-gray-900"
              }`}
              required
            >
              <option value="" disabled hidden>
                Select a type
              </option>
              <option value="type1">Type 1</option>
              <option value="type2">Type 2</option>
              <option value="gestational">Gestational</option>
              <option value="prediabetes">Prediabetes</option>
            </select>

            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Min Glucose */}
        <div className="w-full flex flex-col items-start gap-1.5">
          <label htmlFor="minGlucose" className="text-sm font-medium text-gray-700">
            Min Glucose
          </label>
          <input
            type="number"
            name="minGlucose"
            placeholder="70"
            min={50}
            max={140}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Max Glucose */}
        <div className="w-full flex flex-col items-start gap-1.5">
          <label htmlFor="maxGlucose" className="text-sm font-medium text-gray-700">
            Max Glucose
          </label>
          <input
            type="number"
            name="maxGlucose"
            placeholder="140"
            min={100}
            max={340}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div className="w-full col-span-1 md:col-span-2">
          <p className=" text-red-500 text-xs font-medium">
            {registerMutation.error?.response?.data?.error}
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full col-span-1 md:col-span-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 active:scale-[0.98] text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all mt-2"
        >
          Register
        </button>

        {/* Login link */}
        <p className="col-span-1 md:col-span-2 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to={"/login"} className="text-blue-600 hover:text-blue-700 font-medium">
            Log In
          </Link>
        </p>
      </form>
    </>
  );
};

export default RegisterForm;
