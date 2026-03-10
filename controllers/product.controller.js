const ProductModel = require("../models/product.model")
const cloudinary = require("cloudinary").v2


cloudinary.config({
    api_key:process.env.CLOUD_KEY,
    cloud_name:process.env.CLOUD_NAME,
    api_secret:process.env.CLOUD_SECRET
})


const listProduct= async (req, res)=>{
    const{productName, productPrice, productQuantity, productImage}= req.body

    
    
    try {
        // console.log(productImage);
       const result = await cloudinary.uploader.upload(productImage)

       let image = {
        public_id:result.public_id,
        secure_url: result.secure_url
       }

        const product = await ProductModel.create({
            productName,
            productPrice,
            productQuantity,
            productImage:image,
            createdBy:req.user.id
        })

        res.status(201).send({
            message:"Product added successfully",
            data:product
        })
    } catch (error) {
        console.log(error);

        res.status(400).send({
            message:"Error adding product"
        })
        
    }
}


const getproducts=async(req, res)=>{
    try {
        const products = await ProductModel.find().populate("createdBy","firstName lastName email")

        res.status(200).send(
            {
                message:"Products fetched successfully",
                data:products

            }
        )
    } catch (error) {
        console.log(error);
        
        res.status(404).send({
            message:"failed to fetch products"
        })
    }
}

const getproductsBy=async(req, res)=>{
    const {productName, productPrice, createdBy}= req.query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * 10;

    try {
        const filter ={}
        if(productName)
          filter.productName={$regex:productName , $options:"i"} 
        if(productPrice)
            filter.productPrice= productPrice
        if(createdBy)
            filter.createdBy= createdBy
        // if(author)
        //     filter.author= {$regex:author.firstName, $options:"i"}

        const product =await ProductModel.find(filter).populate("createdBy","firstName lastName email").skip(skip).limit(limit).sort({createdAt: -1})

        const total = await ProductModel.countDocuments(filter)

        res.status(200).send({
            message:"products fetched successfully",
            data:product,
            meta:{
                currentPage:page,
                totalPages:Math.ceil(total/limit),
                total
            }
        })
        
    } catch (error) {
        console.log(error);
        
        res.status(404).send({
            message:"failed to fetch products"
        })
    }
}



module.exports= {
    listProduct,
    getproducts,
    getproductsBy
}