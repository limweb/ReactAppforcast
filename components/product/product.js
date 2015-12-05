import React  from 'react';
import Reflux  from 'reflux';
import { ProductActions, ProductStore } from '../../store/productstore';
import Perpage from '../perpage';
import Pagesearch from '../pagesearch';
import Paginator from 'react-pagify';
import { Table,Search,sortColumn,editors,formatters,predicates,cells  } from 'reactabular';
import  Overlay  from '../overlay';
import _ from 'lodash';
import  SkyLight  from 'babel!react-skylight/src/skylight.jsx'; // XXX: no proper build yet
import Frmedit  from './editform';
import Form   from  './../../libs/form';
import  FieldWrapper  from './field_wrapper';
import  SectionWrapper  from './section_wrapper';
import  validate  from 'plexus-validate';


let highlight = formatters.highlight;
let findIndex =  _.findIndex;

let dialogStyles= {
    width: '60%',
    height: '400px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginTop: '-200px',
    marginLeft: '-35%',
    backgroundColor: '#fff',
    borderRadius: '2px',
    zIndex: 100,
    padding: '10px',
    boxShadow: '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)'
}

var datasources = {
  data:[],
  approves:[],
  orders:[],
};

let  properties = ()=>{
    
          let properties = {
             order_id: {
                enum: datasources.orders.map((c)=>(c.id)),
                enumNames: datasources.orders.map((c)=>(c.name)),

             },
             approve_id: {
                enum: datasources.approves.map((c)=>(c.id)),
                enumNames: datasources.approves.map((c)=>(c.name)),
             },
             name: {
                type: 'string',
                 "x-hints": {
                  form: {
                    classes: [ "form-control" ]
                  }
                }
             },
             status: {
                type: 'boolean',
                 "x-hints": {
                  form: {
                    classes: [ "form-control" ]
                  }
                }
             },
             created_at: {
                type: 'string',
                 "x-hints": {
                  form: {
                    classes: [ "form-control" ]
                  }
                }
             },
             created_by: {
                type: 'string',
                 "x-hints": {
                  form: {
                    classes: [ "form-control" ]
                  }
                }
             },
             updated_at: {
                type: 'string',
                 "x-hints": {
                  form: {
                    classes: [ "form-control" ]
                  }
                }
             },
             updated_by: {
                type: 'string',
                 "x-hints": {
                  form: {
                    classes: [ "form-control" ]
                  }
                }
             },
        };

        return properties;
    }

    let getButtons = (submit) => {
        return (
            <span>
                <input type='submit'
                    className='pure-button pure-button-primary ok-button'
                    key='ok' value='OK'
                    onClick={submit} />
                    <input type='submit' className='pure-button cancel-button'
                    key='cancel' value='Cancel' onClick={submit} />
            </span>
        );
    };  

