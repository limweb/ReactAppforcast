import React  from 'react';
import Reflux  from 'reflux';
import { ProductActions, ProductStore } from '../../store/productstore';

var Product = React.createClass( {
  mixins:[Reflux.listenTo(ProductStore,'onStore')],
  onStore:function(data) {
    this.setState({
     product:data 
    });
  },
  componentDidMount: function() {
    ProductActions.getProducts();
  },
  render: function () {
    return (
    <div>
      <div className="row">
        <br />
        <div className="panel panel-default">
          <div className="panel-heading">
            <b>Product</b>
          </div>
          <div className="panel-body">
            <ul className="list-group">
              <li className="list-group-item">
                List item 1
              </li>
              <li className="list-group-item">
                List item 2
              </li>
              <li className="list-group-item">
                List item 3
              </li>
              <li className="list-group-item">
                List item..
              </li>
              <li className="list-group-item">
                List item..
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    );
  }
} );

export default Product;