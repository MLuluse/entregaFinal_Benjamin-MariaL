import mongoose from "mongoose"

const cartCollection = 'cart'

const cartSchema = new mongoose.Schema({
    id: String,
    products:{
        type: [{
            _id:false,
            //aca la refe para que llame a los productos dentro del carrito
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            }
        }]
    }}
)

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel