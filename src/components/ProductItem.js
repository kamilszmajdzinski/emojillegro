import React, { Component } from "react";
import "../styles/main.css";
import { connect } from "react-redux";
import { detailsFetchData } from "../actions/index";
import Modal from "react-responsive-modal";

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailView: false
    };
  }

  handleClick = () => {
    const url = "https://poz-armia-jsona.herokuapp.com//offers/";
    this.props.details.description = ''
        this.props.fetchDetails(url + this.props.id);

    this.setState({
      detailView: true
    });
    console.log(this.props.details);
  };

  closeModal = () => {
    this.setState({ detailView: false });
  };

 
  render() {
    const url = this.props.img;

    return (
      <div>
        {this.state.detailView ? (
          <div className="productItemDetail" onClick={this.handleClick}>
            <div className="image">
              <img src={url} />
            </div>
            <p id="description">{this.props.name}</p>
            <p id="price">{this.props.price.amount},-</p>
            <Modal
              className="modal"
              open={this.state.detailView}
              onClose={this.closeModal}
              little
            >
              <div className="modalDiv">
                <div className="picDiv">
                  <div className="imageModal">
                    <img src={url} />
                  </div>
                </div>
                <div className="descDiv">
                  <h3 id="description">{this.props.name}</h3>
                  <h2 id="priceDesc">{this.props.price.amount}zł</h2>
                  <p id="desc">{this.props.details.description}</p>
                   
                   
                </div>
              </div>
            </Modal>
          </div>
        ) : (
          <div className="productItem" onClick={this.handleClick}>
            <div className="image">
              <img src={url} />
            </div>
            <p id="description">{this.props.name}</p>
            <p id="price">{this.props.price.amount},-</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    details: state.details,
    detailsHasErrored: state.detailsHasErrored,
    detailsIsLoading: state.detailsIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDetails: id => dispatch(detailsFetchData(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
