import{Router} from 'express'
import ProductManager from '../productManager.js' 

const router = Router()

const productManager = new ProductManager('./data/products.json')


router.get('/home', async(req, res)=>{
    const products = await productManager.getProducts()
    if (!products) return res.status(404).json({status: 'error', error: 'no hay productos'})
    return  res.render("home", {products})
})

router.get('/realtimeproducts', async(req, res)=>{
res.render('realtimeproducts',{})

})


export default router

//const products = await productManager.getProducts()
//if(!products) return res.status(404).json({status: 'error', error: 'no hay productos'})
//return  res.render("realtimeproducts", {products})