import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import productRouter from './routers/products.router.js'
import cartRouter from './routers/cart.router.js'
import viewsRouter from './routers/views.router.js'
//import ProductManager from './productManager.js'



const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//const pm = new ProductManager('./data/products.json')

//aca setea handlebars
app.engine('handlebars', handlebars.engine()) 
app.set('views', './src/views') 
app.set('view engine', 'handlebars') 

app.use(express.static('./src/public')) //esto para mostara vistas

//products router
app.use('/api/products', productRouter)
//cart router
app.use('/api/carts', cartRouter)

//ruta raiz donde se ven los productos con handlebars
app.use('/', viewsRouter)


try{
    await mongoose.connect('mongodb+srv://coder:coder@cluster0.9dp3egu.mongodb.net/', {
        dbName:'ecommerce'
    })

const httpServer = app.listen(8080, ()=> console.log('Server up!'))
const socketServer = new Server(httpServer)

socketServer.on('connection', socketClient => {
    console.log('new connection', socketClient.id)
    socketClient.on('productList', async () => {
        const productList = await pm.getProducts();
        console.log(productList)
      
        socketServer.emit('updatedProducts', productList)
    })
})

const messages = []

socketServer.on('connection', socketClient =>{
    console.log('usuario andando')
    socketClient.on('message', data => {
        messages.push(data)
        socketServer.emit('logs', messages)
    })
})

} catch(err){
    console.log(err.messages)
}