var Product = React.createClass( {
  mixins:[ Reflux.listenTo(ProductStore,'onStore'),  ],
  onStore:function(data) {
    datasources.data = data.data;
    datasources.approves = data.approves;
    datasources.orders = data.orders;
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
                        chksearch:true,
                        cell:[highlighter('id'),]
                    },
                    {  
                        property: 'order_id',
                        header:  'Order Name',
                        width:400,
                        chksearch: false,
                        cell:[
                          editable({editor:editors.dropdown(datasources.orders,{value:'id',name:'name'}),}),      
                          function(order_id){
                                  // console.log('-------orderid',order_id,datasources.orders);
                                   var o = _(datasources.orders).filter(function(order) {
                                          // console.log('----order',order,'-------------------------');
                                          return order.id == order_id; 
                                       })
                                      .value()[0];
                                    if(o){
                                        var val = o.name;
                                    } else {
                                        var  val = 'no name';
                                    }
                                    return <span><i className='glyphicon glyphicon-star'></i>{val}</span>;
                                   },

                        ]
                    },
                    {  
                        property: 'approve_id',
                        header:  'Approve Name',
                        width:400,
                        chksearch: false,
                        cell:[
                        editable({editor:editors.dropdown(datasources.approves,{value:'id',name:'name'}),}),      
                        function(approve_id){
                                var a = _(datasources.approves).filter(function(approve) {
                                    return approve.id == approve_id;
                                }).value()[0];
                                var val = 'no Name';
                                if(a){
                                    val = a.name;
                                }
                                return  <span><i className='glyphicon glyphicon-star'></i>{val}</span>;
                            },
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
                                        properties: properties(),
                                    }; //schema
            
                                    // console.log('schema=',schema);

                                    var onSubmit = (editData, editValue) => {
                                        _self.refs.modal1.hide();
                                        console.log('onSubmit',editData,editValue);
                                        if(editValue === 'Cancel') {
                                            console.log('Cancel');
                                            return;
                                        }
                                        // // _self.state.data[idx] = editData;
                                        // _self.setState({
                                        //     data: _self.state.data
                                        // });
                                    };


                                     _self.setState({
                                       modal: {
                                           title: 'Add New Product',
                                           content: <Form
                                                    className='form-horizontal'
                                                    fieldWrapper={FieldWrapper}
                                                    sectionWrapper={SectionWrapper}
                                                    buttons={getButtons}
                                                    schema={schema}
                                                    validate={validate}
                                                    values={_self.state.data[idx]}
                                                    onSubmit={onSubmit}/>,
                                            editing:0,
                                           },
                                     });//setState

                                    _self.refs.modal1.show();
                                }; // edit

                                 var remove = ()=>{
                                   _self.state.delidx = idx;
                                   console.log('remove click----------------------->');
                                 // <!-- modalIsOpen: true -->
                                 // _self.setState({
                                 //   model: {
                                 //       title: 'Remove Test',
                                 //       content: _self.state.data[idx],
                                 //       editing:2,
                                 //       },
                                 //       });
                                 // _self.refs.modal.show();
                                 if(confirm("คุณแน่ใจที่จะ ลบ! \n"+_self.state.data[idx].name) == true) {
                                        console.log("You pressed OK!");
                                        console.log(_self.state.data[idx]);
                                    } else {
                                        console.log("You pressed Cancel!");
                                    }

                                 };  // remove  

                                // var remove = ()=>{
                                //     _self.state.delidx = idx;
                                //        // <!-- modalIsOpen: true -->
                                //     _self.setState({
                                //       model: {
                                //                 title: 'Remove Test',
                                //                 content: _self.state.data[idx],
                                //                 editing:2,
                                //              },
                                //     });
                                //     _self.refs.modal.show();
                                // };  // remove               
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

                 <SkyLight 
                       dialogStyles={dialogStyles}
                       ref='modal' title={_self.state.modal.title} > 
                       <Frmedit parent={_self} content={_self.state.modal.content}  /> 
                 </SkyLight>
                 <SkyLight    
                        dialogStyles={dialogStyles}
                        ref='modal1' title={_self.state.modal.title} >
                        {this.state.modal.content}
                 </SkyLight>


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
        console.log('show modal');
        var schema = {
               type: 'object',
               properties: properties()
        }; //schema


        var onSubmit = (editData, editValue) => {
                                this.refs.modal1.hide();
                                console.log('onSubmit',editData,editValue);
                                if(editValue === 'Cancel') {
                                    console.log('Cancel');
                                    return;
                                }
                                // // this.state.data[idx] = editData;
                                // this.setState({
                                //     data: this.state.data
                                // });
                            };


         _self.setState({
           modal: {
               title: 'Add New Product',
               content: <Form
                        className='pure-form pure-form-aligned'
                        fieldWrapper={FieldWrapper}
                        sectionWrapper={SectionWrapper}
                        buttons={getButtons}
                        schema={schema}
                        validate={validate}
                        values={{}}
                        onSubmit={onSubmit}/>,
                editing:0,
               },
         });//setState

        _self.refs.modal1.show();
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
    },
    submit(){
      let _self = this;
      _self.refs.modal.hide();
    },
    _close(){
      let _self = this;
      _self.refs.modal.hide();
    }

} );

export default Product;
