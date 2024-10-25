"use client"
import { useEffect, useState } from 'react';

export default function LoadingPage() {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = ["Hang on tight...", "Just a moment...", "We're setting things up..."];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000); // Change text every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center w-full justify-center h-screen bg-gradient-to-b from-black to-black">
      <div className="flex flex-col items-center space-y-4">
        {/* Loading Spinner */}
        <div className="w-16 h-16 border-x-4 border-white border-spacing-4 rounded-full animate-spin duration-25"></div>
        {/* Rotating Loading Text */}
        <p className="text-white text-lg font-semibold">{messages[messageIndex]}</p>
      </div>
    </div>
  );
}
