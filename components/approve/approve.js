import React from 'react';
import Reflux  from 'reflux';
import { Table,Search,sortColumn,editors,formatters,predicates,cells  } from 'reactabular';
import { ApproveActions, ApproveStore } from '../../store/approvestore';



var Approve = React.createClass({
	mixins:[Reflux.listenTo(ApproveStore,'onStore')],
	onStore:function(data) {
		  console.log('Approve OnStore=',data);
		  this.setState({
		 		approve:data.data,
		 		columns:data.columns,
		  });
	},
	getInitialState: function() {
		return {
			columns: [],
		};
	},
    handleClick: function() {
    },
    componentDidMount: function() {
        ApproveActions.getApproves();
    },
    render: function() {
        let _self = this;
        console.log('approve render--->',_self.state);
        return (
            <div>
				<div className="row">
				  <br />
				  <div className="panel panel-default">
				    <div className="panel-heading"><b>Approve</b></div>
				      <div className="panel-body">
						<Table width="100%"
						columns={_self.state.columns} 
						data={_self.state.approve} 
						className='pure-table pure-table-striped'
						/>
				    </div>
				  </div>  
				</div>
			</div>
            );
    }
});

export default Approve;