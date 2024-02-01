import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { getSneakers, searchBar } from "../../redux/actions/actions";

import Cards from "../../componentes/Cards/cards";
import Paginado from "../../componentes/Paginado/paginado";
import styles from "./Home.module.css";
import Filter from "../../componentes/Filter/filter";
import SearchBar from "../../componentes/SearchBar/searchBar";
import Alert from "../../componentes/Alert/Alert";

const Home = () => {
  const dispatch = useDispatch();
  const sneakers = useSelector((state) => state?.sneakers);
  const totalSneaker = useSelector((state) => state?.totalSneaker);
  const currentPage = useSelector((state) => state?.currentPage);
  const currentPageSearch = useSelector((state) => state?.page);
  const brand = useSelector((state) => state?.brandValue);
  const color = useSelector((state) => state?.colorValue);
  const size = useSelector((state) => state?.sizeValue);
  const price = useSelector((state) => state?.orderPrice);

  const searchState = useSelector((state) => state?.dataSearch); //  estado para los resultados de la búsqueda
  const pageSize = 6;
  console.log(searchState);
  console.log(price);
  console.log("todas las sneakers", totalSneaker);

  useEffect(() => {
    if (searchState && searchState.length > 0) {
      console.log("searchbar");
      dispatch(searchBar(searchState, currentPageSearch, pageSize, price));
    } else {
      console.log("todos snesakers");
      dispatch(getSneakers(currentPage, pageSize, brand, color, size, price));
    }
  }, [dispatch]);

  const setCurrentPage = (page) => {
    if (searchState && searchState.length > 0) {
      dispatch(searchBar(searchState, page, pageSize, price));
    } else {
      dispatch(getSneakers(page, pageSize, brand, color, size, price));
    }
  };
  console.log(currentPage);
  console.log(currentPageSearch);
  const RedAlert = ({ message }) => (
    <div
      style={{
        backgroundColor: rgba(223, 51, 21, 0.8),
        padding: "10px",
        color: "black",
        width: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "90px",
        boxShadow: "0px 6px 10px rgba(100, 51, 21, 0.8)",
      }}
    >
      <FontAwesomeIcon icon={faTimesCircle} style={{ marginRight: "10px" }} />
      {message}
      <FontAwesomeIcon icon={faTimesCircle} style={{ marginLeft: "10px" }} />
    </div>
  );
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.filterComponent}>
          <div className={styles.searchBarComponent}>
            <SearchBar
              totalSneaker={totalSneaker}
              page={currentPage}
              pageSize={pageSize}
              setCurrentPage={setCurrentPage}
            ></SearchBar>
          </div>
          <Filter
            totalSneaker={searchState ? searchState.length : totalSneaker}
            page={currentPageSearch >= 1 ? currentPageSearch : currentPage}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
          ></Filter>
        </div>
        <div className={styles.paginado}>
          <Paginado
            totalSneaker={totalSneaker}
            page={currentPageSearch >= 1 ? currentPageSearch : currentPage}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className={styles.cardsComponent}>
          <Cards sneakers={sneakers} />
          <div className={styles.alertComponent}>
            {sneakers && sneakers.length === 0 && <Alert />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
