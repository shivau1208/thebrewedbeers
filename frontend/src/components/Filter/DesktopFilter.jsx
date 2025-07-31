import { useState, useEffect } from "react";
import { alcoholContent, categoriesContent, glasesContent, ingredientsContent, priceRange, ratingContent } from "@/constants/filterConstants";
import { useBeerContextApi } from "@/context/apis";
import { useFilterContextApi } from "@/context/apis";

export default function DesktopFilter() {
  const { data, setProducts } = useBeerContextApi();
  const { filters, setFilters } = useFilterContextApi();
  const [filterValueLength, setFilteredValueLength] = useState(4);
  const [text, setText] = useState(false);
  const FilterOptionOnChangehandler = (category, value) => {
    setFilters((prevfilters) => {
      const newValues = prevfilters[category]?.includes(value) ? prevfilters[category]?.filter((item) => item !== value) : [...prevfilters[category], value];
      localStorage.setItem(
        "filter",
        JSON.stringify({
          ...prevfilters,
          [category]: newValues,
        })
      );

      return {
        ...prevfilters,
        [category]: newValues,
      };
    });
  };

  useEffect(() => {
    UpdateProductList();
  }, [filters]);

  function UpdateProductList() {
    let ratingMin = filters.rating_content.length ? Math.min(...filters.rating_content) : null;

    let numbers = filters.price_range.length ? filters.price_range.flatMap((range) => range.split("-").map(Number)) : null;

    let priceMin = null;
    let priceMax = null;
    if (numbers) {
      priceMax = Math.max(...numbers);
      priceMin = Math.min(...numbers);
    }

    const filteredProducts = data.filter((product) => {
      const price = product?.price - product?.rating * 10;
      const rating = product?.rating;

      return (
        (filters.alcohol_content.length === 0 || filters.alcohol_content.includes(product?.strAlcoholic)) &&
        (filters.category_content.length === 0 || filters.category_content.includes(product?.strCategory)) &&
        (filters.glasses_content.length === 0 || filters.glasses_content.includes(product?.strGlass)) &&
        (filters.ingredients_content.length === 0 || filters.ingredients_content.some((item) => product?.strIngredient1?.toLowerCase()?.includes(item.toLowerCase()))) &&
        (priceMin === null || price >= priceMin) &&
        (priceMax === null || price <= priceMax) &&
        (ratingMin === null || rating >= ratingMin)
      );
    });

    setProducts(filteredProducts);
  }
  const ClearFilterhandler = (event) => {
    event.stopPropagation();
    let newValues = {};
    for (let key in filters) {
      if (filters.hasOwnProperty(key)) {
        newValues[key] = [];
      }
    }
    localStorage.setItem("filter", JSON.stringify(newValues));
    setFilters(newValues);
  };
  const AllFilterValues = Object.keys(filters).flatMap((filterValue) => filters[filterValue].map((item) => ({ filterValue, item })));
  return (
    <div className="desktopFilter">
      <div className="desktopFilterHeader">
        <h3>Filters</h3>
        <p onClick={ClearFilterhandler}>CLEAR ALL</p>
      </div>
      <div className="filteredValues">
        {AllFilterValues.slice(0, filterValueLength).map(({ filterValue, item }, index) => (
          <div key={index} className="filteredValuesList">
            <span className="filteredValuesListCross" onClick={() => FilterOptionOnChangehandler(filterValue, item)}>
              &#x2715;
            </span>
            <span className="filteredValuesListValue">{item}</span>
          </div>
        ))}
      </div>
      {AllFilterValues.length > 4 ? (
        <div
          className="showMoreFilter"
          onClick={() => {
            setText(!text);
            text ? setFilteredValueLength(4) : setFilteredValueLength(AllFilterValues.length);
          }}
        >
          {text ? "SHOW LESS" : "SHOW MORE"}
        </div>
      ) : null}
      <hr />
      <div className="customerRatings">
        <p>PRICE</p>
        <ul>
          {priceRange.map(({ id, name, value }, index) => (
            <li key={id} onClick={() => FilterOptionOnChangehandler("price_range", value)}>
              <img src={filters["price_range"].includes(value) ? "/checkbox-checked.svg" : "/checkbox.svg"} alt="" srcSet="" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="customerRatings">
        <p>ALCOHOL CONTENT</p>
        <ul>
          {alcoholContent.map(({ id, name, value }, index) => (
            <li key={id} onClick={() => FilterOptionOnChangehandler("alcohol_content", value)}>
              <img src={filters["alcohol_content"].includes(value) ? "/checkbox-checked.svg" : "/checkbox.svg"} alt="" srcSet="" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="customerRatings">
        <p>CATEGORIES CONTENT</p>
        <ul>
          {categoriesContent.map(({ id, name, value }, index) => (
            <li key={id} onClick={() => FilterOptionOnChangehandler("category_content", value)}>
              <img src={filters["category_content"].includes(value) ? "/checkbox-checked.svg" : "/checkbox.svg"} alt="" srcSet="" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="customerRatings">
        <p>GLASS TYPE</p>
        <ul>
          {glasesContent.map(({ id, name, value }, index) => (
            <li key={id} onClick={() => FilterOptionOnChangehandler("glasses_content", value)}>
              <img src={filters["glasses_content"].includes(value) ? "/checkbox-checked.svg" : "/checkbox.svg"} alt="" srcSet="" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="customerRatings">
        <p>Ingredients</p>
        <ul>
          {ingredientsContent.map(({ id, name, value }, index) => (
            <li key={id} onClick={() => FilterOptionOnChangehandler("ingredients_content", value)}>
              <img src={filters["ingredients_content"].includes(value) ? "/checkbox-checked.svg" : "/checkbox.svg"} alt="" srcSet="" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="customerRatings">
        <p>CUSTOMER RATINGS</p>
        <ul>
          {ratingContent.map(({ id, name, value }, index) => (
            <li key={id} onClick={() => FilterOptionOnChangehandler("rating_content", value)}>
              <img src={filters["rating_content"].includes(value) ? "/checkbox-checked.svg" : "/checkbox.svg"} alt="" srcSet="" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
