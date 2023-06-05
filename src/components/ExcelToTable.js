import { useState } from "react";

const ExcelToTable = () => {
  const newPoint = {
    merchant: "",
    address: "",
    x: "",
    y: "",
    normalizedAddress: "",
    marker: "",
  };
  const [tableData, setTableData] = useState([]);
  const [addPoint, setAddPoint] = useState(false);
  const headers = Object.keys(newPoint);

  const populateTable = (data) => {
    const newData = data
      .split("\n")
      .map((row) => row.trim())
      .filter((trimmedRow) => trimmedRow !== "")
      .map((trimmedRow) => trimmedRow.split("\t").map((cell) => cell.trim()));

    const newObjects = newData.map((row) =>
      row.reduce((obj, cell, index) => {
        obj[Object.keys(newPoint)[index]] = cell;
        return obj;
      }, {})
    );

    setTableData((prevData) => [...prevData, ...newObjects]);
  };

  const handlePaste = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("text");
    e.preventDefault();
    populateTable(pastedData);
  };

  const handleDelete = (index) => {
    setTableData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleAddPoint = () => {
    setAddPoint((prevState) => !prevState);
  };

  return (
    <div>
      <table style={{ border: "2px solid", width: "100%" }} onPaste={handlePaste}>
        <thead>
          <tr>
            {headers.map((header) => {
              return <th>{header}</th>;
            })}
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {addPoint && (
            <tr>
              {headers.map((header, index) => {
                return <td key={index}><input type="text" /></td>;
              })}
              <td>
                <button type="button">Guardar</button>
              </td>
            </tr>
          )}
          {tableData.map((point, index) => {
            return (
              <tr key={index}>
                {headers.map((header, index) => {
                  return <td key={index}>{point[header]}</td>;
                })}
                <td>
                  <button type="button" onClick={() => handleDelete(index)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button type="button" onClick={handleAddPoint}>
        Agregar
      </button>
    </div>
  );
};

export default ExcelToTable;
