import React  from 'react';


  var Mike = React.createClass({
      render: function() {
        return (
          <div className="mike">
                      <img src="http://s.mlkshk.com/r/104TN" />
          </div>
        );
      }
  });

  var Donnie = React.createClass({
      render: function() {
        return (
          <div className="donnie">
                     <img src="http://s.mlkshk.com/r/103AG" />
          </div>
        );
      }
    });

    var Raph = React.createClass({
      render: function() {
        return (
                    <div className="raph">
                        <img src="http://s.mlkshk.com/r/JAUD" />
                    </div>
        );
      }
    });

    var Leo = React.createClass({
      render: function() {
        return (
                    <div className="leo">
                        <img src="http://s.mlkshk.com/r/ZJPL" />
                    </div>
        );
      }
    });

    var Footer = React.createClass({
      render: function() {
        return (
            <div className="footer">
              <div className="container">
                <p className="text-muted">CopyRight (c) by Thongchia Lim. </p>
              </div>
           </div>
        );
      }
    });

 var Overlay = React.createClass({
  
  OnclickHandle:function(){
    this.props.test.OnclickHandle();
  },
  render:function(){
    return(
          <div ref="overlay" id="overlay">
            <div onClick={this.OnclickHandle}  className="timer"></div>
          </div>)
  }
});


module.exports = {
  Mike: Mike, 
  Overlay: Overlay,
  Footer: Footer,
  Raph: Raph,
  Donnie: Donnie,
  Leo:Leo
}