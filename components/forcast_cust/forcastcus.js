import React  from 'react';
import ReactDOM from 'react-dom';
import Reflux  from 'reflux';
import { ForcastActions, ForcastStore } from '../../store/forcaststore';
import Perpage from '../perpage';
import Pagesearch from '../pagesearch';
import Paginator from 'react-pagify';
import Dropdown  from '../../common_compoennts/Dropdown';
import { Table,Search,sortColumn,editors,formatters,predicates,cells  } from 'reactabular';
import  Overlay  from '../overlay';
import _ from 'lodash';
import $ from 'jquery';

let highlight = formatters.highlight;
let findIndex =  _.findIndex;

var datasources = {
  data:[],
};

var columns   = [];
var salelist  = [];
var monthlist = [];

function getproperty(){
	return {
			"product_id": {
				type: 'string'
			},
			"order_name": {
				type: 'string'
			},
			"app_name": {
				type: 'string'
			},
			"supplier": {
				type: 'string'
			},
			"name": {
				type: 'string'
			},
			"order_id": {
				type: 'string'
			},
			"approve_id": {
				type: 'string'
			},
			"status": {
				type: 'string'
			},
			"email": {
				type: 'string'
			},
			"sale_id": {
				type: 'string'
			},
			"year": {
				type: 'string'
			},
			"month": {
				type: 'string'
			},
			"month_slug": {
				type: 'string'
			},
			"editable": {
				type: 'string'
			},
			"month_id": {
				type: 'string'
			},
			"sold_vals": {
				type: 'string'
			},
			"forcast_vals": {
				type: 'string'
			},
			"2015/2": {
				type: 'number'
			},
			"2015/3": {
				type: 'number'
			},
			"2015/4": {
				type: 'number'
			},
			"2015/5": {
				type: 'number'
			},
			"s2015/1": {
				type: 'string'
			},
			"s2015/10": {
				type: 'string'
			},
			"s2015/11": {
				type: 'string'
			},
			"sale_name": {
				type: 'string'
			}			
	};
}

