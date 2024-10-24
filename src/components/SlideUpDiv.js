import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Animation variants for the cards
const cardVariants = {
  hidden: { opacity: 0, y: 100 },  // Cards start 100px below and hidden
  visible: { opacity: 1, y: 0 },   // Slide up to the original position and become visible
};

export default function SlideUpCard() {
  const ref = useRef(null);  // Create a reference for the card
  const isInView = useInView(ref, { once: true });  // Trigger animation only once when in view

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}  // Animate only when the element is in view
      transition={{
        duration: 1,
        ease: "easeOut",  // Use easeOut for smoother animation
      }}
      className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition"
    >
      <h3 className="text-2xl font-semibold mb-4">Ask Doubts Regarding Data Structures and Algorithm</h3>
      <p>
        <b>HelpMe-Debug</b> is a dedicated platform designed to help students and professionals solve their Data Structures and Algorithms (DSA) challenges. Whether you're preparing for coding interviews or enhancing your problem-solving skills, this community-driven website allows users to post their DSA-related questions and receive detailed, well-explained answers from peers and experts.
      </p>
    </motion.div>
  );
}
