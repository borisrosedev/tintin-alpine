import Alpine from "../../node_modules/alpinejs/dist/module.esm.js";
window.Alpine = Alpine;

class App {
  constructor() {
    this.init();
  }
  init() {
    const self = this
    self.getProducts().then(() => {
      Alpine.store("stock", {
        products: self.products,

        cart: [],

        addToCart(product) {
            console.log('product', product)
            console.log('this.cart', this.cart)
            if(this.cart.length){
                console.log('this.cart[0]', this.cart[0].product.id)
            }
          const oldProduct = this.cart.find((cartProduct) => cartProduct.product.id == product.id);
          if(!oldProduct){
            this.cart.push({ product: product, quantity: 1});  
          } else {
            console.log('26 cart', this.cart)
            const index = this.cart.indexOf(oldProduct);
            console.log('index', index)
            this.cart[index].quantity += 1;
          }
          console.log('this.cart', this.cart)
        },
      });



      Alpine.start();
    });
  }
  async getProducts() {
    const result = await fetch("../database/products.json");
    this.products = await result.json();
    console.log("this.products", this.products);
  }
}

new App();
