import { Editor } from "primereact/editor";
import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { toast } from "react-toastify";
import { addVote } from "@/lib/action";
import { FaBug } from "react-icons/fa6";

const Posts = ({ data }) => {
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
        className="mt-6 mb-6 hover:cursor-pointer"
        onClick={() => !id && router.push(`${doubts}/${data._id}`)}
      >
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <FaBug className="text-red-500 w-6 h-6" />
              <h1 className="text-2xl font-bold text-white">{data.title}</h1>
              {data.status === "Pending" ? (
                <span className="ml-4 px-3 py-1 bg-blue-600 text-green-200 rounded-full text-xs font-semibold">
                  {data.status}
                </span>
              ) : (
                <span className="ml-4 px-3 py-1 bg-green-600 text-gray-200 rounded-full text-xs font-semibold">
                  {data.status}
                </span>
              )}
            </div>
          </div>
          <hr className="w-full mb-4 h-0.5 border-0 bg-gray-600 outline-none" />
          <div className="flex items-start">
            <div className="flex flex-col items-center mr-6 w-8 h-8">
              {data.userId.profilePic ? (
                <Image
                  src={data.userId.profilePic}
                  alt="Profile"
                  className="rounded-full"
                  width={48}
                  height={48}
                  quality={100}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-600"></div>
              )}

              <div className="flex flex-col items-center gap-2 mt-4 bg-gray-800 rounded-xl p-2">
                <BiUpvote
                  className="text-gray-400 hover:text-green-500 cursor-pointer transition-colors duration-200"
                  onClick={() => Vote(1)}
                />
                <span className="text-gray-200 font-semibold">{currentVotes}</span>
                <BiDownvote
                  className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-200"
                  onClick={() => Vote(-1)}
                />
              </div>
            </div>

            <div className="flex-grow min-h-40 bg-gray-800 p-6 rounded-xl border border-gray-700 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{data.userId.username}</h3>
              </div>
              <hr className="my-2 border-gray-600" />
              <div className="text-base leading-7">
                <Editor
                  value={data.issue}
                  showHeader={false}
                  style={{
                    background: "#0d1017",
                    border: "none",
                    color: "white",
                    fontSize: "14px",
                    minHeight: "100px",
                    whiteSpace: "pre-wrap", // This will ensure newlines and spaces are respected
                    overflowWrap: "break-word", // Ensures long words are wrapped
                    wordBreak: "break-word", // Breaks words that are too long
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

export default Posts;
