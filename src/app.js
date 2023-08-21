import  express from "express";
import productRouter from './routers/products.router.js'
import cartRouter from './routers/cart.router.js'


const app = express()
app.use(express.json())

//products router
app.use('/api/products', productRouter)

//cart router
app.use('/api/carts', cartRouter)

app.listen(8080, ()=> console.log('Server up!'))
