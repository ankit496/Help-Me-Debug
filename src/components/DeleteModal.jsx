import { useState } from "react";
import { toast } from "react-toastify";
import { deletePost } from "@/lib/action";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
const DeleteModal = ({ postId,field, onDeleteSuccess }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router=useRouter();
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await deletePost(field,postId);
            if (response.success) {
                router.push(`/${field}`);
                toast.success("Post deleted successfully!");
                closeModal();
            } else {
                toast.error("Failed to delete post.");
            }
        } catch (error) {
            toast.error("An error occurred while deleting.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div onClick={openModal} className="cursor-pointer text-gray-200 hover:text-red-700 transition-all duration-150">
                <MdDelete />
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-200 ease-out">
                    <div className="bg-gray-900 shadow-lg rounded-xl p-6 w-full max-w-md relative animate-slide-up">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-400 transition-colors"
                        >
                            ✕
                        </button>
                        <h3 className="text-lg font-bold text-white mb-4">Confirm Delete</h3>
                        <p className="text-gray-300 mb-6">
                            Are you sure you want to delete this post? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-xl font-medium hover:bg-gray-600 transition-colors duration-150"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={loading}
                                className={`px-4 py-2 text-white rounded-xl font-medium transition-colors duration-150 ${loading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-700 hover:bg-red-500'
                                    }`}
                            >
                                {loading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteModal;
