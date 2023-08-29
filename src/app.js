import  express from 'express'
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import productRouter from './routers/products.router.js'
import cartRouter from './routers/cart.router.js'
import viewsRouter from './routers/views.router.js'



const app = express()
app.use(express.json())


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
app.use('/',viewsRouter )


const httpServer = app.listen(8080, ()=> console.log('Server up!'))
const socketServer = new Server(httpServer)

socketServer.on(' connection', ()=>{
    console.log('new connection')

})


//    socketClient.on("productList", (data) => {
//  socketServer.emit("updatedProducts", data)})