import React  from 'react';

var Forcast = React.createClass({
	render: function() {
		return (
			<div>
				<div className="row">
				  <br />
				  <div className="panel panel-default">
				    <div className="panel-heading"><b>Forcast</b></div>
				      <div className="panel-body">
				      <ul className="list-group">
				        <li className="list-group-item">List item 1</li>
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

export default Forcast;