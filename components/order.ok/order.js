//work
'use strict';

import Reflux  from 'reflux';
import 'purecss/build/pure.css';
import 'react-pagify/style.css';
import './order.css';
import React from 'react';
import Paginator from 'react-pagify';
import _ from 'lodash';
import { Table,Search,sortColumn,editors,formatters,predicates,cells  } from 'reactabular';
import  $  from 'jquery';
import  SkyLight  from 'babel!react-skylight/src/skylight.jsx'; // XXX: no proper build yet
import  FieldWrapper  from '../field_wrapper';
import  SectionWrapper  from '../section_wrapper';
import  Form  from 'plexus-form';
import  Validate  from 'plexus-validate';
import  Modalx  from 'react-modal';
import  Overlay  from '../overlay';
import  Pform  from '../frm_product';
import Frmedit  from './editform';
let findIndex =  _.findIndex;
let highlight = formatters.highlight;
import OrderActons  from '../../actions/orderaction';
import OrderStore from '../../store/orderstore';

var datasources = {
  products:[],
  ordres:[],
  approves:[],
};

/*
    ==== Feture ================================
    1. custom field
    2. sort column
    3. number page
    4. paging
    5. friter
    6. hightlight filter
    7. footer 
    8. Header
    9. inline edit  dropdown , input text, boolean

    ==== Feture ================================
 */


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


