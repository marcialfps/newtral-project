//Funcion para convertir numero decimal con coma a Float
//Primero se comprueba el valor para evitar valores undefined/null
//Luego se sustituyen las comas por puntos y se hace el parseo
exports.convertStringToDouble = (value) =>
  value ? parseFloat(value.replace(",", ".")) : undefined;
