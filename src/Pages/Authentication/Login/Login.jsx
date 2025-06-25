import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { userLogin } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    console.log(location);

    const from = location?.state || "/";

    const onSubmit = async(data) => {
        // console.log(data);
        try {
            const result = await userLogin(data.email, data.password)  
            if(result){
                toast.success("Login Successful");
                navigate(from, { replace: true });
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="space-y-5 flex flex-col justify-self-center w-full max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
                <div className="mb-5">
                    <h1 className="text-3xl font-bold text-center">
                        Login Now!!
                    </h1>
                </div>
                <fieldset className="fieldset space-y-4">
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
                    <div>
                        <a className="link link-hover">Forgot password?</a>
                    </div>
                </fieldset>
                <div className="flex justify-center">
                    <button className="btn btn-primary text-black mt-4 w-full">
                        Login
                    </button>
                </div>
                <p className="mt-2">
                    Didn't Register with us?{" "}
                    <Link className="underline text-blue-500" to="/register">
                        Register
                    </Link>
                </p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;
