import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { useAuth } from "../../hooks/useAuth";
import { updateProfile } from "../../helpers/helpers";

const SettingsForm = () => {
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();

  const userMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      dispatch({ type: "LOGIN", payload: data });
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log(error);
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

    const updatedUser = {};

    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;
    if (password && password.trim() !== "") updatedUser.password = password;
    if (age) updatedUser.age = parseInt(age);
    if (diabetesType) updatedUser.diabetesType = diabetesType;
    if (min || max) {
      updatedUser.targetGlucose = {};
      if (min) updatedUser.targetGlucose.min = parseInt(min);
      if (max) updatedUser.targetGlucose.max = parseInt(max);
    }

    userMutation.mutate(updatedUser);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* User Name */}
        <div className="w-full flex flex-col items-start gap-2">
          <label htmlFor="username" className="font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Your Name"
            defaultValue={user.name}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 hover:cursor-text"
          />
        </div>

        {/* Email */}
        <div className="w-full flex flex-col items-start gap-2">
          <label htmlFor="email" className="font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            defaultValue={user.email}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 hover:cursor-text"
          />
        </div>

        {/* Password */}
        <div className="w-full flex flex-col items-start gap-2">
          <label htmlFor="password" className="font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="New Password"
            minLength={6}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 hover:cursor-text"
          />
          <p className="text-xs text-gray-500">Leave blank to keep current password.</p>
        </div>

        {/* Age */}
        <div className="w-full flex flex-col items-start gap-2">
          <label htmlFor="age" className="font-medium text-gray-700">
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            placeholder="Age"
            min={0}
            defaultValue={user.age}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 hover:cursor-text"
          />
        </div>

        {/* Diabetes Type */}
        <div className="col-span-1 md:col-span-2 w-full flex flex-col items-start gap-2">
          <label htmlFor="diabetesType" className="font-medium text-gray-700">
            Diabetes Type
          </label>

          <div className="relative w-full">
            <select
              name="diabetesType"
              id="diabetesType"
              defaultValue={user.diabetesType}
              className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-300 shadow-sm bg-white appearance-none transition-all text-black"
            >
              <option value="type1">Type 1</option>
              <option value="type2">Type 2</option>
              <option value="gestational">Gestational</option>
              <option value="prediabetes">Prediabetes</option>
            </select>

            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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

        {/* Target Glucose */}
        <div className="w-full flex flex-col items-start gap-2">
          <label htmlFor="minGlucose" className="font-medium text-gray-700">
            Min Glucose
          </label>
          <input
            type="number"
            name="minGlucose"
            id="minGlucose"
            placeholder="Min Glucose"
            min={50}
            max={140}
            defaultValue={user.targetGlucose.min}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 hover:cursor-text"
          />
        </div>

        {/* Target Glucose */}
        <div className="w-full flex flex-col items-start gap-2">
          <label htmlFor="maxGlucose" className="font-medium text-gray-700">
            Max Glucose
          </label>
          <input
            type="number"
            name="maxGlucose"
            id="maxGlucose"
            placeholder="Max Glucose"
            min={100}
            max={340}
            defaultValue={user.targetGlucose.max}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 hover:cursor-text"
          />
        </div>

        <div>
          <p className="text-red-500 text-xs font-medium">
            {userMutation.error?.response?.data?.error}
          </p>
        </div>

        <button
          type="submit"
          disabled={userMutation.isPending}
          className="w-full col-span-1 md:col-span-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium shadow-sm hover:cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {userMutation.isPending ? "Saving Changes" : "Save Changes"}
        </button>
      </form>
    </>
  );
};

export default SettingsForm;
