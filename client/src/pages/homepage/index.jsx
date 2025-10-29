import { Navigate } from "react-router";
import GoogleOAuthWrapper from "../../google/googleAuth/googleOAuthWrapper";
import Gemini_Input from "../../components/dashboard/gemini_input";
import { getWithExpiry } from "../../utils/utilFunctions";

export default function HomePage() {
  try {
    const isAuthenticated = getWithExpiry("isAuthenticated");
    const gemini_api_key = localStorage.getItem("gemini_api_key");
    // console.log(isAuthenticated, " : isAuthenticated");
    // console.log(gemini_api_key," : gemin_api_key");

    if (isAuthenticated == true && gemini_api_key)
      return <Navigate to="/emails" />;

    return (
      <div className="w-screen h-screen flex justify-center items-center">
        {isAuthenticated == true ? <Gemini_Input /> : <GoogleOAuthWrapper />}
      </div>
    );
  } catch (error) {
    console.error(`Error in homepage.jsx: `, error);
  }
}
