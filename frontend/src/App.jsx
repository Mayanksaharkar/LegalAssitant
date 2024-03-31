import Home from "./Components/Home";
import Summary from "./Components/Summary";
import "./App.css";
import Layout from "./Components/Layout";
import Chat from "./Components/Chat";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GetStarted from "./Components/GetStarted";
import ContextProvider from "./Context/ContextProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <GetStarted />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/summary",
          element: <Summary />,
        },
        {
          path: "/chat",
          element: <Chat />,
        },
      ],
    },
  ]);

  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
