'use strict';

var React = require('react');
var Table = require('../src/table');
var findIndex = require('lodash/array/findIndex');
var $ = require('jquery');
var SkyLight = require('babel!react-skylight/src/skylight.jsx'); // XXX: no proper build yet
var FieldWrapper = require('./field_wrapper.jsx');
var SectionWrapper = require('./section_wrapper.jsx');
var Form = require('plexus-form');
var Validate = require('plexus-validate');
var Modalx = require('react-modal');
var Paginator = require('react-pagify');
var Search = require('../src/search');
var sortColumn = require('../src/sort_column');
var Overlay = require('./overlay.jsx');
var datasources = require('./config');
var highlight = require('../src/formatters/highlight');

var cells = require('../src/cells');
var editors = require('../src/editors');

var Pform = require('./frm_product.jsx');

var _ = require('lodash');

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

    getInitialState() {
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
        
        var editable = cells.edit.bind(this, 'editedCell', (value, celldata, rowIndex, property) => {
            console.log('value=',value);
            console.log('celldata =',celldata);
            console.log('rowIndex=',rowIndex);
            console.log('property=',property);


            var idx = findIndex(this.state.data, {
                id: celldata[rowIndex].id,
            });

            console.log('idx=',idx);

            this.state.data[idx][property] = value;
            
            console.log('datavalue=',this.state.data[idx][property]);

            this.setState({
                data: datasources.products,
            });
        });


        var highlighter = (column) => highlight((value) => {
            return Search.matches(column, value, this.state.search.query);
        }); 

        return {
            editedCell: null,
            delidx:null,
            modalIsOpen: false,
            data: datasources.products,
            search: {
                column: '',
                query: ''
            },
            header: {
                onClick: (column) => {
                    // reset edits
                    this.setState({
                        editedCell: null
                    });

                    sortColumn(
                        this.state.columns,
                        column,
                        this.setState.bind(this)
                    );
                },
            },
            sortingColumn: null, // reference to sorting column
            //------ Column of Table-----
            columns: [
                    {
                        property: 'id',
                        header:   'ID',
                        width:200,
                        classes:'cid',
                    },
                    {
                        property: 'approve_id',
                        header:   'Approve_id',
                        width:400,
                        cell:[
                            editable({
                                editor:editors.dropdown(datasources.approves,'id','name'),
                            }),
                            function(approve_id){
                                var a = _(datasources.approves).filter(function(approve) {
                                    return approve.id == approve_id;
                                }).value()[0];
                                var val = 'no Name';
                                if(a){
                                    val = a.name;
                                }
                                return {
                                    value: val
                                }

                            },
                        ],
                    },
                    {  
                        property: 'order_id',
                        header:   'Order Id',
                        width:400,
                            cell:[
                            editable({
                                editor:editors.dropdown(datasources.orders,'id','name'),
                            }),
                            function(order_id){
                                   var o =_(datasources.orders)
                                              .filter(function(orderid) { 
                                                  return orderid.id == order_id; 
                                               })
                                              .value()[0];
                                    if(o){
                                        var val = o.name;
                                    } else {
                                        var  val = 'no name';
                                    }
                                    return { value:<span>{val}</span>};
                                   },
                        ],
                    },
                    {
                        property: 'name',
                        header:   'Name',
                        width:400,
                        cell:[highlighter('name')],
                    },
                    {  
                        property: 'supplier',
                        header:  'Supplier',
                        width:400,
                        cell:[editable({
                                editor: editors.input(),
                            }),                 
                        highlighter('supplier')
                        ],
                    },
                    {  
                        property: 'status',
                        header:   'Status',
                        width:100,
                        cell:[ 
                        editable({editor:editors.boolean()}),
                        (status) => status ? <span>&#10003;</span> : <span>x</span>,]
                    },
                    {
                        property: 'created_at',
                        header:   'Created At',
                        width:400,
                    },
                    {
                        property: 'created_by',
                        header:   'Created By',
                        width:400,
                    },
                    {  
                        property: 'updated_at',
                        header:   'Updated At',
                        width:400,
                    },
                    {
                        property: 'updated_by',
                        header:   'Updated By',
                        width:400,
                    },
                    {
                    cell: function(value, celldata, rowIndex) {
                        var _self = this;
                        var idx = findIndex(this.state.data, {
                            id: celldata[rowIndex].id,
                        });

                        var edit = () => {

                            var schema = {
                                type: 'object',
                                properties: properties,
                            };

                            var onSubmit = (editData, editValue) => {
                                console.log('onSubmit');
                                _self.refs.modal.hide();
                                if(editValue === 'Cancel') {
                                    return;
                                }
                                _self.state.data[idx] = editData;
                                _self.setState({
                                    data: _self.state.data
                                });
                            };

                            var getButtons = (submit) => {
                                console.log('getButton');
                                return (
                                    <span>
                                        <input type='submit'
                                            className='pure-button pure-button-primary ok-button'
                                            key='ok' value='OK'
                                            onClick={submit} />
                                        <input type='submit'
                                            className='pure-button cancel-button'
                                            key='cancel' value='Cancel'
                                            onClick={submit} />
                                    </span>
                                );
                            };
                            _self.setState({
                                modal: {
                                    title: 'Edit',
                                    content:<Pform 
                                            className='pure-form pure-form-aligned'
                                            fieldWrapper={FieldWrapper}
                                            sectionWrapper={SectionWrapper}
                                            buttons={getButtons}
                                            schema={schema}
                                            validate={Validate}
                                            values={_self.state.data[idx]}
                                            onSubmit={onSubmit}
                                    />
                                },    
                            });
                                    // content: <Form
                                    //     className='pure-form pure-form-aligned'
                                    //     fieldWrapper={FieldWrapper}
                                    //     sectionWrapper={SectionWrapper}
                                    //     buttons={getButtons}
                                    //     schema={schema}
                                    //     validate={Validate}
                                    //     values={_self.state.data[idx]}
                                    //     onSubmit={onSubmit}
                                    //     />

                            _self.refs.modal.show();
                        };


                        var remove = () => {
                             //console.log('remove-->',idx);
                             this.state.delidx = idx;
                             //console.log
                            // this could go through flux etc.
                            this.setState({ modalIsOpen:true });
                        };

                        return {
                            value: (
                                <span>
                                    <span className='edit' onClick={edit.bind(this)} style={{cursor: 'pointer'}}>
                                        &#8665;
                                    </span>
                                    <span className='remove' onClick={remove.bind(this)} style={{cursor: 'pointer'}}>
                                        &#10007;
                                    </span>
                                </span>
                            )
                        };
                    }.bind(this),
                },
            ],
            modal: {
                title: 'title',
                content: 'content',
            },
            pagination: {
                page: 0,
                perPage: 10
            }
        };
    },
    onSearch(search) {
        this.setState({
            search: search
        });
    },
    closeModal: function() {
        //console.log('close modal');
        this.state.delidx = null;
        this.setState({modalIsOpen: false});
    },
    deleteitem: function(e) {
        this.setState({modalIsOpen: false});
        e.preventDefault();
        //console.log('close modal deleteitem');
        //console.log('delidx=',this.state.delidx);
        this.state.data.splice(this.state.delidx, 1);

        this.setState({
            data: this.state.data
        });
    },
    componentDidMount: function() {
        // var _self = this;
        
        // setTimeout(function(){
          // $(_self.refs.overay.getDOMNode()).hide();
        //   //console.log('hide');
        // },2500);
    },
    render() {
        var header = this.state.header;
        var columns = this.state.columns;
        var data = this.state.data;
        
        var pagination = this.state.pagination;

        if (this.state.search.query) {
            data = Search.search(
                data,
                columns,
                this.state.search.column,
                this.state.search.query
            );
        }

        data = sortColumn.sort(data, this.state.sortingColumn);
        var paginated = Paginator.paginate(data, pagination);
        return (
                <div>
                 <Overlay ref="overay" />
                 <div className='controls'>
                 <div className='per-page-container'>
                        Per page <input type='text' defaultValue={pagination.perPage} onChange={this.onPerPage}></input>
                 </div>
                 <div className='search-container'>
                        Search <Search columns={columns} data={this.state.data} onChange={this.onSearch} />
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
                            onSelect={this.onSelect} />
                    </div>
                </div>
                <SkyLight ref='modal' title={this.state.modal.title}> { this.state.modal.content} </SkyLight>
                <Modalx
                   isOpen={this.state.modalIsOpen}
                   style={customStyles}
                   onRequestClose={this.closeModal} >
                  <h1>Modal Content</h1>
                  <p>Etc.</p>
                  <h2>Hello</h2>
                  <button onClick={this.closeModal}>close</button>
                  <div>I am a modal</div>
                  <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button onClick={this.deleteitem}>DEL</button>
                  </form>
                </Modalx>
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
