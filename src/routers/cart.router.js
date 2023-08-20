//aca voy a tener que poner ruta POST (ID Y Y ARRAY DE PRODUCTS) GET (DEBERA DAR LOS PROD QUE ESTEN EN EL ID DE CARRITO)PUT
import { Router } from "express"; 
import CartManager from '../cartManager.js'

const router = Router() 
const cartManager = new CartManager('./data/cart.json')

router.post('/', async(req, res) =>{
    const result = await cartManager.createCart() //aca llama al crear carrito
    //aca tiene que postear un nuevo carrito
    if (typeof result == 'string'){
        const error = result.split('')
        return res.status(404).json({status:'error', payload: error})
    }
    res.status(201).json({status: 'success', payload: result})
})



router.get('/:cid', async (req, res) => {
//tiene que traer todo los productos dentro de ese carrito id 
   const id = parseInt(req.params.cid)
   const result = await cartManager.getProductsFromCart(id)
   if(typeof result =='string'){
    const error = result.split('')
    return res.status(404).json({status: 'error', payload:'The cart does not exist'})
   }
   res.status(200).json({status:'success', payload: result})
  })


//producto y cantidad----> si el producto ya existe aumentar la cantidad
router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const productData = req.body;

    const result = await cartManager.addOrUpdateProduct(cartId, productId, productData);//aca metodo falta
    
    if (typeof result === 'string') {
        const error = result.split('');
        return res.status(404).json({ status: 'error', payload: error });
    }

    res.status(200).json({ status: 'success', payload: result });
});

router.delete('/:cid/product/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    
    const result = await cartManager.deleteCart(cartId, productId);//aca metodo falta
    
    if (typeof result === 'string') {
        const error = result.split('');
        return res.status(404).json({ status: 'error', payload: error });
    }

    res.status(200).json({ status: 'success', payload: result });
});

export default router 