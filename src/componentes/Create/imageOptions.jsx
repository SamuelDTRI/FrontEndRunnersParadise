import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./imageOptions.css";

const ImageOptions = ({
  imageOptions,
  setImageOptions,
  imageUrls,
  setImageUrls,
  imageFiles,
  setImageFiles,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFileInput, setShowFileInput] = useState(false);

  const handleTypeChange = (index, event) => {
    const newImageOptions = [...imageOptions];
    newImageOptions[index].type = event.target.value;
    setImageOptions(newImageOptions);
  };

  const handleValueChange = (index, event) => {
    const newImageOptions = [...imageOptions];
    const value = event.target.value;
    newImageOptions[index].value = value;
    setImageOptions(newImageOptions);

    // Si el tipo es 'url', actualiza imageUrls con la nueva URL
    if (newImageOptions[index].type === "url") {
      const newImageUrls = [...imageUrls];
      newImageUrls[index] = value;
      setImageUrls(newImageUrls);
    }
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files;
    if (file) {
      const newImageFiles = imageFiles;

      setImageFiles(newImageFiles);

      const reader = new FileReader();
      reader.onload = function (e) {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = e.target.result;
        setImageUrls(newImageUrls);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageOption = () => {
    const newImageOption = {
      id: uuidv4(),
      type: "file",
      value: "",
      file: null,
    };
    setImageOptions([...imageOptions, newImageOption]);
  };

  const handleRemoveImageOption = (index) => {
    const newImageOptions = [...imageOptions];
    const newImageUrls = [...imageUrls];
    const newImageFiles = [...imageFiles];

    newImageOptions.splice(index, 1);
    newImageUrls.splice(index, 1);
    newImageFiles;

    setImageOptions(newImageOptions);
    setImageUrls(newImageUrls);
    setImageFiles(newImageFiles);

    if (index === currentImageIndex && imageUrls) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < imageUrls.length - 1 ? prevIndex : prevIndex - 1
      );
    } else if (index === currentImageIndex && imageUrls) {
      setCurrentImageIndex(0);
    }
  };

  return (
    <>
      {imageOptions.map((option, index) => (
        <div key={option.id} className="image-option-container">
          {option.type === "file" && (
            <input
              type="file"
              onChange={(event) => handleFileChange(index, event)}
            />
          )}
          <button
            type="button"
            onClick={() => handleRemoveImageOption(index)}
            className="image-option-remove-button"
          >
            X
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddImageOption}
        className="image-option-add-button"
      >
        Agregar nueva imagen
      </button>
    </>
  );
};

export default ImageOptions;
