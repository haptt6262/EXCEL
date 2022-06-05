const ItemController = require("../controller/index")

const Routes = (app) => {
    app.route("/items").get(ItemController.getItem).post(ItemController.addItem)
    app.route("/items/:id").delete(ItemController.deleteItem).put(ItemController.updateItem)
    app.route("/pagination").get(ItemController.paginationItem)
    app.route("/search-pagination").get(ItemController.searchPaginationItem)
    app.route("/excel").post(ItemController.readExcelFile)
    app.route("/filter").get(ItemController.filterData)
}
module.exports = Routes