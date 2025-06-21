import React from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-router";

const BanglaDropLogo = () => {
    return (
        <Link to="/">
            <div>
                <img src={logo} alt="Logo"></img>
            </div>
        </Link>
    );
};

export default BanglaDropLogo;
