import "./App.css";
import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }
  filterProducts = (event) => {
    console.log(event.target.value);
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

  sortProducts = (event) => {
    console.log(event.target.value);
    this.setState({ size: event.target.value });
  };
  render() {
    console.log(this.state.products);
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
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">Sidebar</div>
          </div>
        </main>
        <footer>All right reserved.</footer>
      </div>
    );
  }
}

export default App;
