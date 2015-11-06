import React from 'react';

var  Frmadd= React.createClass({
    submit:function(e){
        e.preventDefault();
        console.log(this.props);
        if(e.target.name == 'cencle'){
            this.props.parent._close();            
        } else {
        let o = {};
        o.fname = this.refs.firstname.value;
        o.lname = this.refs.lastname.value;
        console.log('click submit',o);
        this.props.parent.submit(o);
        }
    },
    edit:function(){
          return (
            <form >
              Edit Form <br />
              <table>
                  <tbody>
                  <tr>
                  <td>First name:</td>
                  <td> <input ref="firstname" type="text" name="firstname" value={data.name}></input></td>
                  </tr>
                  <tr>
                  <td>Last name:</td>
                  <td> <input type="text" ref="lastname" name="lastname" value={data.supplier}></input></td>
                  </tr>
                  <tr>
                    <td><input type="submit" onClick={this.submit} name="submit" value="Submit" /></td>
                    <td><input type="submit"  onClick={this.submit} name="cencle" value="Cencle" /></td>
                 </tr>
                 </tbody>
              </table>
            </form>
        );
    }

    render: function() {
        let _self = this;
        console.log('props=',_self.props);
        let data = _self.props.content;
        this.edit();
    }
}); 

export default  Frmadd;