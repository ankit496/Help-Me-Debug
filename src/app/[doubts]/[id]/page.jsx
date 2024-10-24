"use client"
import PostWithReplies from "@/components/PostWithReplies";
import { fetchIssuebyId } from "@/lib/action";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Page = () => {
  const {doubts,id}=useParams();
  const [loading,setLoading]=useState(true);
  const [issueData,setIssueData]=useState();
  const [reRender,setReRender]=useState(0);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetchIssuebyId(doubts,id);
        if (response.success==true) {
          setIssueData(response.posts);
        }
      } catch (error) {
        toast.error(error);
      }
      setLoading(false);
    };
    getData();
  }, [doubts,id,reRender]);
  return (
    <div>
  {loading ? (
    <>Loading.....</>
  ) : (
    issueData.map((data, index) => (
      <PostWithReplies key={index} data={data} setReRender={setReRender}/>
    ))
  )}
</div>
  );
}

export default Page;
