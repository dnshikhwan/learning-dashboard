import { AxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { axiosConfig } from "../../axiosConfig";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tokenError = queryParams.get("error") === "tokenError";

  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        token,
        newPassword,
        confirmPassword,
      };

      const response = await axiosConfig.post("/auth/reset-password", data);
      console.log(response.data);
      toast.success(response.data.message);
      return navigate("/auth/signin");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
        console.log(err.response?.data);
        return navigate(err.response?.data.details.redirectUrl);
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Reset password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {tokenError && (
            <Link to={"/auth/request-reset-password"}>
              <p className="text-center px-3.5 py-2.5 bg-red-500 hover:bg-red-700 rounded-md text-white font-semibold text-sm">
                Request new link
              </p>
            </Link>
          )}

          {!tokenError && (
            <form action="#" method="POST" className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    New Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirm_password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleResetPassword}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
