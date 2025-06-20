import React from "react";
import location from "../../../assets/location-merchant.png";

const BeMerchent = () => {
    return (
        <div
            data-aos="fade-up"
            className="bg-[#03373D] bg-[url(assets/be-a-merchant-bg.png)] md:px-10 md:pb-4 pt-10 my-10 mx-3 shadow-2xl rounded-4xl bg-no-repeat"
        >
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={location} className="max-w-md rounded-lg" />
                <div className="text-white">
                    <h1 className="text-4xl font-bold">
                        Merchant and Customer Satisfaction is Our First Priority
                    </h1>
                    <p className="py-6">
                        We offer the lowest delivery charge with the highest
                        value along with 100% safety of your product. Pathao
                        courier delivers your parcels in every corner of
                        Bangladesh right on time.
                    </p>
                    <div className="flex flex-col md:flex-row gap-3">
                        <button className="btn btn-primary text-black rounded-full">
                            Become a Merchant
                        </button>
                        <button className="btn btn-outline text-primary rounded-full">
                            Earn with Bangla Drop Courier
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeMerchent;
