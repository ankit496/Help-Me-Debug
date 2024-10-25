"use client";
import Navbar from "@/components/Navbar";
import ShootingStar from "@/components/ShootingStar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoadingPage from "@/components/LoadingPage";
export default function Home() {
  const {status}=useSession();
  if(status=='loading')
      return <LoadingPage/>
  return (
    <>
      <ShootingStar />
      <div className="relative z-10">
        <Navbar />
        <section className="h-screen flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-wrap p-4">Welcome to HelpMe-Debug</h1>
          <p className="text-lg md:text-xl max-w-lg text-center mb-8">
            Join the community to clear your doubts
          </p>
            <Link href="/raiseIssue" className="px-6 py-3 bg-blue-500 rounded-full text-white font-semibold hover:bg-blue-600 transition">
            Get Started
          </Link>
        </section>

        <section className="py-16 bg-[#000000f0] text-gray-300 -mt-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                
                className={`bg-gray-800 p-6 rounded-xl text-center transition}`}
              >
                <h3 className="text-2xl font-semibold mb-4">Ask Doubts Regarding Data Structures and Algorithm</h3>
                <p>
                  <b>HelpMe-Debug</b> is a dedicated platform designed to help students and professionals solve their Data Structures and Algorithms (DSA) challenges.
                </p>
              </div>

              <div
              
                className={`bg-gray-800 p-6 rounded-xl text-center transition}`}
              >
                <h3 className="text-2xl font-semibold mb-4">Dive Deep Into Web Development</h3>
                <p className="mt-4">
                  Ultimate platform for developers looking to master the intricacies of modern web development.
                </p>
              </div>

              <div

                className={`bg-gray-800 p-6 rounded-xl text-center transition}`}
              >
                <h3 className="text-2xl font-semibold mb-4">Share Your Interview Experience</h3>
                <p>
                  Help job seekers prepare for interviews by sharing real-life experiences from various companies and roles.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
