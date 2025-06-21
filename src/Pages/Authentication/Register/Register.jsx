import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { createUser } = useAuth();

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="flex justify-self-center flex-col w-full max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <h1 className="text-3xl font-bold text-center mb-5">
                    Create An Account Now!!
                </h1>
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
                </fieldset>
                <div>
                    <button className="btn btn-primary text-black mt-4 w-full">
                        Register Now
                    </button>
                </div>
                <p className="mt-2">
                    Alredey have an account? <Link className="underline text-blue-500" to="/login">Login</Link>
                </p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;
