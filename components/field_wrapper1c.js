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
            'form-element form-group',
            this.props.classes || []);
        classes.push('pure-control-group');
        console.log('children=',this.props.children);
//             <div className={classes.join(' ')} key={this.props.key}>
//                <label htmlFor={this.props.key}>{this.props.label}</label>
//                {this.props.children}
//            </div>
//            <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
        return (
              <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12" key={this.props.key}  >
                <label className="control-label col-xs-4 col-sm-4 col-md-4 col-lg-4">
                      {this.props.label}: &nbsp;&nbsp;&nbsp;
                </label>
                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                      {this.props.children}
                </div>
              </div>
        );
    }
});

