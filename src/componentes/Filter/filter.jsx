import { useDispatch, useSelector } from "react-redux";
import {
  getSneakers,
  searchBar,
  brandValue,
  colorValue,
  sizeValue,
  orderPrice,
} from "../../redux/actions/actions";
import style from "./Filter.module.css";

function Filter({ page, pageSize }) {
  const brand = useSelector((state) => state?.brandValue);
  const color = useSelector((state) => state?.colorValue);
  const size = useSelector((state) => state?.sizeValue);
  const price = useSelector((state) => state?.orderPrice);
  const searchData = useSelector((state) => state?.dataSearch);

  const dispatch = useDispatch();

  const handleFilterBrand = (value) => {
    const updatedBrand = brand.includes(value)
      ? brand.filter((item) => item !== value)
      : [...brand, value];
    dispatch(getSneakers(page, pageSize, updatedBrand, color, size, price));
    dispatch(brandValue(updatedBrand));
  };

  const handleFilterColor = (value) => {
    const updatedColor = color.includes(value)
      ? color.filter((item) => item !== value)
      : [...color, value];
    dispatch(getSneakers(page, pageSize, brand, updatedColor, size, price));
    dispatch(colorValue(updatedColor));
  };

  const handleFilterSize = (value) => {
    const updatedSize = size.includes(value)
      ? size.filter((item) => item !== value)
      : [...size, value];
    dispatch(getSneakers(page, pageSize, brand, color, updatedSize, price));
    dispatch(sizeValue(updatedSize));
  };

  const handleOrderPrice = (value) => {
    if (searchData.length > 0) {
      dispatch(searchBar(searchData, page, pageSize, value));
    } else {
      dispatch(getSneakers(page, pageSize, brand, color, size, value));
    }
    dispatch(orderPrice(value));
  };

  return (
    <div className={style.container}>
      <div className={style.containerContent}>
        <div className={style.filterContainer}>
          <div className={style.filterContent}>
            <h4>Brand</h4>
            {["ADIDAS", "NIKE", "NEWBALANCE"].map((brandOption) => (
              <div key={brandOption}>
                <input
                  type="checkbox"
                  value={brandOption}
                  checked={brand.includes(brandOption)}
                  onChange={() => handleFilterBrand(brandOption)}
                />
                <label>{brandOption}</label>
              </div>
            ))}
          </div>
          <br />
          <div className={style.filterContent}>
            <h4>Color</h4>
            {["black", "red", "blue", "pink", "white", "yellow", "green"].map(
              (colorOption) => (
                <div key={colorOption}>
                  <input
                    type="checkbox"
                    value={colorOption}
                    checked={color.includes(colorOption)}
                    onChange={() => handleFilterColor(colorOption)}
                  />
                  <label>{colorOption}</label>
                </div>
              )
            )}
          </div>
          <br />
          <div className={style.filterContent}>
            <h4>Size</h4>
            {["7", "8", "9", "10", "11", "12"].map((sizeOption) => (
              <div key={sizeOption}>
                <input
                  type="checkbox"
                  value={sizeOption}
                  checked={size.includes(sizeOption)}
                  onChange={() => handleFilterSize(sizeOption)}
                />
                <label>{sizeOption}</label>
              </div>
            ))}
          </div>
          <br />
          <div className={style.filterContent}>
            <h4>Price</h4>
            {["min", "max"].map((priceOption) => (
              <div key={priceOption}>
                <input
                  type="checkbox"
                  value={priceOption}
                  checked={price === priceOption}
                  onChange={() => handleOrderPrice(priceOption)}
                />
                <label>{priceOption}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
