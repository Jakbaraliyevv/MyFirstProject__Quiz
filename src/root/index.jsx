import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Test from "../pages/test";

const root = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/test",
    element: <Test />,
  },
]);

export default root;
