import React from 'react';
import ReactDOM  from 'react-dom';
import  SkyLight  from 'babel!react-skylight/src/skylight.jsx'; // XXX: no proper build yet
import './index2.css';
import validate from 'plexus-validate';
import Form   from  './libs/form';
import Confirmer from './components/comfirmform';

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

let closeButtonStyle = {
    cursor: 'pointer',
    float: 'right',
    fontSize: '1.6em',
    margin: '-15px 0'
}

var Uploader = React.createClass({
	render: function() {
		return (
			<div className="uploader">

			 <h1>ต้องการจะลบ หรือไม่ </h1>
			 <span>{this.props.value}</span>
			</div>
		);
	}
});

// var schema = {
// 	  "x-hints" : {
// 	    form: {
// 	      inputComponent: "uploader"
// 	    }
// 	  }
// };

var schema = {
  type      : "object",
  properties: {
    name : {
      title: "Name",
      "x-hints": {
        form: {
          classes: [ "form-text-field", "form-name-field" ]
        }
      }
    },
    email: {
      title: "Email",
      "x-hints": {
        form: {
          classes: [ "form-text-field", "form-email-field" ]
        }
      }
    }
  },
  "x-hints": {
    form: {
      classes: [ "form-person-section" ]
    }
  }
};


var handlers = {
  uploader: Uploader
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
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 maginauto">
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



let style = {
	float:"right",
	width:'100px'
};


let btnstyle = {
	'padding-top': '10px',
};

var getButtons = (submit) => {
    return (
        <span style={btnstyle}>
    	<br />
	            <input type='submit'  style={{ width:'100px'}}
	            className='btn btn-primary ok-button'
                key='ok' value='Yes'
                onClick={submit} />
                <input type='submit' style={style} className='btn btn-default cancel-button'
                key='cancel' value='No' onClick={submit} />
        </span>
    );
}

let vals = ['a','b','c',"Hello ABC"];

class App extends React.Component {
   
   hideDialog(){
   	let _self = this;
    _self.refs.simpleDialog.hide();
   }
   showSimpleDialog(){

   	let _self = this;
    _self.refs.simpleDialog.show();
    
   }
	render() {
		let _self = this;
		let onSubmit = function(data, buttonValue, errors) {

			if(buttonValue=='No' ) {
				_self.refs.simpleDialog.hide();
			} else {
       alert('Data  : '+JSON.stringify(data)+'\n'+
       'Button: '+buttonValue+'\n'+
       'Errors: '+JSON.stringify(errors));
     }
   };


		return (
			<div>
			<button onClick={_self.showSimpleDialog.bind(_self)} > App123 </button>

			<SkyLight title=""  dialogStyles={dialogStyles} showOverlay={true}
					ref="simpleDialog"
			>
          	<Confirmer  testClose={_self.hideDialog.bind(_self)} 
          			values={['คุณฟฟฟฟ']} 
          			title="TItle" onSubmit={onSubmit} />
        	</SkyLight>
			</div>
		);
	}
}

ReactDOM.render(<App />,document.getElementById('content'));
