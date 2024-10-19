import React from "react";
import './sortfilter.scss'
import { Link } from "react-router-dom";

export default function SortFilter() {
  return (
    <div className="SortFilterBtns">
      <div className="sortBtn">
        <img src="/sort-btn.svg" alt="sort-btn.svg" srcSet="" width="21" height="21" />
        <Link> Sort </Link>
      </div>
      <div className="filterBtn">
        <img src="/filter-btn.svg" alt="filter-btn.svg" srcSet="" width="21" height="21" />
        <Link to={"/filter"}> Filter </Link>
      </div>
    </div>
  );
}
