import { Router } from "express"; 
import ProductManager from '../productManager.js'

const router = Router() 
const productManager = new ProductManager('./data/products.json')

router.get('/', async (req, res) => {
    const result = await productManager.getProducts();
    const limit = req.query.limit;
    if (typeof result == "string") {
      return res.status(parseInt(error[0].slice(1, 4))).json({ error: result.slice(6) });
    }
    res.status(200).json({ payload: result.slice(0, limit) });
  });

router.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await productManager.getProductById(id);
  
    if (!result)return res.status(404).json({ status: "error", payload: "El producto no existe, esto es Router" });
     res.status(200).json({ payload: result });
  });


router.post('/', async(req, res)=>{
  const product = req.body
  const result = await productManager.addProduct(product)
  if(!result) return res.status(404).json({status: 'error', error: 'no se puede subir'})
 
  return res.status(201).json({status: 'success', payload: result})
})

router.put('/:pid', async(req, res) => {
  const id = parseInt(req.params.id)
  const data = req.body
  const result = await productManager.updateProduct(id.data)
})


router.delete('/:pid', async( req, res) =>{
  const id = req.params.pid; //obtengo el di del producto a eliminar

      const product = await productManager.getProducts()
      const productId = product.find(item => item.id == id)
      if (!productId) return res.status(404).json({error: 'El producto no existe'})

       await productManager.deleteProduct(id)
      return res.status(200).json({ message: 'Producto eliminado con éxito' });
 
})
  


  export default router 