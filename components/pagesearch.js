import React from 'react';
import { Search } from 'reactabular';

var Pagesearch = React.createClass({
	render() {
		let _self = this;
		let columns = [];
		if(_self.props.show){
			_self.props.columns.map(function(col){
				if(col.chksearch == true ) columns.push(col);
			})

			console.log('columns=',_self.props.columns,columns);

			return (
				 <div className='search-container'>
				   Search <Search columns={columns} data={_self.props.data} onChange={_self.onSearch} />
				</div>
			);
		} else  {
			return (<div></div>);
		}
	},
	onSearch(search){
		let _self = this;
		_self.props.onSearch(search);
	}
});


export default  Pagesearch;