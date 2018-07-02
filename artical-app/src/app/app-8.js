import React from "react";
import { products } from "./seed";

export class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    
    this.handleProductUpVote = this.handleProductUpVote.bind(this);
  }

  componentDidMount() {
    this.setState({ products: products });
  }

  handleProductUpVote(productId) {
    console.log(productId + "was upvoted");
    const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        console.log(product);
        console.log(product.votes);
        return Object.assign(product, product.votes, {
          votes: product.votes + 1,
        });
      } else {
        return product;
      }
    });
    console.log(nextProducts);
    this.setState(()=>{
      return{
        products: nextProducts}
    });
  }


  render() {
    const prod = products.sort((a, b) => b.votes - a.votes);
    const productComponents = prod.map(product => (
      <Product
        key={"product-" + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
      />
    ));

    return <div className="ui stackable items">{productComponents}</div>;
  }
}

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpVote = this.handleUpVote.bind(this);
  }

  handleUpVote = () =>  this.props.onVote(this.props.id);
  

  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl} />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpVote}>
              <i className="large caret up icon" />
            </a>
            {this.props.votes}
          </div>
          <div className="description">
            <a href={this.props.url}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className="extra">
            <span>Submitted by:</span>
            <img
              className="ui avatar image"
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}
