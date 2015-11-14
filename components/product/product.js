import React  from 'react';
import Reflux  from 'reflux';
import { ProductActions, ProductStore } from '../../store/productstore';
import Perpage from '../perpage';
import Pagesearch from '../pagesearch';
import Paginator from 'react-pagify';
import { Table,Search,sortColumn,editors,formatters,predicates,cells  } from 'reactabular';
import  Overlay  from '../overlay';
import _ from 'lodash';

let highlight = formatters.highlight;
let findIndex =  _.findIndex;

var datasources = {
  data:[],
};


var Product = React.createClass( {
  mixins:[ Reflux.listenTo(ProductStore,'onStore'),  ],
  onStore:function(data) {
    datasources.data = data.data;
    this.setState({
      data:data.data,
            columns: this.getColumn(),
            header:  this.getHeader(),
    });
  },
  getDefaultProps() {
    return {
      showsearch:1,
      showpage:1,
    };
  },
  getInitialState: function() {

    return {
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
    ProductActions.getProducts();
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


        var properties = {
            id:{
                type: 'number'
            },
            name:{
                type: 'string'
            },
            status:{
                type: 'boolean'
            },
        };

        var editable = cells.edit.bind(_self, 'editedCell', (value, celldata, rowIndex, property) => {
            console.log('edit----change-------------------',_self.state.data);
            var idx = findIndex(_self.state.data, {
                id: celldata[rowIndex].id,
            });
            _self.state.data[idx][property] = value;
      ProductActions.updateProduct(_self.state.data[idx]);
            _self.setState({
                data: datasources.data,
            });


        });
        
        var highlighter = (column) => highlight((value) => {
            return Search.matches(column, value, _self.state.search.query);
        });
              

      // editable({editor: editors.boolean(),}), 
      // editable({editor: editors.input(),}),
    // editable({editor:editors.dropdown(_self.dropdowndata(),{value:'id',name:'name'}),}),      
      // highlighter('name'),
              
        let columns = [
                    {  
                        property: 'id',
                        header:  'Id',
                        width:400,
                        chksearch:false,
                        cell:[highlighter('id'),]
                    },
                    {  
                        property: 'order_id',
                        header:  'Order Name',
                        width:400,
                        chksearch: true,
                        cell:[
                          editable({editor: editors.input(),}),
                          highlighter('order_id'),
                        ]
                    },
                    {  
                        property: 'approve_id',
                        header:  'Approve Name',
                        width:400,
                        chksearch: true,
                        cell:[
                          editable({editor: editors.input(),}),
                          highlighter('approve'),
                        ]
                    },
                    {  
                        property: 'supplier',
                        header:  'Supplier',
                        width:400,
                        chksearch: true,
                        cell:[
                          editable({editor: editors.input(),}),
                          highlighter('suppliet'),
                        ]
                    },
                    {  
                        property: 'name',
                        header:  'Name',
                        width:400,
                        chksearch: true,
                        cell:[
                          editable({editor: editors.input(),}),
                          highlighter('name'),
                        ]
                    },
                    {  
                        property: 'status',
                        header:  'Status',
                        width:400,
                        chksearch: false,
                        cell:[
                          editable({editor: editors.boolean(),}), 
                          (status) => status ? <span>&#10003;</span> : <span>x</span>,
                        ]
                    },
                                        {   header: 'Action',
                        search: false,
                        cell:[ 
                            function(value, celldata, rowIndex) {
                                var idx = findIndex(_self.state.data, {
                                    id: celldata[rowIndex].id,
                                });

                                var edit = () => {

                                    var schema = {
                                        type: 'object',
                                        properties: properties,
                                    }; //schema

                                    _self.setState({
                                        modal: {
                                            title: 'Edit',
                                            content: _self.state.data[idx],
                                            editing:0,
                                        },
                                    });//setState
                                    _self.refs.modal.show();
                                }; // edit

                                var remove = ()=>{
                                    _self.state.delidx = idx;
                                       // <!-- modalIsOpen: true -->
                                    _self.setState({
                                      model: {
                                                title: 'Remove Test',
                                                content: _self.state.data[idx],
                                                editing:2,
                                             },
                                    });
                                    _self.refs.modal.show();
                                };  // remove               
                               return {
                                    value: ( 
                                    <span>
                                        <span className='edit' onClick={edit.bind(_self)} style={{cursor: 'pointer'}}>
                                            &#8665;
                                        </span>
                                        <span className='remove' onClick={remove.bind(_self)} style={{cursor: 'pointer'}}>
                                            &#10007;
                                        </span>
                                   </span>
                               )}; //return 
                            }.bind(_self),//custom column

                    ]},
        ];

        if(_self.state.columns.length > 0 ) {
            return _self.state.columns;
        } else {
          return columns;
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
    return (
      <div>
        <div className="row">
        <br />
          <div className="panel panel-default">
            <div className="panel-heading">
            <b>Product</b>
            </div>
              <div className="panel-body">
                             <Overlay ref="overay" />
                             <div className='controls'>
                                <Perpage show={_self.props.showpage} pagination={pagination } onPerPage={_self.onPerPage} addItem={_self._Additem} />
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

export default Product;
