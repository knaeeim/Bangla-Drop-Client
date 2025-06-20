import { createBrowserRouter } from "react-router";
import RootLayout from "../LayOuts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayOut from "../LayOuts/AuthLayOut";
import Login from "../Pages/Authentication/Login/Login";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true, 
                element: <Home></Home>
            }
        ]
    }, 
    {
        path: "/", 
        element: <AuthLayOut></AuthLayOut>, 
        children: [
            {
                path: "/login", 
                element: <Login></Login>
            }
        ]
    }
])