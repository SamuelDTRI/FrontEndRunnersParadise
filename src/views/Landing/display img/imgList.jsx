import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import styles from "../display img/imgList.module.css";

export default function StandardImageList({ style }) {
  return (
    <div>
      <div className={styles.container}>
        <ImageList
          sx={{
            width: 500,
            margin: "0",
            overflow: "hidden",
            filter: "blur(2px)",
          }}
          cols={2}
          rowHeight={300}
          style={style}
        >
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
                style={{ style }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
}

const itemData = [
  {
    img: "https://www.neo2.com/wp-content/uploads/west-NYC.jpg",
    title: "Breakfast",
  },
  {
    img: "https://i.pinimg.com/originals/ac/76/4e/ac764e4b32c8cb90a7a45820bff981df.jpg",
    title: "Burger",
  },
  {
    img: "https://img.freepik.com/fotos-premium/compras-tienda-mujer-joven-elige-zapatos-nuevos_307890-4751.jpg",
    title: "Camera",
  }, //
  {
    img: "https://www.neo2.com/wp-content/uploads/outro-studio-eci.jpg",
    title: "Coffee",
  }, //
  {
    img: "https://www.fivesneakershop.com/uploads/store_photo/image/22/Tienda-retocada-3.jpg",
    title: "Hats",
  },
  {
    img: "https://previews.123rf.com/images/andron19821982/andron198219822206/andron19821982220600497/189981747-un-hombre-en-una-zapater%C3%ADa-eligiendo-zapatillas-deportivas-un-comprador-est%C3%A1-hablando-por-tel%C3%A9fono.jpg",
    title: "Honey",
  }, //
  {
    img: "https://www.neo2.com/wp-content/uploads/slam-city-skates.jpg",
    title: "Basketball",
  },
  {
    img: "https://www.zapatillasysneakers.com/sites/default/files/static/images/mejores_tiendas_zapatillas_valencia_skater_world_1.jpeg",
    title: "Fern",
  },
  {
    img: "https://i.pinimg.com/564x/c4/cf/49/c4cf49b18586de6310b4daf440dbc911.jpg",
    title: "Mushrooms",
  },
  {
    img: "https://www.neo2.com/wp-content/uploads/bodega-1.jpg",
    title: "Tomato basil",
  },
  {
    img: "https://www.neo2.com/wp-content/uploads/wish.jpg",
    title: "Sea star",
  },
  {
    img: "https://www.neo2.com/wp-content/uploads/sneakersnstuff.jpg",
    title: "Bike",
  },
];
