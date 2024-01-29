import { useDispatch, useSelector } from "react-redux";
import {
  getSneakers,
  searchBar,
  brandValue,
  colorValue,
  sizeValue,
  orderPrice,
} from "../../redux/actions/actions";
import Select from "../Select/select.jsx";
import style from "./Filter.module.css";

function Filter({ page, pageSize }) {
  console.log("Page in Filter:", page);
  const brand = useSelector((state) => state?.brandValue);
  const color = useSelector((state) => state?.colorValue);
  const size = useSelector((state) => state?.sizeValue);
  const price = useSelector((state) => state?.orderPrice);
  const searchData = useSelector((state) => state?.dataSearch);

  const dispatch = useDispatch();

  const handleFilterBrand = (value) => {
    dispatch(getSneakers((page = 1), pageSize, value, color, size, price));
    dispatch(brandValue(value));
  };

  const handleFilterColor = (value) => {
    dispatch(getSneakers((page = 1), pageSize, brand, value, size, price));
    dispatch(colorValue(value));
  };

  const handleFilterSize = (value) => {
    dispatch(getSneakers((page = 1), pageSize, brand, color, value, price));
    dispatch(sizeValue(value));
  };

  const handleOrderPrice = (value) => {
    if (searchData.length > 0) {
      dispatch(searchBar(searchData, (page = 1), pageSize, value));
      dispatch(orderPrice(value));
    } else {
      dispatch(getSneakers((page = 1), pageSize, brand, color, size, value));
      dispatch(orderPrice(value));
    }
  };

  return (
    <div className={style.containerContent}>
      <div className={style.container}>
        <div className={style.titleContainer}>
          <h3>FILTER</h3>
        </div>
        <Select
          name="FilterBrand"
          options={[
            { value: "", label: "all brands" },
            { value: "ADIDAS", label: "ADIDAS" },
            { value: "NIKE", label: "NIKE" },
            { value: "NEWBALANCE", label: "NEWBALANCE" },
          ]}
          onChange={(e) => handleFilterBrand(e.target.value)}
        />

        <Select
          name="FilterColor"
          options={[
            { value: "", label: "all colors" },
            { value: "black", label: "black" },
            { value: "red", label: "red" },
            { value: "blue", label: "blue" },
            { value: "pink", label: "pink" },
            { value: "white", label: "white" },
            { value: "yellow", label: "yellow" },
            { value: "green", label: "green" },
          ]}
          onChange={(e) => handleFilterColor(e.target.value)}
        />

        <Select
          name="FilterSize"
          options={[
            { value: "", label: "all Size" },
            { value: "7", label: "7" },
            { value: "8", label: "8" },
            { value: "9", label: "9" },
            { value: "10", label: "10" },
            { value: "11", label: "11" },
            { value: "12", label: "12" },
          ]}
          onChange={(e) => handleFilterSize(e.target.value)}
        />

        <Select
          name="orderPrice"
          options={[
            { value: "", label: "all price" },
            { value: "min", label: "min" },
            { value: "max", label: "max" },
          ]}
          onChange={(e) => handleOrderPrice(e.target.value)}
        />
      </div>
    </div>
  );
}
export default Filter;
