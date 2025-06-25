import React from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-router";

const BanglaDropLogo = () => {
    return (
        <Link to="/">
            <div className="flex items-center">
                <img src={logo} alt="Logo"></img>
            </div>
        </Link>
    );
};

export default BanglaDropLogo;
