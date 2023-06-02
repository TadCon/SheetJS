import { useState } from "react";

/* //TODO - 
- El copy debe ser a partir de un campo que se despliega con un botón "insertar campos"
- Limitar el texto de X e Y
- Mapear los campos del table head
- Borrar y editar a partir de acción con botones individuales para cada línea
 */

const ExcelToTable = () => {
  const [tableData, setTableData] = useState([]);

  // Parse text and populate the table with pasted data
  const populateTable = (data) => {
    const newData = data
      .split("\n") // Split the data into rows
      .map((row) => row.trim()) //Trim white spaces around each text
      .filter((trimmedRow) => trimmedRow !== "")
      .map((trimmedRow) => trimmedRow.split("\t").map((cell) => cell.trim()));

    console.log(newData);
    setTableData(newData);
  };

  // Handle paste event on the table
  const handlePaste = (e) => {
    // Get the clipboard data
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("text");

    // Prevent default paste behavior
    e.preventDefault();

    // Populate the table with pasted data
    populateTable(pastedData);
  };

  return (
    <div>
      <table style={{ border: "2px solid" }} onPaste={handlePaste}>
        <thead>
          <tr>
            <th>Merchant</th>
            <th>Address</th>
            <th>X</th>
            <th>Y</th>
            <th>NORMALIZED ADDRESS</th>
            <th>ACTION</th>
            <th>MARKER</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  <input type="text" value={cell} readOnly />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelToTable;
