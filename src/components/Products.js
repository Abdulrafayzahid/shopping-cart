import React, { Component } from "react";
import formatCurrency from "../utils";
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'
class Products extends Component {
  state = {
    showModal: false,
    product:null
  }

  handleOpenModal = (product) => {
    this.setState({ product });
  }

  handleCloseModal = () => {
    this.setState({product : null });
  }

  render() {
    const {product} = this.state
    const {addToCard} = this.props
    return (
      <div >
        <Fade bottom cascade>
        <ul className="products">
          {this.props.products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <a href={"#" + product._id} onClick={() => this.handleOpenModal(product)}>
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
        </Fade>
        {product && 
          <Modal isOpen={true}>
            <Zoom>
            <button className="close-modal" onClick={this.handleCloseModal}>X</button>
            <div className="product-details">
              <img src={product.image} alt={product.title} />
              <div className="product-details-description">
                 <p>
                    <strong>{product.title}</strong>
                 </p> 
                 <p>
                     {product.description}
                 </p> 
                 <p>
                   Available Sizes
                   {product.availableSizes.map(x => (
                     <span>
                       {" "}
                       <button className="button">{x}</button>
                     </span>
                   ))}
                 </p>
                 <div className="product-price">
                  <div> {formatCurrency(product.price)} </div>
                  <button className="button primary" onClick={() => {
                    addToCard(product)
                    this.handleCloseModal()
                  }}>Add to cart</button>
                 </div>

              </div>
            </div>
            </Zoom>
          </Modal>
        }
      </div>
    );
  }
}

export default Products;
