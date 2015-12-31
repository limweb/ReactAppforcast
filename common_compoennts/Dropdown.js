import React, { Component, PropTypes } from 'react';

class Dropdown extends Component {

    constructor(props, content) {
        super(props, content);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {
            value:-1
        }
    }
    handleOnClick(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('onClick dropdown',this.refs.menu.value);
        this.state.value = this.refs.menu.value;
        this.props.change(this.state.value);
    }
    handleOnChange() {
        // bootbox.alert('test dropdown');
        console.log('onChange dropdown',this.refs.menu.value);
        this.state.value = this.refs.menu.value;
        this.props.change(this.state.value);
    }
    render() {
        console.log('Dropdown--------------->',this.props.data);
        return (<select defaultValue={this.state.value} ref="menu" onClick={this.handleOnClick} {...this.props} onChange={this.handleOnChange} >
                    {   this.props.data.map((o,i) => (
                            <option key={i} value={o.value}>{o.label}</option>
                        ))
                    }
                </select>
            );
    }
}
export default Dropdown;
