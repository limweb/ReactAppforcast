import React from 'react';
import ReactDOM  from 'react-dom';
import  SkyLight  from 'babel!react-skylight/src/skylight.jsx'; // XXX: no proper build yet
import './index2.css';
import validate from 'plexus-validate';
import Form   from  './libs/form';


let overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 99,
    backgroundColor: 'rgba(0,0,0,0.3)'
}

let dialogStyles= {
    width: '70%',
    height: '400px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginTop: '-200px',
    marginLeft: '-25%',
    backgroundColor: '#fff',
    borderRadius: '2px',
    zIndex: 100,
    padding: '10px',
    boxShadow: '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)'
}

let closeButtonStyle = {
    cursor: 'pointer',
    float: 'right',
    fontSize: '1.6em',
    margin: '-15px 0'
}

var schema = {
  type      : "object",
  properties: {
    name : {
      title: "Name",
      type: 'string',
    },
    email: {
      title: "Email",
      type: 'string',
      enum: ['A','B','C'],
    }
  },
  "x-hints": {
    form: {
      classes: [ "form-person-section" ]
    }
  }
};

let FieldWrapper = React.createClass({
  render: function() {
    var errors  = (this.props.errors || []).join('\n');
    var classes = [].concat(errors ? 'error' : [],
                            'form-element form-group',
                            this.props.classes || []);
    var helpClasses  =
      'form-help' + (this.props.description ? '' : ' invisible');
    var errorClasses =
      'form-error' + (errors ? '' : ' invisible');
    console.log('-----this.props--children2',this.props.children);
    return (
        <div className={classes.join(' ')} key={this.props.key}>
          <label className="control-label col-xs-2 col-sm-2 col-md-2 col-lg-2" htmlFor={this.props.key}>
            {this.props.title}
          </label>
          <div className=" col-xs-10 col-sm-10 col-md-10 col-lg-10">
          	{this.props.children}
          </div>
        </div>
    );
  }
});


let SectionWrapper = React.createClass({
  render: function() {
    var errors  = (this.props.errors || []).join('\n');
    var level = this.props.path.length;
    var classes = [].concat(errors ? 'error' : [],
                            'form-section',
                            (level > 0 ? 'form-subsection' : []),
                            this.props.classes || []);
    var helpClasses  =
      'form-help' + (this.props.description ? '' : ' hidden');
    var errorClasses =
      'form-error' + (errors ? '' : ' hidden');

    return (
        <fieldset className={classes.join(' ')} key={this.props.key}>
          <legend className="form-section-title">
            {this.props.title}
          </legend>
          {this.props.children}
        </fieldset>
    );
  }
});


let onSubmit = function(data, buttonValue, errors) {
  alert('Data  : '+JSON.stringify(data)+'\n'+
        'Button: '+buttonValue+'\n'+
        'Errors: '+JSON.stringify(errors));
};

class App extends React.Component {
   
   showSimpleDialog(){

   	let _self = this;
    _self.refs.simpleDialog.show();
    
   }
	render() {
		let _self = this;
		return (
			<div>
			<button onClick={_self.showSimpleDialog.bind(_self)} > App123 </button>

			<SkyLight title="เพิ่มพนักงาน"  dialogStyles={dialogStyles} showOverlay={true}
					ref="simpleDialog">
          	<Form className="form-horizontal"
          	   style=" p {    margin: 6px 0 10px;  } "
          	   buttons={['Yes','No']}
               schema   = {schema}
               validate = {validate}
               onSubmit = {onSubmit}
 			   fieldWrapper={FieldWrapper}
               sectionWrapper={SectionWrapper}
                />
        	</SkyLight>
			</div>
		);
	}
}

ReactDOM.render(<App />,document.getElementById('content'));
