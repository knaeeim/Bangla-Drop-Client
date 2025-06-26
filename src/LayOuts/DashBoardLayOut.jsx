import React from "react";
import { Link, Outlet } from "react-router";
import BanglaDropLogo from "../Pages/Shared/BanglaDropLogo/BanglaDropLogo";

const DashBoardLayOut = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center md:mt-16">
                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none">
                        <label
                            htmlFor="my-drawer-2"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">DashBoard</div>
                </div>
                {/* Page content here */}
                <h1 className="text-center text-3xl font-bold text-green-700">Welcome to User DashBoard</h1>
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="w-20 h-20 flex items-center justify-center">
                    <BanglaDropLogo></BanglaDropLogo>
                </div>
                <ul className="menu bg-base-300 text-base-content min-h-screen md:min-h-[calc(100vh-80px)] w-80 shadow-2xl p-4">
                    {/* Sidebar content here */}
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/my-parcel">My Parcels</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashBoardLayOut;
