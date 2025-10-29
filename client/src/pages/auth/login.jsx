import { useGoogleLogin } from "@react-oauth/google";
import axiosClient from "../../axiosClient";
import { toast } from "sonner";
import { getWithExpiry, setWithExpiry } from "../../utils/utilFunctions";

export default function GoogleLoginPage() {
  // const isAuthenticated = getWithExpiry("isAuthenticated");

  const googleResponse = async (authResponse) => {
    try {
      if (authResponse.code) {
        // console.log("authResponse");
        // console.log(authResponse);
        const result = await axiosClient.post(`/auth/google/login`, {
          code: authResponse.code,
        });
        // console.log("result: ", result);
        const { emailId, name, avatar } = result.data.reply;

        // console.log("result.data");
        // console.log(result.data);

        if (result.data.success) {
          {
            toast.success(`${result.data.message}`);
            setWithExpiry(`isAuthenticated`, result.data.success, 3600000);
          }
          const userData = {
            emailId,
            name,
            avatar,
          };

          setWithExpiry("currentUser", userData, 3600000);
          setTimeout(() => window.location.reload(), 1000);
        }
      }
    } catch (error) {
      console.error("Error while requesting google code for login: ", error);
    }
  };

  const googleLogin = useGoogleLogin({
    scope:
      "openid email profile https://www.googleapis.com/auth/gmail.readonly",
    onSuccess: googleResponse,
    onError: googleResponse,
    flow: "auth-code",
  });

  return (
    <div className="w-screen">
      <div className="flex flex-col items-center gap-4 justify-center h-screen">
        <button
          onClick={googleLogin}
          className="bg-black rounded-lg text-2xl font-bold text-white px-5 py-3"
        >
          Login With Google
        </button>
      </div>
    </div>
  );
}
