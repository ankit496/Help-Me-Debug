"use client"
import { useForm } from 'react-hook-form';
import Editor from "@/components/Editor"
import { useState } from 'react';
import { raiseIssue } from '@/lib/action';
import { useSession, signOut } from 'next-auth/react'
import { toast, ToastContainer } from 'react-toastify';
import Router, { useRouter } from 'next/navigation';
import LoadingPage from './LoadingPage';

function IssueComponent() {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [text, setText] = useState('');
    const { data: session, status } = useSession();
    const router = useRouter();
    const [selectedType, setSelectedType] = useState('Web');
    const onSubmit = async (data) => {

        data.issue = text
        data.userId = session.user.id

        const response = await raiseIssue(data);
        //console.log(response)
        if (response.success === true) {
            setText("");
            reset();
            toast.success("Issue raised successfully!");
        }
        else {
            toast.error(response.error);
        }
    };

    if (status == 'loading') {
        return <LoadingPage/>
    }
    return (
        <>
            {/* <ToastContainer position="top-right" autoClose={5000} /> */}
            <div className="text-white w-4/5 mt-4 ">
                <h2 className="text-3xl font-semibold mb-4">Raise an Issue</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className='block text-gray-100 text-2xl mb-2'>Error</label>
                        {/* Register the input field */}
                        <input
                            {...register("title", { required: "Please enter the issue" })}
                            className='w-full p-2 border border-gray-300 rounded mt-1 bg-transparent'
                            placeholder='Enter Issue'
                        />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-100 text-2xl mb-2">Issue Type</label>
                        <select
                            {...register("type", { required: "Please select an issue type" })}
                            className="w-full p-2 border border-gray-300 text-gray-300 bg-transparent rounded mt-1"
                            value={selectedType} onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option value="Web" className='bg-[#0d1017] text-gray-300'>Web</option>
                            <option value="DSA" className='bg-[#0d1017] text-gray-300'>DSA</option>
                            <option value="Interview" className='bg-[#0d1017] text-gray-300'>Interview</option>
                        </select>
                        {errors.type && <span className="text-red-500 text-sm">{errors.type.message}</span>}
                    </div>
                    <div className='mt-4 text-2xl'>
                        <label className='block text-gray-100 mb-4'>Enter the issue</label>
                        <div className="w-full bg-gray-300">
                            <Editor text={text} setText={setText}></Editor>
                        </div>
                    </div>
                    <div className="flex justify-end mt-2">
                        <button
                            className={`${errors.issueTitle || !text ? 'd-none bg-red-500 text-white' : 'bg-green-500'} text-gray-200 font-semibold p-2 mt-1 rounded-xl mb-2 pl-2 pr-2`}
                            disabled={errors.issueTitle || !text}
                        >
                            Comment
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default IssueComponent;
