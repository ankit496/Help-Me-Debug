"use client";

import React, { useState } from "react";
import Posts from "@/components/Posts";
import Editor from "@/components/Editor"
import Footer from "@/components/Footer";
import { addComment } from "@/lib/action";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Comments from "@/components/Comments"
import Navbar from "@/components/Navbar"
const PostWithReplies = ({ data, setReRender }) => {
    const [text, setText] = useState()
    const { data: session, status } = useSession();
    const { doubts, id } = useParams();
    if (status == 'loading')
        return <>Loading...</>
    const AddComment = async(userId, text, doubts, id)=>{
        const res = await addComment(userId,text,doubts,id);
        if (res.success)
            setReRender((prev) => prev + 1)
    }
return (
    <>
        <div
            className="bg-[#0d1017] min-h-screen text-gray-300"
        >
            <Navbar></Navbar>
            <div className="flex justify-center items-center">
                <div className="w-4/5 row-startrow-span-3">
                    <div>
                        <Posts
                            data={data}
                        />
                    </div>
                    <div className="w-1 h-16 bg-gray-800 mx-16 -m-6"></div>
                    {data.comments ? data.comments.map((comment,index) => <Comments key={index} data={comment} />) : <></>}
                    <h1 className="text-2xl p-1 mb-3 font-semibold">Add Comments</h1>
                    <div className="flex justify-center mb-4">
                        {session.user.image ? (
                            <Image
                                src={session.user.image}
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover mr-2"
                                width={48}
                                height={48}
                                quality={100}
                            />
                        ) : (
                            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-black"></div>
                        )}
                        <div className="w-full rounded-xl">
                            <Editor text={text} setText={setText}></Editor>
                            <div className="flex justify-end mt-2">
                                <button onClick={()=>AddComment(session.user.id,text,doubts,id)} className="bg-green-500 text-gray-200 font-semibold p-2 mt-1 rounded-xl mb-2 pl-2 pr-2">Comment</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <Footer></Footer>
    </>
);
};

export default PostWithReplies;