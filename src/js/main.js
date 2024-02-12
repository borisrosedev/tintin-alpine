import { MyStorage } from "../services/my-storage.js";
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
        cartItemsNumber: await MyStorage.getData("cart-items-number"),
        amount: await MyStorage.getData("amount"),
        cart: await MyStorage.getData("cart"),
      
        addToCart(product) {
          this.cartItemsNumber += 1;

          // Quantity logic
          const oldProduct = this.cart.find(
            (cartProduct) => cartProduct.product.id == product.id
          );
          if (!oldProduct) {
            this.cart.push({ product: product, quantity: 1 });
          } else {
            const index = this.cart.indexOf(oldProduct);
            this.cart[index].quantity += 1;
          }

          // AMOUNT SAVED
          this.amount += product.price * 1;
          MyStorage.persistData("amount", this.amount);

          //CART SAVED
          MyStorage.persistData("cart", this.cart);

          //ITEMS NUMBER SAVED
          MyStorage.persistData("cart-items-number", this.cartItemsNumber)
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
