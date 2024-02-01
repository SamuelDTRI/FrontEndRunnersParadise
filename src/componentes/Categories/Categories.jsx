import style from "./Categories.module.css";

const Categories = () => {
  return (
    <div className={style.container}>
      <div className={style.containerContent}>
        <ul className={style.brandList}>
          {/* <li className={style.brandNike}>
            <img src="\src\assets\nikeblanco.png" alt="" />
          </li>
          <li className={style.brandAdidas}>
            <img src="\src\assets\logoadidaswhite.png" alt="" />
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
