
import ReactMarkdown from "react-markdown";

const EmailCard = ({ sender, label, bodySnippet, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white hover:cursor-pointer shadow-lg rounded-lg p-4 transition-all hover:shadow-xl border border-gray-200"
    >
      <div className="flex gap-2 justify-between items-center mb-2">
        <div className="text-lg font-semibold text-gray-800">{sender}</div>
        {label && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getLabelColor(
              label
            )}`}
          >
            {label}
          </span>
        )}
      </div>
      <div className="text-gray-600 line-clamp-2"> <ReactMarkdown>{bodySnippet}</ReactMarkdown></div>
    </div>
  );
};

export default EmailCard;