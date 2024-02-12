import Alpine from "../../node_modules/alpinejs/dist/module.esm.js";
window.Alpine = Alpine;

class App {
  constructor() {
    this.init();
  }
  init() {
    const self = this;
    self.getProducts().then(async () => {
      Alpine.store("stock", {
        products: self.products,
        amount: localStorage.getItem("amount")
          ? await JSON.parse(localStorage.getItem("amount"))
          : 0,
        cart: localStorage.getItem("cart")
          ? await JSON.parse(localStorage.getItem("cart"))
          : [],

        addToCart(product) {
          const oldProduct = this.cart.find(
            (cartProduct) => cartProduct.product.id == product.id
          );
          if (!oldProduct) {
            this.cart.push({ product: product, quantity: 1 });
          } else {
            const index = this.cart.indexOf(oldProduct);
            this.cart[index].quantity += 1;
          }
          this.amount += product.price * 1;
          if (localStorage.getItem("amount")) {
            localStorage.removeItem("amount");
          }
          localStorage.setItem("amount", JSON.stringify(this.amount));
          if (localStorage.getItem("cart")) {
            localStorage.removeItem("cart");
          }
          localStorage.setItem("cart", JSON.stringify(this.cart));
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
