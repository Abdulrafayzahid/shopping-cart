import React, { Component } from "react";
import formatCurrency from "../utils";

class Products extends Component {
  render() {
    return (
      <div >
        <ul className="products">
          {this.props.products.map((item) => (
            <li key={item._id}>
              <div className="product">
                <a href={"#" + item._id}>
                  <img src={item.image} alt={item.title} />
                  <p>{item.title}</p>
                </a>
                <div className="product-price">
                    <div>{formatCurrency(item.price)}</div>
                    <button className="button primary">
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