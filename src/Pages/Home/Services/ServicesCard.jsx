import React from "react";

const ServicesCard = ({ service }) => {
    const { icon: Icon, title, description } = service;
    return (
        <div data-aos="fade-up" className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition-all duration-300 hover:bg-[#dceab4] hover:text-black flex flex-col justify-center items-centen">
            <div className="text-4xl text-primary mb-4">
                <Icon />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default ServicesCard;
