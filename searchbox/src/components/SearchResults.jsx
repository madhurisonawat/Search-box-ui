import { motion } from "framer-motion";
import React from "react";
import { results } from "../data/mockData";
import ResultCard from "./ResultCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function SearchResults() {
  return (
    <motion.div
      className="results-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {results.map((item) => (
        <motion.div key={item.id} variants={cardVariants}>
          <ResultCard item={item} />
        </motion.div>
      ))}
    </motion.div>
  );
}
