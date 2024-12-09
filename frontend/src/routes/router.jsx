import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../pages/Homepage";
import Categorypage from "../pages/Categorypage";
import Searchpage from "../pages/Searchpage";
import Shoppage from "../pages/Shoppage";
import Itempage from "../pages/Itempage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProfileSettings from "../pages/profileSettings";
import CreatePost from "../pages/createPost";


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
  },

  {
    path: "/register",
    element: <Register />
  },

  {
    path: "/profile-settings",
    element: <ProfileSettings/>
  },

  {path: "/create-post",
    element: <CreatePost/>
  }
]);

export default router;