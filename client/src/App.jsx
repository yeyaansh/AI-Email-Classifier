import "./App.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import HomePage from "./pages/homepage";
import PageNotFound from "./pages/errorpage/pageNotFound";
import EmailPage from "./pages/emailpage/emailPage";
import EmailLayout from "./layouts/email/emailLayout";

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  // console.log(isAuthenticated);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },

    {
      path: "/emails",
      Component: EmailLayout,
      children: [
        {
          index: true,
          element: <EmailPage />,
        },
      ],
    },

    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
