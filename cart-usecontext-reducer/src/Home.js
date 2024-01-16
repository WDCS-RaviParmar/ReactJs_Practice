import React, { useEffect, useRef, useState } from "react";
// import lodash from 'lodash';
import { useProductContext } from "./Context/ProductContext";

export default function Home() {
  let [productData, setProductData] = useState(null);
  let [searchFilter, setSearchFilter] = useState("");

  const { dispatch } = useProductContext();

  useEffect(() => {
    fetch("https://dummyjson.com/products?skip=0&limit=100")
      .then((res) => res.json())
      .then((json) => setProductData(json.products));
  }, []);

  let interval = useRef(null);

  function handleSearch(searchFilter) {
    setSearchFilter(searchFilter)
    clearTimeout(interval.current);
    interval.current = setTimeout(() => {
      fetch(`https://dummyjson.com/products/search?q=${searchFilter}`)
        .then((res) => res.json())
        .then((json) => setProductData(json.products));
    }, 500);
  }

  function addToCart(product) {
    dispatch({
      type: "add",
      product,
    });
  }

  return (
    <div>
      <div className="home-container">
        <input
          style={{ position: "sticky", top: "80px" }}
          onChange={(e) => handleSearch(e.target.value)}
          value={searchFilter}
          type="search"
          className="search-product"
          placeholder="search product"
        />
        <div className="products">
          {productData ? (
            productData.map((product) => (
              <div key={product.id} className="product">
                <div className="imgDiv">
                  <img src={product.thumbnail} alt={product.title} />
                </div>
                <h3>{product.title}</h3>
                <div className="details">
                  <span className="price">Price: {product.price}</span>
                  <span></span>
                </div>
                <button onClick={() => addToCart(product)}>Add To Cart</button>
              </div>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
}
