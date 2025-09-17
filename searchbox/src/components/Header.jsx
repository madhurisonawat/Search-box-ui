import React from "react";
import { Search, Sliders } from "react-feather";

export default function Header({ onFilterClick }) {
  return (
    <header className="app-header">
      <h1>Search Results</h1>
      <div className="search-actions">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input type="text" placeholder="Search..." />
        </div>
        <button className="filter-btn" onClick={onFilterClick}>
          <Sliders size={20} />
          <span>Filters</span>
        </button>
      </div>
    </header>
  );
}
