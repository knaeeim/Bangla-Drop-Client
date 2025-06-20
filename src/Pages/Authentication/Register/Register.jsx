import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {

    const { register, handleSubmit, formState : { errors }} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className="flex justify-self-center w-full max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <h1 className="text-3xl font-bold text-center mb-5">
                    Create An Account Now!!
                </h1>
                <fieldset className="fieldset space-y-4">
                    <div>
                        <label className="label">Email</label>
                        <input
                            {...register("email", { required: true, pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: "Please enter a valid email address"
                            } })}
                            type="text"
                            className="input w-full"
                            placeholder="Email"
                        />
                        {errors.email?.type === "required" && (
                            <p className="text-red-700 mt-1 font-bold">Email is Required...Don't try to be cleaver</p>
                        )}
                        {errors.email && (
                            <p className="text-red-700 mt-1 font-bold">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="label">Password</label>
                        <input
                            {...register("password", { required: "password is required", minLength: 6 })}
                            type="password"
                            className="input w-full"
                            placeholder="Password"
                        />
                        {
                            errors.password?.type === "required" && <p className="text-red-700 mt-1 font-bold">Password is required.</p>
                        }
                        {
                            errors.password?.type === "minLength" && <p className="text-red-700 mt-1 font-bold">Password should be min 6 charachers.</p>
                        }
                    </div>
                    <div>
                        <a className="link link-hover">Forgot password?</a>
                    </div>
                </fieldset>
                <div>
                    <button className="btn btn-neutral mt-4 w-full">Register Now</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
