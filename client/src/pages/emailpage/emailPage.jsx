// --- ADDED ---
// Import the markdown renderer
import ReactMarkdown from "react-markdown";

import { useEffect, useState } from "react";
import { ChevronDownIcon, UserCircleIcon } from "../../assets/svg/emails";
import axiosClient from "../../axiosClient";
import EmailModal from "../../components/emailPage/emailModal";
import EmailCard from "../../components/emailPage/emailCard";
import { toast } from "sonner";
import { getWithExpiry } from "../../utils/utilFunctions";

// --- Your Main Page Component (No Changes Needed Here) ---
const EmailPage = () => {
  try {
    // State for the dropdown
    const [emailCount, setEmailCount] = useState(15); // Default X=15
    const [emailDataArray, setEmailDataArray] = useState(null);
    const [isAIClassifying, setIsAIClassifying] = useState(false);

    // This state will hold the email object to be shown in the modal
    const [selectedEmail, setSelectedEmail] = useState(null);

    const currentUser = getWithExpiry("currentUser");

    // const isAuthenticated = getWithExpiry("isAuthenticated");
    // console.log(isAuthenticated, " in emailPage");

    useEffect(() => {
      async function fetchEmail() {
        const emailData = await axiosClient.get(
          `/email/messages?maxResults=${emailCount}`
        );
        // console.log(emailData.data);
        setEmailDataArray(emailData.data);
      }
      fetchEmail();
    }, [emailCount]);

    return (
      <div className="w-full">
        <div className="min-h-screen bg-gray-50">
          <div className="flex flex-col gap-8 max-w-5xl mx-auto p-12">
            {/* --- Improved Header --- */}
            <header className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="flex gap-3 items-center">
                {/* User Avatar */}
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full border-2 border-blue-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/48x48/60A5FA/FFF?text=R";
                    }}
                  />
                ) : (
                  <UserCircleIcon className="w-12 h-12 text-gray-400" />
                )}
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-900">
                    {currentUser.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {currentUser.emailId}
                  </span>
                </div>
              </div>
              {/* Styled Logout Button */}
              <div className="flex flex-col gap-2">
                {" "}
                <button
                  onClick={() => {
                    localStorage.removeItem("isAuthenticated");
                    localStorage.removeItem("currentUser");
                    window.location.reload();
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-sm text-white rounded-lg shadow-md hover:bg-red-600 transition-colors font-medium"
                >
                  <span>Logout</span>
                </button>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    className="border-2 rounded-sm pl-2"
                    type="text"
                    placeholder="Update API Key"
                    id="update_gemini_api"
                  />
                  <button
                    onClick={() => {
                      const updated_gemini_api_key =
                        document.getElementById("update_gemini_api").value;
                      if (!updated_gemini_api_key == (null || "")) {
                        localStorage.setItem(
                          "gemini_api_key",
                          `${updated_gemini_api_key}`
                        );
                        toast.success(`Gemini API updated successfully...`)
                        document.getElementById("update_gemini_api").value = "";
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-sm text-white rounded-lg shadow-md hover:bg-red-600 transition-colors font-medium"
                  >
                    <span>Update Gemini API</span>
                  </button>
                </div>
              </div>
            </header>

            {/* --- Improved Controls --- */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              {/* Styled Select Dropdown */}
              <div className="flex items-center gap-2">
                <label
                  htmlFor="emailCount"
                  className="font-medium text-gray-700"
                >
                  Fetch:
                </label>
                <div className="relative">
                  <select
                    id="emailCount"
                    value={emailCount}
                    onChange={(e) => setEmailCount(Number(e.target.value))}
                    className="appearance-none bg-white border text-black border-gray-300 rounded-lg px-4 py-2 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={15}>15 Emails</option>
                    <option value={25}>25 Emails</option>
                    <option value={50}>50 Emails</option>
                  </select>
                  <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Styled Classify Button */}
              <button
                disabled={isAIClassifying}
                onClick={async () => {
                  try {
                    const gemini_api_key =
                      localStorage.getItem("gemini_api_key");

                    // console.log(
                    //   "button mein geminikeykivalue hai: ",
                    //   gemini_api_key
                    // );
                    setIsAIClassifying(true);

                    const aiEmailData = await axiosClient.post("/email/ai", {
                      emailListData: emailDataArray?.filteredMessageArray,
                      gemini_api_key,
                    });

                    if (aiEmailData.data.success == true)
                      toast.success(`AI sucessfully classified your emails...`);

                    setIsAIClassifying(false);

                    setEmailDataArray(aiEmailData.data);

                    // console.log("aiEmailData.data.filteredMessageArray");
                    // console.log(aiEmailData.data.filteredMessageArray);
                  } catch (error) {
                    console.error(error);
                  }
                }}
                className={`w-full sm:w-auto px-6 py-2 ${
                  isAIClassifying
                    ? "bg-gray-300 text-black hover:bg-gray-400"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                } rounded-lg shadow-md transition-colors font-semibold`}
              >
                Classify Emails
              </button>
            </div>

            {/* --- Email List Section --- */}
            <main className="flex flex-col gap-4">
              {/* {console.log("hello", emailDataArray?.filteredMessageArray.length)} */}

              {emailDataArray?.filteredMessageArray?.length > 0 ? (
                emailDataArray?.filteredMessageArray.map((email, index) => (
                  <EmailCard
                    key={email.id}
                    sender={email.from}
                    label={email.label || ""}
                    bodySnippet={email.snippet}
                    // Pass the click handler to set the selected email
                    onClick={() => setSelectedEmail(email)}
                  />
                ))
              ) : (
                // A placeholder for when no emails are loaded
                <div className="text-center text-gray-500 p-10 bg-white rounded-lg shadow-md">
                  Click "Classify Emails" to fetch and categorize your inbox.
                </div>
              )}
            </main>
          </div>
        </div>

        {/* This will render the modal component *only* if 'selectedEmail' is not null. */}
        {selectedEmail && (
          <EmailModal
            email={selectedEmail}
            onClose={() => setSelectedEmail(null)}
          />
        )}
      </div>
    );
  } catch (error) {
    console.error(`Error in emailPage.jsx: `, error);
  }
};

export default EmailPage;
