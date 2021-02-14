import "./App.css";
import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems: localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : []
    };
  }
  filterProducts = (event) => {
    const size = event.target.value;
    if (size === "") {
      this.setState({ size, products: data.products });
    } else {
      this.setState({
        size: size,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(size) >= 0
        ),
      });
    }
  };

  addToCard = (product) => {
    const cartItems = this.state.cartItems.slice()
    let alreadyInCart = false
    cartItems.map(item => {
      if(item._id == product._id){
        item.count++;
        alreadyInCart = true
      }
    })
    if(!alreadyInCart){
      cartItems.push({...product,count:1})
    }
    this.setState({cartItems})
    localStorage.setItem("cartItem", JSON.stringify(cartItems))
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice()
    const filterCartItem = cartItems.filter(x => x._id !== product._id)
    this.setState({
      cartItems: filterCartItem
    })
    localStorage.setItem("cartItem", JSON.stringify(filterCartItem))
  }

  sortProducts = (event) => {
    const sort = event.target.value
    this.setState({
      sort: event.target.value,
      products: this.state.products.sort((a, b) =>
        sort === "lowest" ?
          a.price > b.price ?
            1 : -1
          : sort === "highest" ?
            a.price < b.price ?
              1 : -1 :
            a._id > b._id ? 1 : -1
      )
    });
  };

  createOrder = (order) => {
    
    alert("Need to save order",order)
  }
  
  render() {    

    return (
      <div className="grid-container">
        <header>
          <a href="/">Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products products={this.state.products} addToCard={this.addToCard} />
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder} />
            </div>
          </div>
        </main>
        <footer>All right reserved.</footer>
      </div>
    );
  }
}

export default App;
