'use strict';
var React = require('react');

var FForm = React.createClass({
  onYesNo: function(e){
      e.preventDefault();
      console.log('onYesNoclick');
      let _self = this;
      _self.props.onYesNo(this.props.idx,e.target.value,this.props.method);
  },  
  getInitialState: function() {
    var values = this.props.values;
    var errors = this.props.method;
    return { values: values,
             output: values,
             errors: errors };
  },
  render: function() {
    let _self = this;
    console.log('props=====',_self.props);
    return (
        <form>
          <fieldset>
        <div className="divborderbotton">
          <h3>{_self.props.title}</h3>
        </div>
        <legend className="form-section-title" ></legend>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;{_self.props.subtitle} </span>
        <br/><br/>
        <span>
          <input type='submit' onClick={this.onYesNo}
                  className='pure-button pure-button-primary ok-button'
                  key='yes' value='Yes' />
          <input type='submit' className='pure-button cancel-button'
                  key='no' value='No' onClick={this.onYesNo} />
        </span>
          </fieldset>
        </form>
    );
   }


});

export default FForm;
