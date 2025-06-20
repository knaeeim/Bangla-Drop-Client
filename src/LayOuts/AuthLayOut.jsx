import React from "react";
import BanglaDropLogo from "../Pages/Shared/BanglaDropLogo/BanglaDropLogo";
import authImg from "../assets/authImage.png";
import { Outlet } from "react-router";

const AuthLayOut = () => {
    return (
        <div className="bg-base-200 py-3 px-5">
            <div className="w-48 flex justify-self-center items-center">
                <BanglaDropLogo></BanglaDropLogo>
            </div>
            <div className="hero-content flex-col-reverse items-center lg:flex-row-reverse p-12">
                <div className="flex-1 flex justify-center items-center">
                    <img src={authImg} className="max-w-lg rounded-lg" />
                </div>
                <div className="flex-1 w-full">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayOut;
