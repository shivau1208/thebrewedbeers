import { useState } from "react";
import { FilterContext } from "./apis";

export default function FilterContextFunc({ children }) {
  const [filters, setFilters] = useState(() => {
    const filter = localStorage.getItem("filter");
    return filter
      ? JSON.parse(filter)
      : {
          price_range: [],
          alcohol_content: [],
          category_content: [],
          glasses_content: [],
          ingredients_content: [],
          rating_content: [],
        };
  });

  return <FilterContext.Provider value={{ filters, setFilters }}>{children}</FilterContext.Provider>;
}
