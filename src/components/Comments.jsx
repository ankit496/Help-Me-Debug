import { Editor } from "primereact/editor";
import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { toast } from "react-toastify";
import { addVote } from "@/lib/action";

const Comments = ({ data }) => {
  const router = useRouter();
  const { doubts, id } = useParams();
  const [currentVotes, setCurrentVotes] = useState(data.votes ? data.votes : 0);

  const Vote = async (bias) => {
    try {
      const response = await addVote(doubts, data._id, bias);
      if (response.success) setCurrentVotes((prev) => prev + bias);
    } catch (error) {
      toast.error("Failed to vote.");
    }
  };

  return (
    <>
      <div
        className="mt-4 mb-4 hover:cursor-pointer"
        onClick={() => !id && router.push(`${doubts}/${data._id}`)}
      >
        <div className="flex justify-center mt-4">
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
              <div className="w-8 h-8 rounded-full bg-black"></div>
            )}
            {/* Vote Section */}
            <div className="flex flex-col items-center gap-1 mt-4 bg-gray-800 rounded-xl p-1">
              <BiUpvote
                className="text-gray-400 hover:text-green-500 cursor-pointer transition-colors duration-200 w-6 h-6"
                onClick={() => Vote(1)}
              />
              <span className="text-gray-200 font-semibold">{currentVotes}</span>
              <BiDownvote
                className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-200 w-6 h-6"
                onClick={() => Vote(-1)}
              />
            </div>
          </div>

          <div className="w-full">
            <div className="w-full sm:w-full p-4 min-h-36 bg-[#0d1017] text-white rounded-xl space-y-4 border-2 border-gray-600">
              {/* Profile Section */}
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-medium">{data.userId.username}</h3>
              </div>
              <div className="w-full h-0.5 border-0 bg-gray-600" />
              <div className="w-full">
                <Editor
                  value={data.comment}
                  showHeader={false}
                  style={{
                    background: "#0d1017",
                    border: "none",
                    color: "white",
                    fontSize: "14px",
                    minHeight: "100px",
                    whiteSpace: "pre-wrap", // Ensure newlines and spaces are respected
                    overflowWrap: "break-word", // Ensures long words are wrapped
                    wordBreak: "break-word", // Break long words or URLs
                  }}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Comments;
