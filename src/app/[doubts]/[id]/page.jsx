"use client"
import PostWithReplies from "@/components/PostWithReplies";
import { fetchIssuebyId } from "@/lib/action";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "react-toastify";
import LoadingPage from "@/components/LoadingPage";
const Page = () => {
  const { doubts, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [issueData, setIssueData] = useState();
  const [reRender, setReRender] = useState(0);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await fetchIssuebyId(doubts, id);
      if (response.success == true) {
        setIssueData(response.posts);
      }
      else {
        toast.error(response.error);
      }
      setLoading(false);
    };
    getData();
  }, [doubts, id, reRender]);
  return (
    <div>
      <div
        className="bg-[#0d1017] min-h-screen text-gray-300"
      >
        <Navbar></Navbar>
        {loading ? (
          <>
            <div className="min-h-screen flex items-center justify-center">
              <div className="items-center w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </>
        ) : (
          issueData.map((data, index) => (
            <PostWithReplies key={index} data={data} setReRender={setReRender} />
          ))
        )}
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Page;
