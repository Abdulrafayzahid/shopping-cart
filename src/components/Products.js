import React, { Component } from "react";
import formatCurrency from "../utils";

class Products extends Component {
  render() {
    const {addToCard} = this.props
    return (
      <div >
        <ul className="products">
          {this.props.products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <a href={"#" + product._id}>
                  <img src={product.image} alt={product.title} />
                  <p>{product.title}</p>
                </a>
                <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button className="button primary" onClick={() => addToCard(product)}>
                        Add To Cart
                    </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Products;
