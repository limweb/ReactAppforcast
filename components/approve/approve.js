import React  from 'react';
import Reflux  from 'reflux';
import { ApproveActions, ApproveStore } from '../../store/approvestore';
import Perpage from '../perpage';
import Pagesearch from '../pagesearch';
import Paginator from 'react-pagify';
import { Table,Search,sortColumn,editors,formatters,predicates,cells  } from 'reactabular';
import  Overlay  from '../overlay';
import _ from 'lodash';
import  SkyLight  from 'babel!react-skylight/src/skylight.jsx'; // XXX: no proper build yet
import Form   from  './../../libs/form';
import FieldWrapper from './../field_wrapper1c';
import  SectionWrapper  from './section_wrapper';
import  validate  from 'plexus-validate';
import Confirmer from './../comfirmform';

let YesNostyle= {
    width: '400px',
    height: '190px',
    position: 'fixed',
    top: '50%',
    left: '54%',
    marginTop: '-200px',
    marginLeft: '-25%',
    backgroundColor: '#fff',
    borderRadius: '2px',
    zIndex: 100,
    padding: '10px',
    boxShadow: '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)'
}

let dialogStyles= {
    width: '494px',
    height: '240px',
    position: 'fixed',
    top: '50%',
    left: '65%',
    marginTop: '-200px',
    marginLeft: '-35%',
    backgroundColor: '#fff',
    borderRadius: '2px',
    zIndex: 100,
    padding: '10px',
    boxShadow: '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)'
}

let highlight = formatters.highlight;
let findIndex =  _.findIndex;

var datasources = {
  data:[],
};

	
	
	
	

var Approve = React.createClass( {
	mixins:[ Reflux.listenTo(ApproveStore,'onStore'),	],
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
		ApproveActions.getApproves();
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
            // console.log('edit----change-------------------',_self.state.data);
            var idx = findIndex(_self.state.data, {
                id: celldata[rowIndex].id,
            });

            _self.state.data[idx][property] = value;
			     ApproveActions.updateApprove(_self.state.data[idx]);
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
,
                     {   
                     header: 'Action',
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
                          _self.setState({
                            modal: {
                                      title: 'Are you sure want to delete ?',
                                      content: _self.state.data[idx].name,
                                      idx:_self.state.data[idx].id,
                                      method:'delete',
                                   },
                          });
                          _self.refs.xmodal.show();
                     };  // remove               
                     return {
                       value: ( 
                           <span>
                           <span alt='remove item' className='remove' onClick={remove.bind(_self)} style={{cursor: 'pointer'}}>
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

        let onYesNo = function(data, buttonValue, method) {
        if(buttonValue=='No' ) {

        } else {
          if(method =='delete' && buttonValue == 'Yes'){
              console.log('Data  : '+JSON.stringify(data)+'\n'+
                  'Button: '+buttonValue+'\n'+
                  'Errors: '+JSON.stringify(method));
              ApproveActions.delApprove(JSON.stringify(data));
          }
        }
        _self.refs.xmodal.hide();
       };


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
						<b>Approve</b>
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
                <SkyLight   dialogStyles={dialogStyles}
                            ref='modal' title={_self.state.modal.title} >
                    {_self.state.modal.content}
                </SkyLight>
                <SkyLight dialogStyles={YesNostyle} ref='xmodal'> 
                <Confirmer onYesNo={onYesNo} 
                      subtitle={this.state.modal.content}
                      title={this.state.modal.title}
                      idx = {this.state.modal.idx}
                      method = {this.state.modal.method}
                      />
                </SkyLight>

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

        var properties = {
            // id:{
            //     type: 'number'
            // },
            name:{
                type: 'string'
            },
            status:{
                type: 'boolean'
            },
        };

        var schema = {
               type: 'object',
               properties: properties,
        }; //schema

        var getButtons = (submit) => {
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


        var onSubmit = (editData, editValue) => {
                                this.refs.modal.hide();
                                console.log('onSubmit',editData,editValue);
                                if(editValue === 'Cancel') {
                                    console.log('Cancel');
                                    return;
                                }
                                let _name = editData.name;
                                let _status = editData.status || 0 ;

                                if(name == undefined) {
                                      console.log('undefined');
                                } else {
                                    console.log('hava data');
                                    ApproveActions.addApprove({name:_name,status:_status});
                                }
                                // // this.state.data[idx] = editData;
                                // this.setState({
                                //     data: this.state.data
                                // });
                            };


         _self.setState({
           modal: {
               title: 'Add New Approve',
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



        _self.refs.modal.show();
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

export default Approve;
