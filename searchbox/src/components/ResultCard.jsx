import { motion } from "framer-motion";
import React from "react";

export default function ResultCard({ r, i }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{
        delay: i * 0.03,
        type: "spring",
        stiffness: 300,
        damping: 24,
      }}
      className="card"
      whileHover={{ y: -6 }}
    >
      <div className="thumb">
        {r.title
          .split(" ")
          .slice(0, 2)
          .map((w) => w[0])
          .join("")}
      </div>
      <div className="cardBody">
        <div className="title">{r.title}</div>
        <div className="meta">
          {r.description} • {r.time}
        </div>
        <div style={{ height: 8 }} />
        <div className="actions">
          <button className="actionBtn">Open</button>
          <button className="actionBtn">Save</button>
          <button className="actionBtn">Share</button>
        </div>
      </div>
    </motion.div>
  );
}