module.exports = React.createClass({
    displayName: 'FullTable',
    mixins:[Reflux.listenTo(OrderStore,'onStore')],
    onStore:function(data) {
         datasources = data;
         this.setState({
                data: data.products,
                columns: this.getColumn(),
                header:  this.getHeader()
         });
    },
    dropdownOrder(){
        return datasources.ordres;
    },
    getInitialState() {
        let _self = this;

        return {
            editedCell: null,
            delidx:null,
            modalIsOpen: false,
            data: datasources.products,
            search: {
                column: '',
                query: ''
            },
            sortingColumn: null, // reference to sorting column
            modal: {
                title: 'title',
                content: 'content',
            },
            pagination: {
                page: 0,
                perPage: 10
            },
            header:null,
            columns:null
        };
    },
    onSearch(search) {
        this.setState({
            search: search
        });
    },
    closeModal: function() {
        this.state.delidx = null;
        this.setState({modalIsOpen: false});
    },
    deleteitem: function(e) {
        console.log('test');
    },
    componentDidMount: function() {
        var _self = this;
        OrderActons.getOrders(); // Load data 
    },
    submit:function() {
        alert('test');
        this._close();
    },
    _close:function(){
        let _self = this;
        _self.refs.modal.hide();
    },
    _Additem:function(){
          let _self = this;
          _self.setState({
                        modal: {
                            title: 'Add Item',
                            content: {

                            },
                            editing:0,
                        },
         });
        _self.refs.modal.show();
    },
    getHeader:function(){
        let _self = this;
        console.log('getHeader=',_self.state.header);

        if(_self.state.header){
            return _self.state.header;
            console.log('Heas Header');
        } else {
            console.log('NO Heas Header');
        // }
          return  {
                onClick: (column) => {
                    // reset edits
                    _self.setState({
                        editedCell: null
                    });
                    console.log('columns=',_self.getColumn());
                    sortColumn(
                        _self.getColumn(),
                        column,
                        _self.setState.bind(_self)
                    );
                },
            };
        }
    },
    getColumn:function(){
        let _self = this;

        var properties = {
            approve_id:{
                type: 'number'
            },
            created_at:{
                type: 'string'
            },
            created_by:{
                type: 'string'
            },
            id:{
                type: 'number'
            },
            name:{
                type: 'string'
            },
            order_id:{
                type: 'number'
            },
            status:{
                type: 'boolean'
            },
            supplier:{
                type: 'string'
            },
            updated_at:{
                type: 'string'
            },
            updated_by:{
                type: 'string'
            },
        };
        
        var editable = cells.edit.bind(_self, 'editedCell', (value, celldata, rowIndex, property) => {
            console.log('edit----change-------------------');
            var idx = findIndex(_self.state.data, {
                id: celldata[rowIndex].id,
            });

            _self.state.data[idx][property] = value;
            _self.setState({
                data: datasources.products,
            });
        });
        
        var highlighter = (column) => highlight((value) => {
            return Search.matches(column, value, _self.state.search.query);
        });

        if(_self.state.columns) {
            return _self.state.columns;
        } else {
            
        return [
                    {
                        property: 'id',
                        header:   'ID',
                        width:100,
                        classes:'cid',
                        search:false,
                    },
                    {
                        property: 'approve_id',
                        header:   'Approve_id',
                        width:400,
                        search:false,
                        cell:[ 
                            editable({
                                editor:editors.dropdown(datasources.approves,{name:'name',value:'id'}),
                            }),
                            function(approve_id){
                                var a = _(datasources.approves).filter(function(approve) {
                                    return approve.id == approve_id;
                                }).value()[0];
                                var val = 'no Name';
                                if(a){
                                    val = a.name;
                                }
                                return  val;
                            },
                        ],
                    },
                    {  
                        property: 'order_id',
                        header:   'Order Id',
                        width:400,
                        search:false,
                        cell:[
                            editable({
                                editor:editors.dropdown(_self.dropdownOrder(),{value:'id',name:'name'}),
                            }),
                            function(order_id){
                                   console.log('order_id',order_id);
                                   var o =_(datasources.ordres)
                                      .filter(function(orderid) {
                                          return orderid.id == order_id; 
                                       })
                                      .value()[0];
                                    if(o){
                                        var val = o.name;
                                    } else {
                                        var  val = 'no name';
                                    }
                                    return <span><i className='glyphicon glyphicon-star'></i>{val}</span>;
                                   },
                        ],
                    },
                    {
                        property: 'name',
                        header:   'Name',
                        search: true,
                        width:400,
                        cell:[
                            editable({
                                editor: editors.input(),
                            }),
                            highlighter('name')
                            ],
                    },
                    {  
                        property: 'supplier',
                        header:  'Supplier',
                        width:400,
                        search: true,
                        cell:[
                        editable({editor: editors.input(),}), 
                        highlighter('supplier')
                        ],
                    },
                    {  
                        property: 'status',
                        header:   'Status',
                        width:100,
                        search: false,
                        cell:[ 
                        editable({editor:editors.boolean()}),
                        (status) => status ? <span>&#10003;</span> : <span>x</span>,]
                    },
                    {
                        property: 'created_at',
                        header:   'Created At',
                        width:400,
                        search: false,
                    },
                    {
                        property: 'created_by',
                        header:   'Created By',
                        search: false,
                        width:400,
                    },
                    {  
                        property: 'updated_at',
                        header:   'Updated At',
                        search: false,
                        width:400,
                    },
                    {
                        property: 'updated_by',
                        header:   'Updated By',
                        search: false,
                        width:400,
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
        }
    },
    render: function() {
        let _self = this;
        console.log('--------------------------------------------------------order render--------------------------------------------');
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
                       <div className="panel-title">
                        <b>Order</b>
                       </div>
                    </div>
                      <div className="panel-body">
                     <Overlay ref="overay" />
                     <div className='controls'>
                        <div className='per-page-container'>
                            Per page <input type='text' defaultValue={pagination.perPage} onChange={_self.onPerPage}></input>
                            <input type="button" name="btnAdd" value="AddItem" onClick={_self._Additem} />
                        </div>
                        <div className='search-container'>
                            Search <Search columns={columns} data={_self.state.data} onChange={_self.onSearch} />
                        </div>
                    </div>
                      <Table
                        className='pure-table pure-table-striped'
                        columns={columns}
                        header={header}
                        data={paginated.data}
                        >
                    <tfoot>
                        <tr>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        </tr>
                        <tr>
                            <td>
                                You could show sums etc. here in the customizable footer.
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tfoot>
                        </Table>
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
                 <SkyLight ref='modal' title={_self.state.modal.title} > <Frmedit parent={_self} content={_self.state.modal.content}  /> 
                        {/* this.state.modal.content */ }
                 </SkyLight>
                <Modalx
                   isOpen={_self.state.modalIsOpen}
                   style={customStyles}
                   onRequestClose={_self.closeModal} >
                  <h1>Modal Content</h1>
                  <p>Etc.</p>
                  <h2>Hello</h2>
                  <button onClick={_self.closeModal}>close</button>
                  <div>I am a modal</div>
                  <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button onClick={_self.deleteitem}>DEL</button>
                  </form>
                </Modalx>
                    </div>
                  </div>  
                </div>
            </div>

        );
    },
      onSelect(page) {
        var pagination = this.state.pagination || {};
        pagination.page = page;
        this.setState({
            pagination: pagination
        });
    },

    onPerPage(e) {
        var pagination = this.state.pagination || {};

        pagination.perPage = parseInt(e.target.value, 10);

        this.setState({
            pagination: pagination
        });
    },
});

