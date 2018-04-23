import React, { Component } from "react";
import { connect } from "react-redux";
import ProductItem from "./ProductItem";
import { BarLoader } from 'react-spinners';
import PropTypes from "prop-types";

import Loader from '../loader/loader'


class ProductList extends Component {

  state = {
    open: false
  }

  render() {
    
    return (
      <div className="productsListDiv">
         { this.props.productsIsLoading && <Loader className = 'loader'/>}
        {this.props.products &&
          this.props.products.map(product => (
            <ProductItem
              key={product.id}
              name={product.name}
              price={product.price}
              img={product.image}
              id={product.id}
            />
          ))}
      </div>
    );
  }
}

ProductList.propTypes = {
  productsIsLoading: PropTypes.bool.isRequired,
  products: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    productsIsLoading: state.productsIsLoading,
    products: state.products
  };
};

export default connect(mapStateToProps)(ProductList);
