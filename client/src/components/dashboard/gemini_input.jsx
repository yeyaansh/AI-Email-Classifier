import React from "react";
import { toast } from "sonner";

const Gemini_Input = () => {
  return (
    <div className="flex flex-col gap-3">
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

            toast.success(`Gemini API Imported Successfully...`);
            setTimeout(() => window.location.reload(), 1000);
          }}
          className="bg-black rounded-sm text-white px-3 py-1"
        >
          Save
        </button>
      </div>
      <p>
        To get your Gemini API{" "}
        <a
          target="_blank"
          className="font-bold"
          href="https://aistudio.google.com/api-keys"
        >
          Click Here
        </a>
      </p>
    </div>
  );
};

export default Gemini_Input;
