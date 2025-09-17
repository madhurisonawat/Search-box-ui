import { motion } from "framer-motion";
import React from "react";
import { Calendar, FileText, Sliders, X } from "react-feather";

export default function FilterPanel({ closePanel }) {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const panelVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: { x: "100%", transition: { duration: 0.2 } },
  };

  return (
    <>
      <motion.div
        className="backdrop"
        onClick={closePanel}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      />
      <motion.aside
        className="filter-panel"
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="filter-header">
          <h2>Filters</h2>
          <button onClick={closePanel} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <div className="filter-content">
          <div className="filter-section">
            <h4>
              <Sliders size={18} style={{ marginRight: "8px" }} />
              Sort by
            </h4>
          </div>
          <div className="filter-section">
            <h4>
              <FileText size={18} style={{ marginRight: "8px" }} />
              File types
            </h4>
          </div>
          <div className="filter-section">
            <h4>
              <Calendar size={18} style={{ marginRight: "8px" }} />
              Date added
            </h4>
          </div>
        </div>

        <div className="filter-footer">
          <button className="secondary-btn">Clear all</button>
          <button className="primary-btn" onClick={closePanel}>
            Show results
          </button>
        </div>
      </motion.aside>
    </>
  );
}
