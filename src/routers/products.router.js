import { Router } from "express"; 
//import ProductManager from '../productManager.js'
import productModel from '../dao/models/product.model.js'

const router = Router() 
//const productManager = new ProductManager('./data/products.json')

router.get('/', async (req, res) => {
    //const result = await productManager.getProducts();
    const result = await productModel.find()
    const limit = req.query.limit;
    if (typeof result == "string") {
      return res.status(parseInt(error[0].slice(1, 4))).json({ error: result.slice(6) });
    }
    res.status(200).json({ payload: result.slice(0, limit) });
  });

router.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    //const result = await productManager.getProductById(id)
    const result = await productModel.find(id).lean().exec()
  
    if (!result) return res.status(404).json({ status: "error", payload: "El producto no existe, esto es Router" })
     res.status(200).json({ payload: result })
  });


router.post('/', async(req, res)=>{
  const newProduct = req.body
  //const result = await productManager.addProduct(product)
  const generatedproduct = new productModel(newProduct)
  
  if(!generatedproduct) return res.status(404).json({status: 'error', error: 'no se puede subir'})
  await generatedproduct.save()
  return res.status(201).json({status:'success', payload:'/api/products'})
})

router.put('/:pid', async(req, res) => {
  const pid = parseInt(req.params.pid)
  const data = req.body
  //const result = await productManager.updateProduct(pid, data)
  const result = await productModel.updateOne({"_id":pid},{})
  if(!result) return res.status(404).json({status: 'error', error: 'No modificar el prod'})
 
  return res.status(201).json({status: 'success', payload:result})

})


router.delete('/:pid', async( req, res) =>{     //(db.collection.deleteOne)
  const id = parseInt(req.params.pid); //obtengo el id del producto a eliminar

      //const product = await productManager.getProducts()
      const product = await productModel.find()
      const productId = product.find(item => item.pid == id)
      if (!productId) {return res.status(404).json({error: 'El producto no existe'})}
       
      await productManager.deleteProduct(id)
      return res.status(200).json({status: "success", payload:`Product ID: ${id} was deleted`});
 
})
  


  export default router 