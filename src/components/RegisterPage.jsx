"use client";
import Link from "next/link";
import { FaUser, FaKey } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { useForm } from "react-hook-form";
import { HiExclamationCircle } from "react-icons/hi";
import { register as registerUser } from "@/lib/action"; // Renaming the import to avoid conflict
import { signIn } from "next-auth/react";
const RegisterPage = () => {
    const {
        register, // useForm's register
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        try {
    
            const response = await registerUser(data); // Use the renamed `registerUser` function
            if(response.success){
                const result = await signIn("credentials", {
                    redirect: false,
                    username:data.username,
                    email: data.email,
                    password: data.password,
                });
    
                if (result.error) {
                    console.error("Login failed:", result.error);
                } else {
                    //console.log("Login successful");
                    
                }
            }
            //console.log("Registration successful", response);
        } catch (error) {
            throw new Error(error)
        }
    };

    return (
        <div className="relative w-screen h-screen">
            <div
                className="absolute inset-0 bg-[url('https://cdn6.f-cdn.com/files/download/117716550/3ddesignti.jpg')] bg-cover bg-center blur-sm"
                style={{ zIndex: -1 }}
            ></div>

            <div className="absolute inset-0 flex items-center justify-center ">
                <form
                    className="bg-opacity-80 bg-gray-900 text-white p-8 rounded-xl shadow-2xl flex flex-col space-y-6 w-[350px] md:w-[400px]"
                    onSubmit={handleSubmit(onSubmit)} // Corrected submission handler
                >
                    <div className="text-center text-3xl mb-6 font-bold">
                        Register
                    </div>

                    {/* Username Field */}
                    <div className="relative">
                        <input
                            type="text"
                            className="text-center bg-transparent placeholder-gray-400 px-4 py-3 pr-12 w-full border-2 border-gray-200 rounded-[20px] focus:outline-none focus:border-blue-500"
                            placeholder="Enter Username"
                            {...register('username', {
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message: "Username must be at least 3 characters"
                                }
                            })}
                        />
                        <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        {errors.username && (
                            <div className="absolute top-full left-0 mt-1 flex items-center text-red-500 text-xs">
                                <HiExclamationCircle className="mr-1" />
                                {errors.username.message}
                            </div>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                        <input
                            type="text"
                            className="text-center bg-transparent placeholder-gray-400 px-4 py-3 pr-12 w-full border-2 border-gray-200 rounded-[20px] focus:outline-none focus:border-blue-500"
                            placeholder="Enter Email"
                            {...register('email', {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Enter a valid email"
                                }
                            })}
                        />
                        <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        {errors.email && (
                            <div className="absolute top-full left-0 mt-1 flex items-center text-red-500 text-xs">
                                <HiExclamationCircle className="mr-1" />
                                {errors.email.message}
                            </div>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <input
                            type="password"
                            className="text-center bg-transparent placeholder-gray-400 px-4 py-3 pr-12 w-full border-2 border-gray-200 rounded-[20px] focus:outline-none focus:border-blue-500"
                            placeholder="Enter Password"
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: "Length >= 8 + special characters"
                                }
                            })}
                        />
                        <FaKey className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        {errors.password && (
                            <div className="absolute top-full left-0 mt-1 flex items-center text-red-500 text-xs">
                                <HiExclamationCircle className="mr-1 " />
                                {errors.password.message}
                            </div>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="relative">
                        <input
                            type="password"
                            className="text-center bg-transparent placeholder-gray-400 px-4 py-3 pr-12 w-full border-2 border-gray-200 rounded-[20px] focus:outline-none focus:border-blue-500"
                            placeholder="Confirm Password"
                            {...register("confirm_password", {
                                required: "Confirm Password is required"
                            })}
                        />
                        <FaKey className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        {errors.confirm_password && (
                            <div className="absolute top-full left-0 mt-1 flex items-center text-red-500 text-xs">
                                <HiExclamationCircle className="mr-1" />
                                {errors.confirm_password.message}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-medium text-[2.5vh] px-4 py-3 rounded-[20px] hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none"
                    >
                        Register
                    </button>

                    <div className="text-center text-gray-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-400 font-semibold hover:underline">
                            Login
                        </Link>
                    </div>

                    <hr />

                    <div className="flex justify-between space-x-4">
                        <div className="flex items-center justify-center w-full p-3 text-center bg-white text-black rounded-[20px] hover:bg-gray-200 transition-all cursor-pointer shadow-md">
                            <FcGoogle className="mr-2 text-xl" /> <div className="font-medium">Google</div>
                        </div>
                        <div className="flex items-center justify-center w-full p-3 text-center bg-black text-white rounded-[20px] hover:bg-gray-900 transition-all cursor-pointer shadow-md">
                            <ImGithub className="mr-2 text-xl" /> <div className="font-medium">Github</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
