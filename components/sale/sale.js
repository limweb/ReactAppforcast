import React  from 'react';
import Reflux  from 'reflux';
import { Table,Search,sortColumn,editors,formatters,predicates,cells  } from 'reactabular';
import { SaleActions, SaleStore } from '../../store/salestore';

var Sale = React.createClass({
	mixins:[Reflux.listenTo(SaleStore,'onStore')],
	getInitialState() {
		return {
			columns:[] 
		};
	},
	onStore:function(data) {
		let _self = this;
		let  fnn = (status) => status ? <span>&#10003;</span> : <span>x</span>;
		 console.log('sale data =',data);
		 this.setState({
	 			sale:data.data,
	 			columns:data.columns,
	  	 });
	},
	componentDidMount: function() {
		SaleActions.getSales();
	},
	render: function() {
		let _self = this;
		return (
			<div>
				<div className="row">
				  <br />
				  <div className="panel panel-default">
				    <div className="panel-heading">
				       <div className="panel-title">
				    	<b>Sale</b>
				       </div>
				    </div>
					    <div className="panel-body">
						<Table width="100%"
						columns={_self.state.columns} 
						data={_self.state.sale} 
						className='pure-table pure-table-striped'
						/>
				    </div>
				  </div>  
				</div>
			</div>

		);
	}
});

export default Sale;