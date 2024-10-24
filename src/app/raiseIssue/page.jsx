"use client"
import Navbar from "@/components/Navbar";
import IssueComponent from "@/components/IssueComponent";
import Footer from "@/components/Footer";
const Page = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen bg-[#0d1017] flex justify-center">
        <IssueComponent />
      </div>
      <Footer></Footer>
    </>
  );
}

export default Page;
