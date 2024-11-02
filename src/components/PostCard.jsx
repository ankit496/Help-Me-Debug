import { Editor } from "primereact/editor";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { IoIosLink } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import { addVote } from "@/lib/action";
import { useState } from "react";
import { useSession } from "next-auth/react";
const PostCard = ({ data }) => {
  const router = useRouter();
  const { doubts, id } = useParams();
  const [currentVotes,setCurrentVotes]=useState(data.votes?data.votes:0);
  const {data:session}=useSession();
  const Vote=async(bias)=>{
    if(!session){
      toast.error("Login to vote")
      return;
    }
    try{
      const response=await addVote(doubts,data._id,bias);
      if(response.success)
          setCurrentVotes((prev)=>prev+=bias);
    }
    catch(error){
      toast.error("Failed to vote.");
    }
  }
  return (
    <div
      className="mt-4 mb-4 hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-xl bg-gray-800 p-4 border border-gray-700"
    >
      <div className="flex flex-col space-y-4">
        {/* Post Title and Status */}
          <div className="hover:cursor-pointer flex items-center justify-between flex-wrap" onClick={() => !id && router.push(`${doubts}/${data._id}`)}>
            <div className="flex items-center gap-1">
          <IoIosLink className="mt-1" />
          <h1 className="text-lg sm:text-xl font-bold text-white truncate">
            {data.title.substr(0, 30)}
          </h1>
          </div>
          <span
            className={`text-sm ml-3 pl-2 pr-2 py-1 rounded-xl font-medium ${
              data.status === "Pending" ? "bg-blue-600 text-white" : "bg-green-600 text-gray-200"
            } whitespace-nowrap`}
          >
            {data.status}
          </span>
        </div>

        <hr className="w-full mb-2 h-0.5 border-0 bg-gray-600" />

        {/* User Profile and Issue Description */}
        <div className="flex sm:flex-row items-start sm:items-center">
          {/* Profile Picture */}
          <div className="flex-shrink-0 mb-4 mr-2 sm:mb-0 flex flex-col items-center">
            {data.userId.profilePic ? (
              <Image
                src={data.userId.profilePic}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                width={48}
                height={48}
                quality={100}
              />
            ) : (
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-black"></div>
            )}
            {/* Vote Section */}
            <div className="flex flex-col items-center gap-1 mt-4">
              <BiUpvote className="text-gray-400 hover:text-green-500 cursor-pointer transition-colors duration-200 w-6 h-6" onClick={()=>Vote(1)} />
              <span className="text-gray-200 font-semibold">{currentVotes}</span>
              <BiDownvote className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-200 w-6 h-6" onClick={()=>Vote(-1)}/>
            </div>
          </div>

          {/* Username and Issue */}
          <div className="sm:ml-4 w-full flex-grow bg-gray-900 p-4 rounded-lg border border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="text-md sm:text-lg font-medium text-white truncate">
                {data.userId.username}
              </h3>
              <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
                {data.createdAt}
              </span>
            </div>
            <div className="mt-2">
              <Editor
                value={data.issue.substr(0, 50) + "..."}
                showHeader={false}
                style={{
                  background: "#0d1017",
                  border: "none",
                  color: "white",
                  fontSize: "14px",
                  minHeight: "100px",
                  whiteSpace: "normal", // Allow text to wrap
                  overflowWrap: "break-word", // Handle long words or URLs
                }}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
