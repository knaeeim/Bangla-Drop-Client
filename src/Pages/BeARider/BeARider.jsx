import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import toast from "react-hot-toast";

const BeARider = () => {
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [selectedRegion, setSelectedRegion] = useState("");
    const axiosSecure = useAxiosSecure();
    const servicesCenters = useLoaderData();


    const regions = [
        ...new Set(servicesCenters.map((center) => center.region)),
    ];
    const districts = servicesCenters
        .filter((s) => s.region === selectedRegion)
        .map((s) => s.district);

    const onSubmit = async(data) => {
        console.log(data);
        const riderData = {
            ...data, 
            name: user?.displayName, 
            email: user?.email,
            status: "pending",
            created_at: new Date().toISOString(),
        }
        const res = await axiosSecure.post("/riders", riderData)
        console.log(res);
        if(res.data.insertedId){
            toast.success("Your request has been sent successfully!");
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-base-200 rounded-2xl shadow">
            <h1 className="text-center font-bold text-3xl">
                Be A Rider Request...
            </h1>
            <p className="text-center text-lg mt-4">
                If you want to be a rider, please fill out the form below.
            </p>
            <div className="">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="font-bold">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                readOnly
                                value={user?.displayName || ""}
                                className="input w-full mt-2"
                            />
                        </div>
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="font-bold">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                readOnly
                                value={user?.email || ""}
                                className="input w-full mt-2"
                            />
                        </div>
                        {/* Age */}
                        <div>
                            <label htmlFor="age" className="font-bold">
                                Age <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Enter your age"
                                className="input w-full mt-2"
                                {...register("age", {
                                    required: true,
                                    min: 18,
                                    max: 45,
                                })}
                            />
                            {errors.age && (
                                <span className="text-red-500 font-bold text-xs mt-2">
                                    Your age must be between 18 and 45 years
                                    old.
                                </span>
                            )}
                        </div>
                        {/* Phone Number */}
                        <div>
                            <label htmlFor="Phone" className="font-bold">
                                Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                className="input w-full mt-2"
                                {...register("phone", {
                                    required: true,
                                    minLength: 10,
                                    maxLength: 15,
                                })}
                            />
                            {errors.phone && (
                                <span className="text-red-500 text-xs font-bold mt-2">
                                    Your phone number must be between 10 and 15
                                    digits long.
                                </span>
                            )}
                        </div>
                        {/* NID Number */}
                        <div>
                            <label htmlFor="nationalID" className="font-bold">
                                National ID
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Enter your National ID"
                                className="input w-full mt-2"
                                {...register("nationalID", {
                                    required: true,
                                })}
                            />
                            {errors.nationalID && (
                                <span className="text-red-500 font-bold text-xs mt-2">
                                    {errors.nationalID.message}
                                </span>
                            )}
                        </div>
                        {/* select Region */}
                        <div>
                            <label htmlFor="region" className="font-bold">
                                Region<span className="text-red-500">*</span>
                            </label>
                            <select
                                className="select w-full mt-2"
                                {...register("region", {
                                    required: true,
                                })}
                                onChange={(e) =>setSelectedRegion(e.target.value)}
                                >
                                <option value="">Select Your Region</option>
                                {regions.map((region, idx) => (
                                    <option key={idx} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </select>
                            {/* option code will come here... */}
                        </div>
                        {/* Select District */}
                        <div>
                            <label htmlFor="Region" className="font-bold">
                                District<span className="text-red-500">*</span>
                            </label>
                            <select
                                className="select w-full mt-2"
                                {...register("district", {
                                    required: true,
                                })}>
                                <option value={" "}>
                                    Select Your District
                                </option>
                                {
                                    districts.map((district, idx) => (
                                        <option key={idx} value={district}>{district}</option>
                                    ))
                                }
                            </select>
                            {/* option code will come here... */}
                        </div>
                        {/* Bike Brand */}
                        <div>
                            <label htmlFor="BikeBrand" className="font-bold">
                                Bike Brand
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your Bike Brand"
                                className="input w-full mt-2"
                                {...register("bikeBrand", {
                                    required: true,
                                })}
                            />
                        </div>
                        {/* Bike Registration */}
                        <div>
                            <label
                                htmlFor="bikeRegistration"
                                className="font-bold">
                                Bike Registration
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Enter your Bike Registration"
                                className="input w-full mt-2"
                                {...register("bikeRegistration", {
                                    required: true,
                                })}
                            />
                        </div>
                        {/* Additional Info */}
                        <div>
                            <label
                                htmlFor="Additional Info"
                                className="font-bold">
                                Additional Info
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your Additional Info"
                                className="input w-full mt-2"
                                {...register("additionalInfo")}
                            />
                        </div>
                    </div>
                    <div className="text-center mt-10 w-full">
                        <button className="btn btn-primary text-black w-full">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BeARider;
