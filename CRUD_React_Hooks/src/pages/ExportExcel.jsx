import React, { useState } from 'react'
import { useItem } from "../hooks";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { fileType } from "../container/actionType/ItemType"

function ExportExcel() {
    const { allData } = useItem();
    const [fileName] = useState("excelFile");
    const handleExport = () => {
        const fileExtension = ".xlsx";
        const ws = XLSX.utils.json_to_sheet(allData);
        // sheetName: tên của trang tính(["ten trang tính tự đặt"]), 
        //sheets: dữ liệu của trang tính({key là tên trang tính-sheetName:value là dữ liệu của trang tính})
        const wb = { Sheets: { data: ws }, SheetNames: ["data", "data2"] };
        //write(dữ liệu, options: đuôi file là xlsx và kiểu dữ liệu được viết ra là mảng)
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        // tạo ra 1 file excel với blob([dữ liệu], {type: kiểu file muốn xuất})
        const data = new Blob([excelBuffer], { type: fileType });
        // file saver để lưu file (file excel, tên file + đuôi file)
        FileSaver.saveAs(data, fileName + fileExtension);
    };
    return (
        <div>
            <button onClick={handleExport}>EXPORT</button>
        </div>
    )
}

export default ExportExcel