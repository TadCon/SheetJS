import React from "react";
import ExcelUploader from "../src/components/ExcelUploader";
import ArrayUploader from "./components/ArrayUploader";

function App() {
  return (
    <div>
      <h1>TABLA DE PUNTOS</h1>
      {/* <ExcelUploader /> */}
      <ArrayUploader />
    </div>
  );
}

export default App;
