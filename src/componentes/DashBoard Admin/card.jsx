import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  getSneakers,
  searchBar,
  brandValue,
  colorValue,
  sizeValue,
  orderPrice,
} from "../../redux/actions/actions";
import { AuthContext } from "../AuthProvider/authProvider";

export default function ImgMediaCard(props) {
  const { data } = props;
  console.log("esta es la data que recibe la card", data);
  const { setIsOpen } = React.useContext(AuthContext);
  const { editedProduct, setEditedProduct } = React.useContext(AuthContext);
  const dispatch = useDispatch();

  const deleteElement = async (idKey) => {
    try {
      const response = await axios.delete(
        `https://backendrunnersparadise-production.up.railway.app/products/delete/${idKey}`
      );
      if (response.status === 200) {
        console.log("Elemento eliminado correctamente");
      } else {
        console.log("Hubo un problema al eliminar el elemento");
      }
    } catch (error) {
      console.error("Error al eliminar el elemento:", error);
    }
    dispatch(getSneakers(), [dispatch]);
  };

  const handleEdit = (product) => {
    setEditedProduct(product);
    setIsOpen(true);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={data.image[0].secure_url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.brand}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.name}
          {data.color}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            deleteElement(data.id);
          }}
        >
          Borrar
        </Button>
        <Button
          size="small"
          onClick={() => {
            handleEdit(data);
          }}
        >
          Editar
        </Button>
      </CardActions>
    </Card>
  );
}
