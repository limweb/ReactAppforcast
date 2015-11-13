import React  from 'react';
import Reflux  from 'reflux';
import { ProductActions, ProductStore } from '../../store/productstore';
import { Table,Search,sortColumn,editors,formatters,predicates,cells  } from 'reactabular';

var Product = React.createClass( {
  mixins:[Reflux.listenTo(ProductStore,'onStore')],
  onStore:function(data) {
    this.setState({
     product:data.data,
     columns:data.columns,
    });
  },
  getInitialState: function() {
    return {
      columns: [], 
    };
  },
  componentDidMount: function() {
    ProductActions.getProducts();
  },
  render: function () {
    let _self = this;
    return (
    <div>
      <div className="row">
        <br />
        <div className="panel panel-default">
          <div className="panel-heading">
            <b>Product</b>
          </div>
          <div className="panel-body">
              <Table width="100%"
              columns={_self.state.columns} 
              data={_self.state.product} 
              className='pure-table pure-table-striped'
              />
          </div>
        </div>
      </div>
    </div>
    );
  }
} );

export default Product;