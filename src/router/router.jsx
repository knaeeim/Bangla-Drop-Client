import { createBrowserRouter } from "react-router";
import RootLayout from "../LayOuts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayOut from "../LayOuts/AuthLayOut";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoutes from "../routes/PrivateRoutes";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashBoardLayOut from "../LayOuts/DashBoardLayOut";
import MyParcel from "../Pages/Dashboard/MyParcel";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true, 
                element: <Home></Home>
            }, 
            {
                path: "/coverage", 
                element: <Coverage></Coverage>
            },
            {
                path: "/about", 
                element: <div>This is about page</div>
            },
            {
                path: "/sendParcel",
                element: <PrivateRoutes>
                    <SendParcel></SendParcel>
                </PrivateRoutes>,
                loader: () => fetch('./warehouses.json')
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
            }, 
            {
                path: "/register", 
                element: <Register></Register>
            }
        ]
    },
    {
        path: "/dashboard", 
        element: <PrivateRoutes>
            <DashBoardLayOut></DashBoardLayOut>
        </PrivateRoutes>,
        children: [
            {
                path: "my-parcel",
                element: <MyParcel></MyParcel>
            }
        ]
    }
])