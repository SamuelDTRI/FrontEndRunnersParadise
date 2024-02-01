import style from "../Paginado/Paginado.module.css";

const Paginado = ({ totalSneaker, page, pageSize, setCurrentPage }) => {
  const totalPages = Math.ceil(totalSneaker / pageSize);
  console.log(page);
  const nextHandler = () => {
    if (page < totalPages) {
      setCurrentPage(page + 1);
    }
  };

  const prevHandler = () => {
    if (page > 1) {
      setCurrentPage(page - 1);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.buttonsContainer}>
        <button
          onClick={prevHandler}
          disabled={page <= 1}
          className={style.buttons}
        >
          ⭀
        </button>
        <span style={{ color: "black" }}>
          {page} of {totalPages}
        </span>
        <button
          onClick={nextHandler}
          className={style.buttons}
          disabled={page >= totalPages}
        >
          ⥱
        </button>
      </div>
    </div>
  );
};

export default Paginado;
