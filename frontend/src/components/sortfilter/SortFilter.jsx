import React from "react";
import './sortfilter.scss'
import { Link } from "react-router-dom";

export default function SortFilter() {
  return (
    <div className="SortFilterBtns">
      <div className="sortBtn">
        <img src="/sort-btn.svg" alt="sort-btn.svg" srcSet="" />
        <button type="button">Sort</button>
      </div>
      <div className="filterBtn">
        <img src="/filter-btn.svg" alt="filter-btn.svg" srcSet="" />
        <Link to={"/filter"}>
          <button>Filter</button>
        </Link>
      </div>
    </div>
  );
}
