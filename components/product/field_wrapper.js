'use strict';

var React = require('react');


module.exports = React.createClass({
    displayName: 'FieldWrapper',

    propTypes: {
        errors: React.PropTypes.array,
        classes: React.PropTypes.array,
        key: React.PropTypes.string,
        title: React.PropTypes.string,
        children: React.PropTypes.object,
    },

    render() {
        var errors = (this.props.errors || []).join('\n');
        var classes = [].concat(errors ? 'error' : [],
            'form-element',
            this.props.classes || []);
        classes.push('pure-control-group');

//             <div className={classes.join(' ')} key={this.props.key}>
//                <label htmlFor={this.props.key}>{this.props.label}</label>
//                {this.props.children}
//            </div>
//            <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
        return (
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" key={this.props.key}>
                <div className="form-group">
                      <label className="col-xs-2 col-sm-2 col-md-2 col-lg-2 control-label">
                         {this.props.label}: &nbsp;&nbsp;&nbsp;
                      </label>
                      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                         {this.props.children}
                      </div>
                </div>
              </div>
        );
    }
});

