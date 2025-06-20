import { createBrowserRouter } from "react-router";
import RootLayout from "../LayOuts/RootLayout";
import Home from "../Pages/Home/Home/Home";

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
    }
])