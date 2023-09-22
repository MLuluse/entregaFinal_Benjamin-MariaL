import mongoose from "mongoose"

const productCollection = 'product'

const productSchema = new mongoose.Schema({
    title: {type: String, required:true, unique: true},
    description: String,
    price: Number,
    thumbnail: [String],
    code: {type: Number, required: true, unique: true},
    category: String,
    status: Boolean,
    stock: Number
})

const productModel = mongoose.model(productCollection, productSchema)

export default productModel