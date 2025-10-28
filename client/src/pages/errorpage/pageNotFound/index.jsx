export default function PageNotFound() {
    return (
    // Main container, centered on the screen
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 text-gray-900 p-6">
      <div className="max-w-md w-full text-center">
        
        {/* Inline SVG Illustration */}
        {/* This SVG shows a magnifying glass over a "not found" document */}
        <svg 
          className="w-32 h-32 mx-auto text-gray-400 mb-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="1.5" 
          stroke="currentColor" 
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" 
          />
        </svg>
        
        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl font-bold text-blue-600 mb-2">
          404
        </h1>
        
        {/* Sub-heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        
        {/* Explanatory Text */}
        <p className="text-gray-600 mb-8 max-w-sm mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or maybe you just mistyped the URL.
        </p>
        
        {/* Go Home Button */}
        {/* In a real React app with routing, you would replace this <a> tag
            with a <Link> component from react-router-dom:
            import { Link } from 'react-router-dom';
            <Link to="/" className="...">Go Back Home</Link>
        */}
        <a 
          href="/" 
          className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go Back Home
        </a>
        
      </div>
    </div>
  );
}
