import { useState } from "react";
import { toast } from "react-toastify";
import { editPost } from "@/lib/action"; // Ensure this function is defined in your API actions
import { FaEdit } from "react-icons/fa";
import Editor from "./Editor"
import { useRouter } from "next/navigation";
const EditModal = ({ post ,field,setReRender}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [status, setStatus] = useState(post.status)
    const [text,setText]=useState(post.issue)
    const router=useRouter();
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleEdit = async () => {
        setLoading(true);
        console.log(field,post._id,status,title,text);
        try {
            const response = await editPost(field,post._id,status,title,text);
            if (response.success) {
                toast.success("Post updated successfully!");
                setReRender(prev=>prev+1)
                closeModal();
            } else {
                toast.error("Failed to update post.");
            }
        } catch (error) {
            toast.error("An error occurred while updating.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div onClick={openModal} className="cursor-pointer text-gray-200 hover:text-blue-700 transition-all duration-150">
                <span><FaEdit></FaEdit></span>
            </div>

            {isOpen && (
                <div className="fixed p-4 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-200 ease-out">
                    <div className="bg-gray-900 shadow-lg rounded-xl p-6 w-5/6 relative animate-slide-up">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-400 transition-colors"
                        >
                            ✕
                        </button>
                        <h3 className="text-lg font-bold text-white mb-4">Edit Post</h3>

                        <div className="mb-4">
                            <label className="text-gray-300 mb-2 block">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 rounded-xl bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors duration-150"
                                placeholder="Edit post title"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text-gray-300 mb-2 block">Status</label>
                            <select
                                className="w-full p-2 border border-gray-300 text-gray-300 bg-transparent rounded mt-1"
                                value={status} onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Pending" className='bg-[#0d1017] text-gray-300'>Pending</option>
                                <option value="Resolved" className='bg-[#0d1017] text-gray-300'>Resolved</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="text-gray-300 mb-2 block">Content</label>
                            <Editor text={text} setText={setText}></Editor>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-xl font-medium hover:bg-gray-600 transition-colors duration-150"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEdit}
                                disabled={loading}
                                className={`px-4 py-2 text-white rounded-xl font-medium transition-colors duration-150 ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'
                                    }`}
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditModal;
