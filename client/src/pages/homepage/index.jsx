import { Navigate } from "react-router";
import GoogleOAuthWrapper from "../../utils/googleAuth/googleOAuthWrapper";

export default function HomePage() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const gemini_api_key = localStorage.getItem('gemini_api_key');
  console.log(isAuthenticated, " : isAuthenticated");
  console.log(gemini_api_key," : gemin_api_key");
// localStorage.removeItem('gemini_api_key')


  if(isAuthenticated=="true" && gemini_api_key)
    
    return <Navigate to='/emails'/>

  // localStorage.setItem('isAuthenticated', false)
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {isAuthenticated == "true" ? (
        <div className="flex gap-3">
          <input
            id="gemini-key"
            className="border-2 rounded-sm px-3 py-1 text-center w-46"
            type="text"
            placeholder="Enter your Gemini API"
          />
          <button
            onClick={() => {
              const save = document.getElementById("gemini-key").value;

              localStorage.setItem("gemini_api_key", `${save}`);

              window.location.reload();
            }}
            className="bg-black rounded-sm text-white px-3 py-1"
          >
            Save
          </button>
        </div>
      ) : (
        <GoogleOAuthWrapper />
      )}
    </div>
  );
}
