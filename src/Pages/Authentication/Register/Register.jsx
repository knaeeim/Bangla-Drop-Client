import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import toast from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [profilePicture, setProfilePicture] = useState("");
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    const onSubmit = (data) => {
        // console.log(data);
        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result);

                const userInfoForDataBase = {
                    email: data.email,
                    name: data.name,
                    role: "user",
                    created_at: new Date().toISOString(),
                    last_login: new Date().toISOString(),
                }

                const userRes = await axiosInstance.post("/users", userInfoForDataBase);
                console.log(userRes.data);

                const userInfo = {
                    displayName: data.name,
                    photoURL: profilePicture,
                };
                // Update user profile with name and photo URL
                try {
                    const res = await updateUserProfile(userInfo);
                    if(res){
                        toast.success("Profile updated successfully!");
                    }

                } catch (error) {
                    toast.error("Failed to update profile. Please try again.");
                    console.error("Error updating profile:", error);
                }

                navigate("/");
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        console.log(image);
        const formData = new FormData();
        formData.append("image", image);
        const res = await axios.post(
            `https://api.imgbb.com/1/upload?key=${
                import.meta.env.VITE_IMGBB_API_KEY
            }`,
            formData
        );
        setProfilePicture(res.data.data.url);
    };

    return (
        <div className="flex justify-self-center flex-col w-full max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <h1 className="text-3xl font-bold text-center mb-5">
                    Create An Account Now!!
                </h1>
                <fieldset className="fieldset space-y-4">
                    <div>
                        <label className="label">Name</label>
                        <input
                            {...register("name", {
                                required: true,
                            })}
                            type="text"
                            className="input w-full"
                            placeholder="Your Name"
                        />
                        {errors.email?.type === "required" && (
                            <p className="text-red-700 mt-1 font-bold">
                                Name is Required...Don't try to be cleaver
                            </p>
                        )}
                        {errors.name && (
                            <p className="text-red-700 mt-1 font-bold">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="label">Photo Upload</label>
                        <input
                            onChange={handleImageUpload}
                            type="file"
                            className="input w-full pt-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="label">Email</label>
                        <input
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message:
                                        "Please enter a valid email address",
                                },
                            })}
                            type="text"
                            className="input w-full"
                            placeholder="Email"
                        />
                        {errors.email?.type === "required" && (
                            <p className="text-red-700 mt-1 font-bold">
                                Email is Required...Don't try to be cleaver
                            </p>
                        )}
                        {errors.email && (
                            <p className="text-red-700 mt-1 font-bold">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="label">Password</label>
                        <input
                            {...register("password", {
                                required: "password is required",
                                minLength: 6,
                            })}
                            type="password"
                            className="input w-full"
                            placeholder="Password"
                        />
                        {errors.password?.type === "required" && (
                            <p className="text-red-700 mt-1 font-bold">
                                Password is required.
                            </p>
                        )}
                        {errors.password?.type === "minLength" && (
                            <p className="text-red-700 mt-1 font-bold">
                                Password should be min 6 charachers.
                            </p>
                        )}
                    </div>
                </fieldset>
                <div>
                    <button className="btn btn-primary text-black mt-4 w-full">
                        Register Now
                    </button>
                </div>
                <p className="mt-2">
                    Alredey have an account?{" "}
                    <Link className="underline text-blue-500" to="/login">
                        Login
                    </Link>
                </p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;
