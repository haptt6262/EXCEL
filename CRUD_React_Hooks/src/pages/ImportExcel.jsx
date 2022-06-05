import React, { useState } from "react";
import { useItem } from "../hooks";
import { fileType } from "../container/actionType/ItemType"

function ImportExcel() {
    const { handleUploadExcel } = useItem();

    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);

    const handleFile = (e) => {
        let file = e.target.files[0];
        if (file) {
            if (file && fileType.includes(file.type)) {
                let arr = [];
                arr.push(file);
                setExcelFile(arr);
                setExcelFileError(null);
            } else {
                setExcelFileError("Please select only excel file types");
                setExcelFile(null);
            }
        } else {
            alert("Please select excel file")
        }
    };
    const handleImport = () => {
        let form = new FormData();
        console.log(...form, "form page");
        for (let i = 0; i < excelFile.length; i++) {
            form.append("excel", excelFile[i]);
        }
        handleUploadExcel({ form: form });
    };
    return (
        <div>
            <input type="file" onChange={handleFile} />
            {excelFileError && (
                <div className="text-danger" style={{ marginTop: "5px" }}>
                    {excelFileError}
                </div>
            )}
            <button onClick={handleImport}>IMPORT</button>
        </div>
    );
}

export default ImportExcel;
