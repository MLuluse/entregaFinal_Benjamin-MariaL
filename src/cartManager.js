import fs from "fs";
import ProductManager from "./productManager.js";

// aca instancia el productManager porque necesita traer info del producto tambien
const productManager = new ProductManager("./data/products.json");

class CartManager {
  //crea ruta
  #path = "../data/cart.json";

  constructor(path) {
    this.#path = path;
    this.#init();
  }

  //verifica si el carrito existe
  async #init() {
    if (!fs.existsSync(this.#path)) {
      await fs.promises.writeFile(this.#path, JSON.stringify([], null, 2));
    }
  }
  // generas el Id del Carrito
  #generateID(products) {
    if (products.length === 0) return 1;
    return products[products.length - 1].id + 1;
  }

  // crea el carrito
  async createCart() {
    let data = await fs.promises.readFile(this.#path, "utf-8"); //lee el archivo de carrito
    let carts = JSON.parse(data); // lo pone en memoria
    const cartToAdd = { id: this.#generateID(carts), products: [] }; // genera el id del carrito
    carts.push(cartToAdd);
    await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, 2));
    return cartToAdd;
  }
  //obtiene los productos dentro del carrito
  async getProductsFromCart(id) {
    if (!fs.existsSync(this.#path)) return "[ 500] The file does not exist";
    let data = await fs.promises.readFile(this.#path, "utf-8");
    let carts = JSON.parse(data);
    let cart = cart.find((item) => item.id === id);
    if (!cart) return "[404] Cart not found";
    return cart;
  }
  async addProductsToCart(cid, pid) {
    if (!fs.existsSync(this.#path)) return "[ 500] The file does not exist";
    const result = await productManager.getProductsById(pid); //obtengo el producto a agregar --- me fijo si existe
    if (!result) return "[400] The product with that id was not found";
    const cart = await this.getProductsFromCart(cid); // me fijo si el carrito existe
    if (!cart) return "[404] The cart with that id was not found";
    const productIndex = cart.products.findIndex(
      (item) => item.product === pid
    ); // con el findIndex verifico si el prod ya esta en el carrito
    if (productIndex > -1) {
      // si esta la cantidad es mayor a -1 entocesa bajo
      cart.products[productIndex].quantity += 1; // aca suma uno a la cantidad
    } else {
      // si no esta
      cart.products.push({ product: pid, quantity: 1 }); // aca crea la cantidad
    }
    let data = await fs.promises.readFile(this.#path, "utf-8");
    let carts = JSON.parse(data);
    carts = carts.map((item) => {
      if (item.id === cid) {
        return cart;
      } else {
        return item;
      } 
    });
    await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, 2));
    return cart;
  }
  async addOrUpdateProduct(cid, pid){
    
  }
  async deleteCart(id) {
    if (!fs.existsSync(this.#path)) return "Error no exixte ese carrito";
    let isFound = false;
    let data = await fs.promises.readFile(this.#path, "utf-8");
    let Cart = JSON.parse(data);
    let newCart = Cart.filter((item) => item.id !== id);
    if (cart.length !== newCart.length)
      return "El carrito se elimino con exito";
    if (!isFound) return "El carrito no existe";
    await fs.promises.writeFile(
      this.#path,
      JSON.stringify(newProducts, null, "/t")
    );
  }
}

export default CartManager;
