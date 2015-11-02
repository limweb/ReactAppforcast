'use strict';
var React = require('react');
import './overlay.css';

var Overlay = React.createClass({
    OnclickHandle:function(){
	    // this.props.test.OnclickHandle();
	},
	render: function() {
		return (
          <div ref="overlay" id="overlay">
            <div onClick={this.OnclickHandle}  className="timer"></div>
          </div>
          )
	}
});
            
module.exports = Overlay;
