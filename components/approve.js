import React from 'react';

var Approve = React.createClass({
    handleClick: function() {
        // TodoActions.testAction();
    },
    render: function() {
        let _self = this;
        return (
            <div>
				<div className="row">
				  <br />
				  <div className="panel panel-default">
				    <div className="panel-heading"><b>Approve</b></div>
				      <div className="panel-body">
				      <ul className="list-group">
				        <li className="list-group-item">   
				        <a onClick={_self.handleClick} >List item 1</a></li>
				        <li className="list-group-item">List item 2</li>
				        <li className="list-group-item">List item 3</li>
				        <li className="list-group-item">List item..</li>
				        <li className="list-group-item">List item..</li>
				      </ul>
				    </div>
				  </div>  
				</div>
			</div>
            );
    }
});

export default Approve;