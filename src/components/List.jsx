import React, { useState, useEffect } from "react";
import ProductsCard from "./ProductsCard";
import "../css/common.css";
import { fetchProducts } from "../service/api";
function List() {
  const [products, setProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    idealFor: [],
    occasion: [],
    work: [],
    fabric: [],
  });

  const [openFilter, setOpenFilter] = useState({
    idealFor: false,
    occasion: false,
    work: false,
    fabric: false,
  });
  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        const response = await fetchProducts(); 
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAndSetProducts();
  }, []);
  useEffect(() => {
    let filtered = products;

    Object.keys(selectedFilters).forEach((filter) => {
      if (selectedFilters[filter].length) {
        filtered = filtered.filter((product) =>
          selectedFilters[filter].some((value) =>
            product.title.toLowerCase().includes(value.toLowerCase())
          )
        );
      }
    });

    setFilteredProducts(filtered);
  }, [selectedFilters, products]);
  // Toggle filter visibility
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  // Handle filter change
  const handleFilterChange = (e, filterName) => {
    const { value, checked } = e.target;
    const updatedFilters = [...selectedFilters[filterName]];

    if (checked) {
      updatedFilters.push(value);
    } else {
      const index = updatedFilters.indexOf(value);
      if (index > -1) updatedFilters.splice(index, 1);
    }

    setSelectedFilters({ ...selectedFilters, [filterName]: updatedFilters });
  };
  // Toggle open/close filter options
  const handleToggleFilterOption = (filterName) => {
    setOpenFilter({
      ...openFilter,
      [filterName]: !openFilter[filterName],
    });
  };
  // Handle unselect all options for a filter
  const handleUnselectAll = (filterName) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterName]: [],
    });
  };
  const handleSortChange = (e) => {
    const value = e.target.value;
  
    let sortedProducts = [...filteredProducts];
  
    if (value === "Price: Low to High") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === "Price: High to Low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (value === "Newest") {
      sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date)); // Assuming `date` field in products
    }
  
    setFilteredProducts(sortedProducts);
  };
  
  return (
    <section className="product-section">
      <div className="both">
        <div className="header">
          <div className="header-left">
            <p className="heading items_count">3425 ITEMS</p>

            <p onClick={toggleFilter} className="filter-toggle">
              {showFilter ? (
                <>
                  <span className="filter-symbol">&lt;</span> &nbsp;
                  <span className="filter-text common_text">HIDE FILTER</span>
                  <span className="mobile-filter-text">FILTER</span>
                </>
              ) : (
                <>
                  <span className="filter-symbol">&gt;</span> &nbsp;
                  <span className="filter-text common_text">SHOW FILTER</span>
                  <span className="mobile-filter-text">FILTER</span>
                </>
              )}
            </p>
          </div>
          <select className="recommended-dropdown heading recommend" onChange={handleSortChange}>
            <option>RECOMENDED</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div
          className={`products-container ${showFilter ? "with-sidebar" : ""}`}
        >
          {/* Filter Sidebar */}
          {showFilter && (
            <div className="filter-container">
              {[
                {
                  label: "IDEAL FOR",
                  name: "idealFor",
                  options: ["Men", "Women", "Kids"],
                },
                {
                  label: "OCCASION",
                  name: "occasion",
                  options: ["Casual", "Formal", "jewelery"],
                },
                {
                  label: "WORK",
                  name: "work",
                  options: ["Office", "Remote", "Freelance"],
                },
                {
                  label: "FABRIC",
                  name: "fabric",
                  options: ["Cotton", "Silk", "Wool"],
                },
                {
                  label: "SEGMENT",
                  name: "segment",
                  options: ["Office", "Remote", "Freelance"],
                },
                {
                  label: "SUITABLE FOR",
                  name: "suitable",
                  options: ["Office", "Remote", "Freelance"],
                },
                {
                  label: "RAW MATERIAL",
                  name: "raw",
                  options: ["Office", "Remote", "Freelance"],
                },
                {
                  label: "PATTERN",
                  name: "pattern",
                  options: ["Office", "Remote", "Freelance"],
                },
              ].map(({ label, name, options }) => (
                <div key={name} className="filter-item">
                  <div
                    className="filter-header"
                    onClick={() => handleToggleFilterOption(name)}
                  >
                    <h3>{label}</h3>
                    <span
                      className={`arrow ${openFilter[name] ? "up" : "down"}`}
                    >
                      ^
                    </span>
                  </div>
                  <span className={`${name.toLowerCase()}-type`}>All</span>
                  {openFilter[name] && (
                    <div className="filter-options">
                      <p
                        onClick={() => handleUnselectAll(name)}
                        className="common_text"
                      >
                        Unselect All
                      </p>
                      {options.map((option) => (
                        <label key={option}>
                          <input
                            type="checkbox"
                            value={option}
                            onChange={(e) => handleFilterChange(e, name)}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Products Section */}
          <div className="products">
            {filteredProducts.length ? (
              filteredProducts.map((item) => (
                <div
                  className="product_card"
                  key={item.id}
                >
                  <ProductsCard items={item} />
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default List;
