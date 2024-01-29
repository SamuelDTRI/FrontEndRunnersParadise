import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styles from './perfil.module.css';
import MapContainer from './googleMap';
import { useCallback } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    profilePicture: "",
    phone: "",
    address: "",
    country: "",
  });

  const [isFormChanged, setIsFormChanged] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });


  const [isEditing, setIsEditing] = useState({
    profilePicture: false,
    name: false,
    phone: false,
    address: false,
    country: false,
  });

  const handleEditClick = (fieldName) => {
    setIsEditing((prevIsEditing) => ({
      ...prevIsEditing,
      [fieldName]: true,
    }));
  };

  const handleLocationChange = useCallback(async (address) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
       if (status === "OK") {
         const location = results[0].geometry.location;
         setCoordinates({ lat: location.lat(), lng: location.lng() });
       } else {
         console.error(`Geocode was not successful for the following reason: ${status}`);
       }
    });
   }, []);

  const handleSaveClick = (e) => {
    e.preventDefault();
    setIsEditing({
      profilePicture: false,
      name: false,
      phone: false,
      address: false,
      country: false,
    });
    setIsFormChanged(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsFormChanged(true);

   
    if (name === 'country' || name === 'address') {
      handleLocationChange(value);
    }
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  
    setIsFormChanged(true);
  };

  const handleBannerChange = (e) => {
    const bannerUrl = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      banner: bannerUrl,
    }));
    setIsFormChanged(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos actualizados:", userData);
   
    setIsEditing({
      profilePicture: false,
      name: false,
      phone: false,
      address: false,
      country: false,
    });
  };

  const areAnyInputsEditing = Object.values(isEditing).some(Boolean);

 return (
  <div className={styles.userProfile}>
     <div className={styles.banner} />
     <div className={styles.profileContainer}>
       <div className={styles.imageContainer}>
      <div className={styles.profilePicture}>
  {uploadedImage ? (
    <img src={uploadedImage} alt="Perfil" />
  ) : (
    <p className={styles.altText}>Carga tu imagen</p>
  )}
</div>
</div>  
       <div className={styles.profileInfo}>
       </div>
       <div className={styles.formContainer}>
         <div className={styles.previewContainer}>
           <div className={styles.previewWrapper}>
             <div className={styles.preview}>
              <div className={styles.textopreview}>

               <h2 className={styles.titulo}>Tus Datos</h2>
               <div className={styles.textoPrev}><br /><br />

               <p>Name: {userData.name}</p> <br /><br />
               <p>Phone: {userData.phone}</p><br /><br />
               <p>Address: {userData.address}</p><br /><br />
               <p>Country: {userData.country}</p><br /><br />
               <div className={styles.googlemap}>

               <MapContainer lat={coordinates.lat} lng={coordinates.lng} />
               </div>
               </div>

              </div>
             </div>
           </div>
           <div className={styles.formWrapper}>
                 <div className={styles.formm}>
                  
             <Tabs>
               <TabList>
                 <Tab>Perfil</Tab>
               </TabList>
               <TabPanel>
              <form onSubmit={handleSubmit}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '3rem', justifyContent: 'flex-start',}}>
              <div style={{display: 'flex', alignItems: 'center'}}>
              <div className={styles.formGroup}>
            <label htmlFor="formProfilePicture">Foto de Perfil</label>
            <input
                id="formProfilePicture"
                type="file"
                placeholder="URL de la foto de perfil"
                name="profilePicture"
                value={userData.profilePicture}
                onChange={handlePictureChange}
                className={styles.formInput}
                disabled={!isEditing.profilePicture}
            />
                          <button
                type="button"
                onClick={() => handleEditClick('profilePicture')}
                className={styles.editButton}
              >
                Editar
              </button>
              </div>
              </div>
              <div className={styles.formGroup}>

              <div style={{display: 'flex', alignItems: 'center'}}>
              <label htmlFor="formName" className={styles.txt}>Nombre</label>
              <input
              id="formName"
              type="text"
              placeholder="Nombre"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className={styles.formInput}
              disabled={!isEditing.name}
              />
              <button type="button" onClick={() => handleEditClick('name')} className={styles.editButton}>
                Editar
              </button> 
              </div>
              </div>

              <div className={styles.formGroup}>
              <div style={{display: 'flex', alignItems: 'center'}}>
              <label htmlFor="formName" className={styles.txt}>Telefono</label>
              <input
             id="formPhone"
              type="text"
              placeholder="Teléfono"
             name="phone"
            value={userData.phone}
            onChange={handleChange}
            className={styles.formInput}
            disabled={!isEditing.phone}
            />
            <button type="button" onClick={() => handleEditClick('phone')} className={styles.editButton}>
             Editar
          </button>
          </div>
          </div>

          <div className={styles.formGroup}>

          <div style={{display: 'flex', alignItems: 'center'}}>
            <label htmlFor="formAddress" className={styles.txt}>Dirección</label>
            <input
                id="formAddress"
                type="text"
                placeholder="Dirección"
                name="address"
                value={userData.address}
                onChange={handleChange}
                className={styles.formInput}
                disabled={!isEditing.address}
            />
            <button type="button" onClick={() => handleEditClick('address')} className={styles.editButton}>
             Editar
          </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <div style={{display: 'flex', alignItems: 'center'}}>
          <label htmlFor="formCountry" className={styles.txt}>Ciudad</label>
            <input
                id="formCountry"
                type="text"
                placeholder="Ciudad"
                name="country"
                value={userData.country}
                onChange={handleChange}
                className={styles.formInput}
                disabled={!isEditing.country}
            />
            <button type="button" onClick={() => handleEditClick('country')} className={styles.editButton}>
             Editar
          </button>
          </div>
          </div>
          </div>

          <button
        type="submit"
        className={styles.submitButton}
        disabled={!areAnyInputsEditing}
      >
        Guardar Cambios
      </button>
          </form>
        </TabPanel>
      </Tabs>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
 );
};

export default UserProfile;