var Forcast = React.createClass( {
	mixins:[ Reflux.listenTo(ForcastStore,'onStore'),	],
	onStore:function(data) {
		datasources.data = data.data;
		columns = data.columns;
		salelist = data.salelist;
		monthlist = data.monthlist;
		this.setState({
			data:data.data,
            columns: this.getColumn(),
            header:  this.getHeader(),
		});
		$(ReactDOM.findDOMNode(this.refs.overay)).hide();
	},
	getDefaultProps() {
		return {
			showsearch:1,
			showpage:1,
		};
	},
	getInitialState: function() {

		return {
			saleid:null,
			monthslug:null,
			editedCell: null,
            delidx:null,
            modalIsOpen: false,
            data: [],
            search: {
                column: '',
                query: ''
            },
            sortingColumn: null,
            modal: {
                title: 'title',
                content: 'content',
            },
            pagination: {
                page: 0,
                perPage: 10
            },
            header:null,
            columns:[]
		};
	},
	componentDidMount: function() {
		ForcastActions.getForcatbySaleAndMonth();
	},
	getHeader(){
		let _self = this;
        if(_self.state.header){
            return _self.state.header;
        } else {
          return  {
                onClick: (column) => {
                    // reset edits
                    _self.setState({
                        editedCell: null
                    });
                    sortColumn(
                        _self.getColumn(),
                        column,
                        _self.setState.bind(_self)
                    );
                },
            };
         }   
	},
	getColumn(){
		let _self = this;

		var properties = getproperty();
        // var properties = {
        //     id:{
        //         type: 'number'
        //     },
        //     name:{
        //         type: 'string'
        //     },
        //     status:{
        //         type: 'boolean'
        //     },
        // };

        var editable = cells.edit.bind(_self, 'editedCell', (value, celldata, rowIndex, property) => {
            console.log('edit----change-------------------',_self.state.data);
            var idx = findIndex(_self.state.data, {
                id: celldata[rowIndex].id,
            });
            console.log('idx===',idx);
            value = Number(value);
            if(isNaN(value)){
            	bootbox.alert('กรุณาใส่ตัวเลขเท่านั้น');
            } else {
            	if(value < 0) {
             		bootbox.alert('กรุณาใส่ค่ามากกว่า เท่ากับ 0');
            	} else {
		            _self.state.data[idx][property] = value;

		            let data = {};
		            data.month = property;
		            data.value = value;
		            data.product_id = _self.state.data[idx].id;
		            console.log('data=',data);
					ForcastActions.updateForcast(data);
		            _self.setState({
		                data: datasources.data,
		            });
            	}
            }
        });
        
        var highlighter = (column) => highlight((value) => {
            return Search.matches(column, value, _self.state.search.query);
        });
	            

    	// editable({editor: editors.boolean(),}), 
    	// editable({editor: editors.input(),}),
		// editable({editor:editors.dropdown(_self.dropdowndata(),{value:'id',name:'name'}),}),    	
    	// highlighter('name'),

    	// let cols = columns.map(function(col) {
    	// 	if(col.show){
    	// 		return col;
    	// 	}
    	// });
    	 if (columns == undefined ) { columns = []; }

		let cols = columns.filter(function(c) {
			if(c.show) {
				if(c.editable){
					c.cell =[ 
						editable({ editor: editors.input(),}),
						highlighter(c.property),];
				} else {
					c.cell =[ 
						highlighter(c.property),];					
				}
				return c;
			}
		});
    	console.log('cols ------------------------',cols);

        if(_self.state.columns.length > 0 ) {
            return _self.state.columns;
        } else {
        	return cols;
        }
	},
	ForcastSaleSearch: function(val){
		this.state.saleid = val;
	},	
	ForcastMonthSearch: function(val){
		this.state.monthslug = val;
	},
	ForcastSearch: function(){
		if(this.state.saleid == null || this.state.monthslug == null ) {
			bootbox.alert('Please Select Sale and Month before See forcast.');
		} else {
			let data = {
				saleid: this.state.saleid,
				month: this.state.monthslug,
			};
			// bootbox.alert(data.saleid+':'+data.month);
			console.log('data=',data);
			ForcastActions.getForcatbySaleAndMonth(data);
			$(ReactDOM.findDOMNode(this.refs.overay)).show();
		}
	},
	render: function () {
		let _self = this;
        var header =  _self.getHeader();
        var columns = _self.getColumn();
        var data =    _self.state.data;
        var pagination = _self.state.pagination;

        if (_self.state.search.query) {
            data = Search.search(
                data,
                columns,
                _self.state.search.column,
                _self.state.search.query
            );
        }

        data = sortColumn.sort(data, _self.state.sortingColumn);
        var paginated = Paginator.paginate(data, pagination);
        if(salelist.length > 0 && _self.state.saleid == null)  {
        	_self.state.saleid = salelist[0].value; 
        	console.log('sale---id====',_self.state.saleid);
        }
        if(monthlist.length > 0 && _self.state.monthslug == null ) {
        	_self.state.monthslug = monthlist[0].value; 
        	console.log('monthslug---id====',_self.state.monthslug);
        }
		return (
			<div>
				<div className="row">
				<br />
					<div className="panel panel-default">
						<div className="panel-heading">
						<b>Forcast by Sale and Month</b>
						</div>
							<div className="panel-body">
				                     <Overlay ref="overay" />
				                     <div className='controls'>
			                        	<Perpage show={_self.props.showpage} showadd="1" pagination={pagination } onPerPage={_self.onPerPage} addItem={_self._Additem} />
			                        	<div className="per-page-container">
			                        	Select Sale: <Dropdown change={this.ForcastSaleSearch} data={salelist} />
			                        	&nbsp;&nbsp;
			                        	Select Month: <Dropdown change={this.ForcastMonthSearch} data={monthlist} />
			                        	&nbsp;&nbsp;
			                        	<button type="button" onClick={_self.ForcastSearch} >Search</button>		
			                        	</div>
				                        <Pagesearch show={_self.props.showsearch } columns={columns} data={data} onSearch={_self.onSearch} />
				                    </div>
									<Table width="100%"
									columns={_self.state.columns} 
									data={paginated.data}
									header={header} 
									className='pure-table pure-table-striped'
									 row={(d, rowIndex) => {
								        return {
								            className: rowIndex % 2 ? 'odd-row' : 'even-row',
								            onClick: () => console.log('clicked row',rowIndex, d)
								        };
    								}}
									/>

                    <div className='controls'>
	                    <div className='pagination'>
	                        <Paginator
	                            page={paginated.page}
	                            pages={paginated.amount}
	                            beginPages={3}
	                            endPages={3}
	                            onSelect={_self.onSelect} />
	                    </div>
                    </div>

						</div>
					</div>
				</div>
			</div>
			);
	},
	onPerPage(page){
		let _self = this;
		 var pagination = _self.state.pagination || {};
         pagination.perPage = parseInt(page.perPage) || 10;
        _self.setState({
            pagination: pagination
        });

	},
	_Additem(){
		let _self = this;
	},
    onSearch(search) {
		let _self = this;
	    _self.setState({
	        search: search
	    });
    },
    onSelect(page){
		let _self = this;
    	var pagination = _self.state.pagination || {};
        pagination.page = page;
        _self.setState({
            pagination: pagination
        });
    }
} );

export default Forcast;
