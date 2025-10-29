import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { getWithExpiry } from "../../utils/utilFunctions";

const EmailLayout = () => {
  const isAuthenticated = getWithExpiry("isAuthenticated");
  const gemini_api_key = localStorage.getItem("gemini_api_key");
  // console.log(isAuthenticated, " : isAuthenticated");
  // console.log(gemini_api_key, " : gemin_api_key");

  if (
    isAuthenticated == (false || null || undefined) ||
    gemini_api_key == (null || "" || undefined)
  )
    return <Navigate to="/"></Navigate>;
  return (
    <div>
      {/* <div>EmailLayout</div> */}
      <Outlet />
    </div>
  );
};

export default EmailLayout;
