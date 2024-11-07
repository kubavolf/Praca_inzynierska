import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../pages/Homepage";
import Categorypage from "../pages/Categorypage";
import Searchpage from "../pages/Searchpage";
import Shoppage from "../pages/Shoppage";
import Itempage from "../pages/Itempage";
import Login from "../pages/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />
      },
      {
        path: "/categories/:categoryName",
        element: <Categorypage />

      },
      {
        path: "/search",
        element: <Searchpage />
      },
      {
        path: "/shop",
        element: <Shoppage />
      },
      {
        path: "/shop/:id",
        element: <Itempage />
      }


    ]
  },
  {
    path: "/login",
    element: <Login />
  }
]);

export default router;