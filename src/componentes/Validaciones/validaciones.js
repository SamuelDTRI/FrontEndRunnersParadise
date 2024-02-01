const validation = (input, existingNames) => {
  let errors = {};

  let noEmpty = /\S+/;
  let validateName = /^[a-zA-ZñÑ\s]*$/; // Permitir espacios en blanco en el nombre

  if (
    Array.isArray(existingNames) &&
    existingNames.some(
      (name) => name.toLowerCase() === input.name.toLowerCase()
    )
  ) {
    errors.name = "Este nombre ya está en uso. Por favor, elige otro.";
  } else if (
    !noEmpty.test(input.name)
      ? !validateName.test(input.name)
      : input.name.trim().length < 3
  ) {
    errors.name = "Nombre necesario. Mayor de 3 letras y único";
  }

  if (!(input.image instanceof File)) {
    errors.image = "Debe ser un archivo válido";
  }

  if (
    isNaN(parseFloat(input.price)) ||
    parseFloat(input.price) < 1 ||
    parseFloat(input.price) > 10000
  ) {
    errors.price = "Ingrese un precio entre 1 y 10000";
  }

  return errors;
};
export default validation;
