import React  from 'react';
import Reflux  from 'reflux';
import { OrderActions, OrderStore } from '../../store/orderstore';
import { Table,Search,sortColumn,editors,formatters,predicates,cells  } from 'reactabular';

var Order = React.createClass( {
	mixins:[Reflux.listenTo(OrderStore,'onStore')],
	onStore:function(data) {
		let  fnn = (status) => status ? <span>&#10003;</span> : <span>x</span>;
		console.log('onStore---->Order',data);
		let c = data.columns;
			c.map(function(col){
				  if(col.cell){ 
					  col.cell = fnn;
					  // col.cell = eval('('+'function(status){ if(status){ return "(<span>Y</span>)"; } else { return "(<span>x</span>)"; } }'+')');
				   }
			});
		
		this.setState({
			order:data.data,
			columns:c, 
		});
	},
	getInitialState: function() {
		return {
			columns:[] 
		};
	},
	componentDidMount: function() {
		OrderActions.getOrders();
	},
	render: function () {
		let _self = this;
		console.log('order render--->',_self.state.columns);
		return (
			<div>
			<div className="row">
			<br />
			<div className="panel panel-default">
			<div className="panel-heading">
			<b>Order</b>
			</div>
			<div className="panel-body">
			<Table width="100%"
			columns={_self.state.columns} 
			data={_self.state.order} 
			className='pure-table pure-table-striped'
			/>
			</div>
			</div>
			</div>
			</div>
			);
	}
} );

export default Order;