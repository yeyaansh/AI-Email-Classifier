import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginPage from "../../pages/auth/login";

const GoogleOAuthWrapper = () => {
  return (
    <div>
      <GoogleOAuthProvider clientId= {import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <GoogleLoginPage />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleOAuthWrapper;
