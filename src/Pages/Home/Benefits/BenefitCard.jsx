import React from "react";

const BenefitCard = ({ title, description, image }) => {
    return (
        <div data-aos="fade-up" className="card w-full md:h-72 bg-base-100 shadow-md border hover:shadow-lg transition-all p-2">
            <div className="card-body flex flex-col sm:flex-row items-center md:gap-4 gap-10">
                <img
                    src={image}
                    alt={title}
                    className="w-52 h-52 object-contain"
                />
                <div className="divider divider-horizontal hidden sm:flex my-0" />
                <div className="flex flex-col justify-center gap-5 text-center sm:text-left">
                    <h3 className="card-title justify-center md:justify-start text-base-content text-4xl mb-2">
                        {title}
                    </h3>
                    <p className="text-xl text-base-content/70">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BenefitCard;
