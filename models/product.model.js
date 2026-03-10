const mongoose = require("mongoose")


const ProductSchema = new mongoose.Schema({
    productName:{type: String, required: true},
    productPrice:{type: Number, required: true},
    productPrice:{type: Number, required: true},
    productQuantity:{type: Number, required: true},
    productImage:{
        public_Id:{type:String, required:true},
        secure_url:{type:String, required:true}
    
},

    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"user"}
}, {timestamps:true, strict:"throw"})

const ProductModel = mongoose.model("product", ProductSchema)

module.exports = ProductModel