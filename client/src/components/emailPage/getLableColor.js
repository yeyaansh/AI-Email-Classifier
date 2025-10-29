const getLabelColor = (label) => {
  if (!label) return "bg-indigo-100 text-indigo-800 border-indigo-300"; // Default

  switch (label.toLowerCase()) {
    case "important":
      return "bg-red-100 text-red-800 border-red-300";
    case "promotional":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "social":
      return "bg-green-100 text-green-800 border-green-300";
    case "marketing":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "spam":
      return "bg-gray-100 text-gray-800 border-gray-300";
    default:
      return "bg-indigo-100 text-indigo-800 border-indigo-300";
  }
};


export default getLabelColor;