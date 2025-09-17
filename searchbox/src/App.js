import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { MoreVertical } from "react-feather";
import "./appstyle.css";
import FilterPanel from "./components/FilterPanel";

const DUMMY = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: [
    "Discover React Patterns",
    "Animated Search UI",
    "Design System Guidelines",
    "How to Animate Lists",
    "Microinteractions in UI",
    "Deep Dive: Accessibility",
    "Performance Tips",
    "Design Tokens",
  ][i % 8],
  description:
    "A short summary showing what this result is about, sized to match the design. Includes small meta and tags.",
  tags: ["Article", "Design", "Frontend"].slice(0, (i % 3) + 1),
  time: `${10 + i} mins read`,
}));

function useDebounced(value, delay = 260) {
  const [deb, setDeb] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDeb(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return deb;
}

export default function App() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const deb = useDebounced(query, 220);
  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, [deb, filter]);

  const results = useMemo(() => {
    const q = deb.trim().toLowerCase();
    let list = DUMMY.slice();
    if (filter !== "All") {
      list = list.filter((r) => r.tags.includes(filter));
    }
    if (!q) return list;
    return list.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    );
  }, [deb, filter]);

  return (
    <div className="app">
      <div className="shell">
        <div className="top">
          <div className="searchWrap">
            <motion.button
              className="iconBtn"
              aria-hidden
              whileTap={{ scale: 0.96 }}
            >
              🔍
            </motion.button>
            <input
              className="input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, designs, topics..."
            />
            <motion.button
              className="iconBtn"
              whileHover={{ scale: 1.06 }}
              onClick={() => {
                setQuery("");
              }}
              title="Clear"
            >
              ✖
            </motion.button>
          </div>

          <div className="filters">
            {["All", "Article", "Design", "Frontend"].map((f) => (
              <FilterChip
                key={f}
                active={f === filter}
                onClick={() => setFilter(f)}
              >
                {f}
              </FilterChip>
            ))}
            <button
              className="filter-toggle"
              onClick={() => setIsFilterOpen(true)}
            >
              <MoreVertical />
            </button>
          </div>
        </div>

        <div className="results">
          <div className="searchFooter">
            <div>{loading ? "Searching..." : `${results.length} results`}</div>
            <div>Sort: Relevance ▾</div>
          </div>

          <ResultsList results={results} loading={loading} query={deb} />
        </div>
      </div>
      <AnimatePresence>
        {isFilterOpen && (
          <FilterPanel closePanel={() => setIsFilterOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterChip({ children, active, onClick }) {
  return (
    <motion.button
      className="filterChip"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      animate={{
        background: active ? "rgba(94,234,212,0.06)" : "transparent",
        borderColor: active
          ? "rgba(94,234,212,0.18)"
          : "rgba(255,255,255,0.04)",
      }}
    >
      {children}
    </motion.button>
  );
}

function ResultsList({ results, loading, query }) {
  if (loading) {
    return (
      <div className="resultsGrid" style={{ marginTop: 12 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card">
            <div
              className="thumb skeleton"
              style={{ width: 112, height: 72 }}
            />
            <div style={{ flex: 1 }}>
              <div
                className="skeleton"
                style={{ width: "50%", height: 16, marginBottom: 8 }}
              />
              <div
                className="skeleton"
                style={{ width: "80%", height: 12, marginBottom: 8 }}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <div className="skeleton" style={{ width: 80, height: 32 }} />
                <div className="skeleton" style={{ width: 60, height: 32 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return <div className="empty">No results for “{query}”</div>;
  }

  return (
    <motion.div
      className="resultsGrid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <AnimatePresence>
        {results.map((r, i) => (
          <ResultCard key={r.id} r={r} i={i} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

function ResultCard({ r, i }) {
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
