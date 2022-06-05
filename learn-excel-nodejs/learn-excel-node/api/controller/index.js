const ItemModel = require("../model/index")
const domain = `http://localhost:3001/`
const fs = require("fs/promises")
const XLSX = require("xlsx");
const path = require("path")

exports.getItem = async (req, res) => {
    try {
        let listItem = await ItemModel.find()
        res.json({ listItem: listItem, message: "Get Items successfully!" })
    } catch (error) {
        res.send({ error: error.message })
    }
}
exports.addItem = async (req, res) => {
    try {
        let name = req.body.name
        let listItem = await ItemModel.create({ Name: name })
        res.json({ listItem: listItem, message: " Items were successfully added!" })
    } catch (error) {
        res.send({ error: error.message })
    }
}
exports.deleteItem = async (req, res) => {
    try {
        let id = req.params.id
        let listItem = await ItemModel.findByIdAndDelete(id)
        res.json({ listItem: listItem, message: " Items were successfully deleted!" })
    } catch (error) {
        res.send({ error: error.message })
    }
}
exports.updateItem = async (req, res) => {
    try {
        let id = req.params.id
        let name = req.body.name
        let listItem = await ItemModel.findByIdAndUpdate(id, { Name: name }, { new: true })
        res.json({ listItem: listItem, message: " Items were successfully updated!" })
    } catch (error) {
        res.send({ error: error.message })
    }
}
// exports.searchItem = async (req, res) => {
//     try {
//         let textSearch = req.query.textSearch
//         let listItem = await ItemModel.find({ Name: { $regex: textSearch, $options: "i" } })
//         res.json({ listItem: listItem, message: "Get Items successfully!" })
//     } catch (error) {
//         res.send({ error: error.message })
//     }
// }

exports.paginationItem = async (req, res) => {
    try {
        let activePage = parseInt(req.query._page)
        let limit = parseInt(req.query._limit)
        let skip = (activePage - 1) * limit
        let totalRecord = await ItemModel.countDocuments()
        let allData = await ItemModel.find().select('-_v')
        // console.log(allData, "all");
        let totalPage = Math.ceil(totalRecord / limit)
        let listItem = await ItemModel.find().skip(skip).limit(limit)
        res.send({ listItem: listItem, totalPage: totalPage, allData: allData })
    } catch (error) {
        res.send(error)
    }
}
exports.searchPaginationItem = async (req, res) => {
    try {
        let textSearch = req.query.q
        let activePage = parseInt(req.query._page)
        let limit = parseInt(req.query._limit)
        let skip = (activePage - 1) * limit
        let totalRecord = await ItemModel.countDocuments({ Name: { $regex: textSearch, $options: "i" } })
        let totalPage = Math.ceil(totalRecord / limit)
        let listItem = await ItemModel.find({ Name: { $regex: textSearch, $options: "i" } }).skip(skip).limit(limit)
        res.send({ listItem, totalPage })
    } catch (error) {
        res.send(error)
    }
}

exports.readExcelFile = async (req, res) => {
    let file = req.files[0]
    console.log(file, 'file');
    var workbook = XLSX.readFile(file.path)
    var worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
    let DataExcel = ItemModel.insertMany(worksheet, (err, data) => {
        if (err) res.send(err);
        res.json(data);
    });
}
exports.filterData = async (req, res) => {
    try {
        let startValue = req.query.start
        let endValue = req.query.end
        let listItem = await ItemModel.find()
        let list = listItem.filter(el => {
            return listItem.indexOf(el) >= startValue && listItem.indexOf(el) <= endValue
        })
        res.send(list)
    } catch (error) {
        res.send(error)
    }
}

// import readXlsxFile from 'read-excel-file'
// const input = document.getElementById('input')
// input.addEventListener('change', () => {
//   readXlsxFile(input.files[0]).then((rows) => {
//     // `rows` is an array of rows    // each row being an array of cells.
//   })})