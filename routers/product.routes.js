const express = require("express")
const { listProduct, getproducts, getproductsBy, } = require("../controllers/product.controller")
const { verifyUser } = require("../controllers/user.controller")

const router = express.Router()

router.post("/addProduct", verifyUser, listProduct)
router.get("/products", verifyUser, getproducts)
router.get("/productBy", verifyUser, getproductsBy)


module.exports = router