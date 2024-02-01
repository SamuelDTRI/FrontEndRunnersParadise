import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getSneakers,
  searchBar,
  stateSearch,
  resetSearch,
} from "../../redux/actions/actions";
import style from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const currentPage = useSelector((state) => state?.currentPage);
  const currentPageSearch = useSelector((state) => state?.page);
  const brand = useSelector((state) => state?.brandValue);
  const color = useSelector((state) => state?.colorValue);
  const size = useSelector((state) => state?.sizeValue);
  const price = useSelector((state) => state?.orderPrice);
  const searchState = useSelector((state) => state?.dataSearch);
  const pageSize = 6;
  const fetchData = async (term) => {
    try {
      const sneakers = term
        ? await dispatch(searchBar(term, currentPageSearch, pageSize, price))
        : await dispatch(
            getSneakers(currentPage, pageSize, brand, color, size, price)
          );
      if (sneakers) {
        dispatch();
        console.log(sneakers);
      }
    } catch (error) {
      console.error("Error al buscar las zapatillas:", error);
    }
  };

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    dispatch(stateSearch(searchTerm));
    setSearch(searchTerm);

    if (!searchTerm) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData(search);
  }, [search, dispatch]);

  const handleReset = () => {
    setSearch("");
    fetchData();
  };

  return (
    <div className={style.container}>
      <form
        className={style.containerForm}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          value={search || searchState}
          onChange={handleChange}
          placeholder="Search"
        />
        <img
          type="submit"
          src="src\assets\searchbar-loupe.png"
          alt=""
          className={style.buttonImg}
          onClick={handleReset}
        />
      </form>
    </div>
  );
};

export default SearchBar;
