import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Products.css";
import ImgMediaCard from "./card";
import {
  getSneakers,
  searchBar,
  brandValue,
  colorValue,
  sizeValue,
  orderPrice,
} from "../../redux/actions/actions";
import { AuthContext } from "../AuthProvider/authProvider";

const ProductManager = () => {
  const dispatch = useDispatch();
  const { isOpen, setIsOpen } = useContext(AuthContext);
  const { editedProduct, setEditedProduct } = useContext(AuthContext);

  const [brandFilter, setBrandFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const currentPage = useSelector((state) => state?.currentPage);
  const pageSize = 8;
  const brand = useSelector((state) => state?.brandValue);
  const color = useSelector((state) => state?.colorValue);
  const size = useSelector((state) => state?.sizeValue);
  const price = useSelector((state) => state?.orderPrice);
  const products = useSelector((state) => state.sneakers);
  console.log("aqui", products);
  console.log("colores", color);
  console.log("talles", size);
  console.log("marca", brand);
  useEffect(() => {
    // Llama a la acción de Redux getSneakers con los filtros actuales
    dispatch(
      getSneakers(currentPage, pageSize, brandFilter, colorFilter, sizeFilter)
    );
  }, [dispatch, currentPage, pageSize, brandFilter, colorFilter, sizeFilter]);
  const filteredProducts = products.filter((product) => {
    return (
      (brandFilter === "" ||
        product.brand.toLowerCase() === brandFilter.toLowerCase()) &&
      (sizeFilter === "" || product.size.includes(sizeFilter)) &&
      (colorFilter === "" ||
        product.colors.includes(colorFilter.toLowerCase())) &&
      (searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const sizeOptions = [
    { value: "7", label: "7" },
    { value: "7.5", label: "7.5" },
    { value: "8", label: "8" },
    { value: "8.5", label: "8.5" },
    { value: "9", label: "9" },
    { value: "9.5", label: "9.5" },
    { value: "10", label: "10" },
    { value: "10.5", label: "10.5" },
    { value: "11", label: "11" },
    { value: "11.5", label: "11.5" },
    { value: "12", label: "12" },
  ];

  const brands = ["NIKE", "ADIDAS", "NEWBALANCE"];

  const colors = [
    { value: " ", label: "select a Color" },
    { value: "black", label: "black" },
    { value: "red", label: "red" },
    { value: "blue", label: "blue" },
    { value: "orange", label: "orange" },
    { value: "white", label: "white" },
  ];

  return (
    <div>
      <div>
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
        >
          <option value="">Todas las marcas</option>
          {brands.map((brandOption) => (
            <option key={brandOption} value={brandOption}>
              {brandOption}
            </option>
          ))}
        </select>

        <select
          value={sizeFilter}
          onChange={(e) => setSizeFilter(e.target.value)}
        >
          <option value="">Todos los talles</option>
          {sizeOptions.map((sizeOption) => (
            <option key={sizeOption.value} value={sizeOption.value}>
              {sizeOption.label}
            </option>
          ))}
        </select>

        <select
          value={colorFilter}
          onChange={(e) => setColorFilter(e.target.value)}
        >
          {colors.map((colorOption) => (
            <option key={colorOption.value} value={colorOption.value}>
              {colorOption.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Busque aquí por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="product-container">
        {filteredProducts.map((product) => (
          <ImgMediaCard data={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductManager;
