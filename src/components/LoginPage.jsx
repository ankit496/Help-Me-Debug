"use client";
import Link from "next/link";
import { FaUser, FaKey } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { useForm } from "react-hook-form";
import { HiExclamationCircle } from "react-icons/hi";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const { data: session, status } = useSession();
    const router=useRouter();
    if(session){
        router.push("/")
        return;
    }
    const onSubmit = async (data) => {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                username: data.username,
                email: data.email,
                password: data.password,
            });

            if (result.error) {
                console.error("Login failed:", result.error);
            } else {
                //console.log("Login successful");
                // Handle successful login (e.g., redirect or update state)
            }
        } catch (error) {
            console.error("Login error:", error);
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
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="text-center text-3xl mb-6 font-bold">
                        Login
                    </div>

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

                    <div className="relative">
                        <input
                            type="password"
                            className="text-center bg-transparent placeholder-gray-400 px-4 py-3 pr-12 w-full border-2 border-gray-200 rounded-[20px] focus:outline-none focus:border-blue-500"
                            placeholder="Enter Password"
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: "Password must be at least 8 characters long and contain at least one special character"
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

                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-medium text-[2.5vh] px-4 py-3 rounded-[20px] hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none"
                    >
                        Login
                    </button>

                    <div className="text-center text-gray-400">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-blue-400 font-semibold hover:underline">
                            Register
                        </Link>
                    </div>

                    <hr />

                    <div className="flex justify-between space-x-4">
                        <div
                            className="flex items-center justify-center w-full p-3 text-center bg-white text-black rounded-[20px] hover:bg-gray-200 transition-all cursor-pointer shadow-md"
                            onClick={(e) => {
                                e.preventDefault();
                                signIn('google');
                            }}
                        >
                            <FcGoogle className="mr-2 text-xl" /> <div className="font-medium">Google</div>
                        </div>
                        <div
                            className="flex items-center justify-center w-full p-3 text-center bg-black text-white rounded-[20px] hover:bg-gray-900 transition-all cursor-pointer shadow-md"
                            onClick={(e) => {
                                e.preventDefault();
                                signIn('github');
                            }}
                        >
                            <ImGithub className="mr-2 text-xl" />
                            <div className="font-medium">Github</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
