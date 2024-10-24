"use client";
import { PostComponent } from "@/components/PostComponent";
import React, { useState } from "react";
import Posts from "@/components/Posts";
import profilePic from "@/public/images/profile-pic.jpg"
import Editor from "@/components/Editor"
import Footer from "@/components/Footer";
const Page = () => {

    return (
        <>
            <div
                className="bg-[#0d1017] min-h-screen text-gray-300"
            >
                <PostComponent />
                <div className="flex justify-center items-center">
                    <div className="w-4/5 row-startrow-span-3">
                        <div className="flex items-center mt-3">
                            <h1 className="text-3xl p-1 mb-1">Error</h1>
                            <span
                                className={`text-sm ml-3 border-2 pl-2 pr-2 p-1 rounded-xl bg-blue-600 font-medium text-green-600}`}
                            >
                                Pending
                            </span>
                        </div>
                        <hr className="w-full mb-2 h-0.5 border-0 bg-gray-600 outline-none" />

                        <div className="flex justify-center mt-4">
                            <div className="w-6 h-6 sm:w-12 sm:h-12 rounded-full bg-black mr-4"></div>
                            <div className="w-full">
                                {/* <Posts
                                    profilePic="https://via.placeholder.com/150"
                                    username="Ankit"
                                    text="Here's the code that didn't pass the tests."
                                    code={`const add = (a, b) => a + b;`}
                                    status="pending"
                                /> */}
                            </div>
                        </div>

                        <hr className="w-full mb-2 h-0.5 border-0 bg-gray-600 outline-none" />
                        <h1 className="text-2xl p-1 mb-3 font-semibold">Add Comments</h1>
                        <div className="flex justify-center mb-4">
                            <div className="w-6 h-6 sm:w-12 sm:h-12 rounded-full bg-black mr-4"></div>

                            <div className="w-full rounded-xl">
                                <Editor></Editor>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
            <Footer></Footer>
        </>
    );
};

export default Page;
