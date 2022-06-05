import React, { useState } from 'react'
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { fileType } from "../container/actionType/ItemType"

function Export(props) {
    const [fileName] = useState("excelFile");
    const handleExportItems = () => {
        const fileExtension = ".xlsx";
        const ws = XLSX.utils.json_to_sheet(props.checkBoxes);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    return (
        <div>
            {/* Excel export with the specified element */}
            <button onClick={handleExportItems}>EXPORT ITEMS</button>
        </div>
    )
}

export default Export