import React from 'react';


var Perpage = React.createClass({
	getDefaultProps: function() {
		return {
			show:0
		};
	},
	render() {
		let _self = this;
		console.log('perpage =',_self.props);
		if(_self.props.show){
			return (
                <div className='per-page-container'>
                    Per page <input type='text' defaultValue={_self.props.pagination.perPage} onChange={_self.onPerPage}  ></input>
                    &nbsp;<input type="button" name="btnAdd" value="AddItem" onClick={_self._Additem} />
                </div>
			);
		} else {
			return (<div></div>);
		}
	},
	onPerPage(e) {
		let _self = this;
		console.log('perpage =',_self.state);
        var pagination = _self.props.pagination || {};
        pagination.perPage = parseInt(e.target.value, 10);
        this.props.onPerPage(pagination);
    },
    _Additem() {
		this.props.addItem();
    }
});

export default  Perpage;
