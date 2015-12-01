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
//                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
        return (
              <div className="col-lg-12 col-md-12 col-sm-12" key={this.props.key}>
                <div className="form-group">
                  <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">{this.props.label}: &nbsp;&nbsp;&nbsp;</label>
                  <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    {this.props.children}
                  </div>
                </div>
              </div>
        );
    }
});

