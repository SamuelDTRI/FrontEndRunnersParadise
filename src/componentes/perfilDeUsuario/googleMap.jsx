import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = ({ lat, lng }) => {
 const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
 const defaultCenter = {
    lat: lat, lng: lng
 }
  
 return (
     <LoadScript
       googleMapsApiKey='AIzaSyBNlzbwdPZiL2tlVzySDUoA9MoD3O8VAw0'>
       <GoogleMap
         mapContainerStyle={mapStyles}
         zoom={13}
         center={defaultCenter}
       >
         <Marker position={defaultCenter} />
       </GoogleMap>
     </LoadScript>
 )
}

export default MapContainer;