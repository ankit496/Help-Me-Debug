"use client";
import { useState, useEffect } from 'react';
// import Posts from "@/components/Posts";
import Navbar from "@/components/Navbar";
import { FaGlobe } from 'react-icons/fa'; // Import a web-related icon
import { useParams } from "next/navigation";
import { TbBinaryTree } from "react-icons/tb";
import { fetchIssue } from "@/lib/action";
import { toast } from 'react-toastify';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import SortComponent from '@/components/SortComponent';
const Page = () => {
  const { doubts } = useParams();
  const [issueData, setIssueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortType, setSortType] = useState("Sort by");
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await fetchIssue(doubts, currentPage, sortType);
      if (response.success) {
        setIssueData(response.posts);
        setTotalPages(response.totalPages)
      }
      else {
        toast.error(response.error || 'Failed to load data');
      }
      setLoading(false);
    };

    getData();
  }, [doubts, currentPage, sortType]);

  return (
    <>
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-gray-300">
        <Navbar />
        <div className="container mx-auto p-4">
          {/* Header Section */}
          <h2 className="text-4xl md:text-5xl py-6 text-center font-bold text-white decoration-blue-500 flex justify-center items-center space-x-3">
            {doubts === "Dsa" ? (
              <TbBinaryTree className="text-blue-400 animate-pulse" />
            ) : (
              <FaGlobe className="text-blue-500 animate-bounce" />
            )}
            <span>{doubts.toUpperCase()}</span>
          </h2>
          <div className=''>
            <SortComponent sortType={sortType} setSortType={setSortType}></SortComponent>
          </div>
          {/* Main Content */}
          <div className="mt-8 w-4/5">
            {loading ? (
              <div className="flex justify-center items-center">
                {/* Add a spinner for loading */}
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : issueData && issueData.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Improved posts layout with grid */}
                {issueData.map((innerData, index) => (
                  <PostCard data={innerData} key={index} />
                ))}
              </div>
            ) : (
              <p className="text-center text-xl text-gray-400">
                No data found for this issue.
              </p>
            )}
          </div>
        </div>
        <div className='flex justify-center p-2'>
          <Pagination loading={loading} totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage}></Pagination>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
