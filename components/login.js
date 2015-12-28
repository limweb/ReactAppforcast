import React  from 'react';
import LoginActons from '../actions/loginaction';

var Login = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    LoginActons.getLogin({user:this.refs.name.value,pass:this.refs.pass.value});
  },
  render: function() {
    var name = 'thongchai@servit.co.th';
    var pass = '1234';
    let _self = this;
    return (
      <div className="container">
      <form
      className="form-signin"
      onSubmit={ this.handleSubmit }>
        <h2 className="form-signin-heading">Please sign in</h2>
        <label for="inputEmail" className="sr-only"> Email address </label>
        <input ref="name" type="email"  id="inputEmail"  className="form-control"   
      placeholder="Email address"  required  autofocus></input>
        <label  for="inputPassword" className="sr-only"> Password </label>
        <input ref="pass" type="password" id="inputPassword" 
      className="form-control"  placeholder="Password" required></input>
        <div className="checkbox">
          <label> <input type="checkbox" value="remember-me" /> Remember me </label>
        </div>
        <button  className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in 
        </button>
      </form>
    </div>
      );
  }
});

export default Login;