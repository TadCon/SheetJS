import React, { useState } from "react";

function ArrayUploader() {
  const lista = [
    ["ID", "Merchant", "Provincia", "Dirección", "X", "Y", "Logo", "Marker"],
    [
      "1",
      "Persona 1",
      "CABA",
      "Rivadavia 1234",
      "-34 48",
      "-62 23",
      "logo",
      "https://digiventures-whitelabel.s3.amazonaws.com/whitelabel/markers_super.png",
    ],
    [
      "2",
      "Persona 2",
      "CABA",
      "Avellaneda 5678",
      "-54 24",
      "-23 53",
      "logo",
      "https://digiventures-whitelabel.s3.amazonaws.com/whitelabel/markers_super.png",
    ],
  ];
  const [data, setData] = useState(lista);
  const [editable, setEditable] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [newObject, setNewObject] = useState(Array(data[0].length).fill(""));

  const handleArrayUpload = () => {
    //Valida que los campos no estén vacíos
    if (newObject.some((cell) => cell === "")) {
      //TODO - Enviar un mensaje de que los campos no pueden estar vacíos
      return;
    }

    setData((prevData) => [...prevData, newObject]); //Agregar objeto al array.
    setShowInputs(false); //Replegar los inputs para crear un nuevo objeto.
    setNewObject(Array(data[0].length).fill("")); //Vacía los campos de la creación de un nuevo objeto.
  };

  /** La función handleEditToggle hace que el contenido de la tabla sea editable
   * al modificar con un estado boolean la propiedad "contentEditable" de todos los campos.
   */
  const handleEditToggle = () => {
    setEditable((prevEditable) => !prevEditable);
  };

  const handleInputChange = (event, index) => {
    const { value } = event.target;
    setNewObject((prevObject) => [
      ...prevObject.slice(0, index),
      value,
      ...prevObject.slice(index + 1),
    ]);
  };

  /** La función showAddObject despliega o repliega los inputs necesarios para agregar un nuevo objeto.  */
  const showAddObject = () => {
    setShowInputs((prevState) => !prevState);
  };

  return (
    <div>
      <button onClick={handleEditToggle}>
        {editable ? "Terminar edición" : "Editar contenido"}
      </button>
      {!showInputs && (
        <button onClick={showAddObject}>
          Agregar objeto con campos vacíos
        </button>
      )}
      {showInputs && (
        <div>
          <p>Ingrese los valores para el nuevo objeto:</p>
          {newObject.map((cell, index) => (
            <input
              key={index}
              type="text"
              value={cell}
              onChange={(event) => handleInputChange(event, index)}
            />
          ))}
          <button onClick={handleArrayUpload}>Agregar objeto</button>
          <button onClick={showAddObject}>Cancelar</button>
        </div>
      )}
      <table>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  contentEditable={editable}
                  key={cellIndex}
                >
                  {cell}
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
