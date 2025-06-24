import React from "react";
import { Link, NavLink } from "react-router";
import BanglaDropLogo from "../BanglaDropLogo/BanglaDropLogo";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
    const { user, logOutUser } = useAuth();

    const handleLogout = () => {
        logOutUser()
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const navItems = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/sendParcel">Send a Parcel</NavLink>
            </li>
            <li>
                <NavLink to="/coverage">Coverage</NavLink>
            </li>

            {user && (
                <>
                    <li>
                        <NavLink to="/dashboard">DashBoard</NavLink>
                    </li>
                </>
            )}

            <li>
                <NavLink to="/about">About Us</NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm rounded-2xl md:px-10 px-2 mb-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {" "}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />{" "}
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        {navItems}
                    </ul>
                </div>
                <div className="w-20">
                    <BanglaDropLogo></BanglaDropLogo>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>
            {user ? (
                <div className="navbar-end gap-4">
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                            <img src={user?.photoURL} />
                        </div>
                    </div>
                    <Link
                        onClick={handleLogout}
                        to="/login"
                        className="btn btn-primary text-black"
                    >
                        Logout
                    </Link>
                </div>
            ) : (
                <div className="navbar-end gap-4">
                    <Link to="/login" className="btn btn-primary text-black">
                        Login
                    </Link>
                    <Link to="/register" className="btn btn-primary text-black">
                        Register
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;
