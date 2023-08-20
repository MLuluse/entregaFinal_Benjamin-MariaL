import fs from "fs";

class ProductManager {
  #path = "./data/products.json";

  //cosntructor de la ruta al producto
  constructor(path) {
    this.#path = path;
    this.#init();
  }
  //metodo init, chequea si existe el producto
  async #init() {
    if (!fs.existsSync(this.#path)) {
      await fs.promises.writeFile(this.#path, JSON.stringify([], null, "/t"));
    }
  }

  // generas el Id del Producto
  #generateID(products) {
    if (products.length === 0) return 1
    return products[products.length-1].id + 1
  }

  //agrega el producto
  async addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail ||!product.code ||!product.stock) {
      return "Error: Todos los campos son obligatorios";
    }
    if (!fs.existsSync(this.#path)) return "Error no existe";
    let data = await fs.promises.readFile(this.#path, "utf-8");
    let products = JSON.parse(data);
    const found = products.find((item) => item.code === product.code); // verifica que el codigo no se repita

    if (found) return "Error: Producto con el mismo codigo";
    
    const productToAdd = { id: this.#generateID(products), ...product };
    products.push(productToAdd);
    await fs.promises.writeFile(this.#path, JSON.stringify(products, null, 2));
    return productToAdd;
  }

  //devuelve el producto
  async getProducts() {
    if (!fs.existsSync(this.#path)) return "Error el archivo no existe";
    let data = await fs.promises.readFile(this.#path, "utf-8");
    const products = JSON.parse(data);
    return products;
  }

  //obtiene el producto desde el ID
  async getProductById(id) {
    if (!fs.existsSync(this.#path)) return "Error el producto no existe, esto es ProductManager";
    let data = await fs.promises.readFile(this.#path, "utf-8");
    let products = JSON.parse(data);
    let product = products.find(item => item.id === id);
    if(!product) return '[Error], producto no entontrado PM'
    return product;
  }

  //----------metodos de la clase 4-------
  async updateProduct(id, updateProduct) {
    if (!fs.existsSync(this.#path)) return "El producto no existe";
    let isFound = false;
    let data = await fs.promises.readFile(this.#path, "utf-8");
    let products = JSON.parse(data);
    let newProducts = products.map((item) => {
      if (item.id === id) {
        isFound = true;
        return {
          ...item,
          ...updateProduct,
        };
        return item;
      }
    });
    if (!isFound) return "El producto no existe";
    await fs.promises.writeFile(
      this.#path,
      JSON.stringify(newProducts, null, 2)
    );
    return newProducts.find((item) => item.id === id);
  }

  async deleteProduct(id) {
    if (!fs.existsSync(this.#path)) return "Error no exixte el producto";
    let isFound = false;
    let data = await fs.promises.readFile(this.#path, "utf-8");
    let products = JSON.parse(data);
    let newProducts = products.filter((item) => item.id !== id);
    if (products.length !== newProducts.length)
      return "El producto se elimino con exito";
    if (!isFound) return "El producto no existe";
    await fs.promises.writeFile(
      this.#path,
      JSON.stringify(newProducts, null, "/t")
    );
  }
}

export default ProductManager;
