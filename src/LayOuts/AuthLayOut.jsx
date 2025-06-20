import React from "react";
import BanglaDropLogo from "../Pages/Shared/BanglaDropLogo/BanglaDropLogo";
import authImg from "../assets/authImage.png";
import { Outlet } from "react-router";

const AuthLayOut = () => {
    return (
        <div className="bg-base-200 p-12">
            <div className="w-20">
                <BanglaDropLogo></BanglaDropLogo>
            </div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="flex-1 flex justify-center items-center">
                    <img src={authImg} className="max-w-sm rounded-lg" />
                </div>
                <div className="flex-1 w-full">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayOut;
