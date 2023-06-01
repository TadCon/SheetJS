/* NOTE - 
  - Si la propiedad del objeto está vacía, en la tabla debe figurar un disclaimer 
  en color rojo que diga "el campo no fue provisto"
  - Tener en cuenta que los objetos no están normalizados
  - Agregar interacciones con el usuario en: edición, eliminación y adición de campos

  TODO - 
  eliminar la propiedad "_id"
  agregar labels arriba de cada input de creación de punto
  
 */
import React, { useState, useEffect } from "react";

function ArrayUploader() {
  const lista = [
    {
      _id: "6477a5c0dc92026165c3e13e",
      disabled: false,
      brand: "MAYORISTASSN",
      merchantId: 1,
      storeName: "ALCO SANTA FE ",
      country: "ARGENTINA",
      province: "SANTA FE",
      city: "SANTA FE",
      address: "BLAS PARERA 6648",
      x: -31.601017,
      y: -60.7211385,
      promoId: "",
      marker:
        "https://digiventures-whitelabel.s3.amazonaws.com/whitelabel/markers_super.png",
    },
    {
      _id: "64541af57291276c3a52c7a8",
      status: "active",
      x: -37.987129,
      y: -57.555494,
      brand: "INDUMENTARIA",
      marker:
        "https://digiventures-whitelabel.s3.amazonaws.com/whitelabel/markers-indumentaria.png",
      text: "ACCION DIRECTA - AV LIBERTAD 3902, MAR DEL PLATA, BUENOS AIRES - Aplica con: Mastercard Débito y Crédito - VISA Crédito",
    },
  ];

  const commonProperties = [
    "_id",
    "merchantId",
    "province",
    "address",
    "x",
    "y",
    "logo",
    "marker",
  ]; //Indica las propiedades que serán mostradas y su orden.

  const point = {
    _id: "",
    merchantId: "",
    province: "",
    address: "",
    x: "",
    y: "",
    logo: "",
    marker: ""
  }
  
  const [data, setData] = useState(lista);
  const [editable, setEditable] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [newObject, setNewObject] = useState(point);

  useEffect(() => {
    //console.log(lista);
  });

  const handleArrayUpload = () => {
    //Valida que los campos no estén vacíos
      if (!Object.values(newObject).some((value) => value === "")) {
      setData((prevData) => [...prevData, newObject]); //Agregar objeto al array.
      setShowInputs(false); //Replegar los inputs para crear un nuevo objeto.
      setNewObject(Array(data[0].length).fill("")); //Vacía los campos de la creación de un nuevo objeto.
      return <span style={{ color: "red" }}>CAMPO VACÍO</span>;
    }
  };

  /** La función handleEditToggle hace que el contenido de la tabla sea editable
   * al modificar con un estado boolean la propiedad "contentEditable" de todos los campos.
   */
  const handleEditToggle = () => {
    setEditable((prevEditable) => !prevEditable);
  };

   const handleInputChange = (event, index, cell) => {
    const { value } = event.target;
    console.log("object", newObject);
    setNewObject({ ...newObject, [cell]: value});
  }; 
  

  /** La función showAddObject despliega o repliega los inputs necesarios para agregar un nuevo objeto.  */
  const showAddObject = () => {
    setShowInputs((prevState) => !prevState);
  };

  const checkIsEmpty = (obj) => {
    if (obj === null || obj === undefined || obj === "") {
      return <span style={{ color: "red" }}>CAMPO VACÍO</span>;
    } else {
      return obj;
    }
  };

  return (
    <div>
      <button onClick={handleEditToggle}>
        {editable ? "Terminar edición" : "Editar contenido"}
      </button>
      {!showInputs && <button onClick={showAddObject}>Agregar objeto:</button>}
      {showInputs && (
        <div>
          <p>Ingrese los valores para el nuevo objeto:</p>
          {commonProperties.map((cell, index) => (
            <input
              key={index}
              type="text"
              //value={cell}
              onChange={(event) => handleInputChange(event, index, cell)}
              //onChange={(event) => setNewObject({ ...newObject, cell: event.target.value })}

            />
          ))}
          <button onClick={handleArrayUpload}>Agregar objeto</button>
          <button onClick={showAddObject}>Cancelar</button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            {commonProperties.map((prop) => (
              <th key={prop}>{prop}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {commonProperties.map((prop) => (
                <td contentEditable={editable} key={prop}>
                  {checkIsEmpty(row[prop])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ArrayUploader;
