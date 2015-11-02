<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

    <script src="jquery-latest.js" type="text/javascript"></script>
    <script src="bootstrap.min.js"></script>
    <script src="react.js"></script>
    <script src="react-with-addons.js"></script>
    <script src="react-dom.js" type="text/javascript"></script>
    <script src="JSXTransformer.js" type="text/javascript" ></script>
    <script src="moment.js" type="text/javascript"></script>
    <script src="lodash.js"></script>
    <script src="react-bootstrap.js"></script>
    <script src="reflux.min.js"></script>
    <script src="ReactRouter.js"></script>
    <script>
    </script>
    <script src="./common.js" type="text/jsx" ></script>
    <script src="./contentitem.js" type="text/jsx" ></script>
    <script src="./approve.js" type="text/jsx" ></script>
    <script src="./sale.js" type="text/jsx" ></script>
    <script src="./order.js" type="text/jsx" ></script>
    <script src="./product.js" type="text/jsx" ></script>
    <script src="./forcast.js" type="text/jsx" ></script>
    <script src="./login.js" type="text/jsx" ></script>
    <script src="./reflux.js" type="text/javascript" ></script>
    <link rel="stylesheet" href="login.css">
    <style type="text/css">

body {
    padding-top: 50px;
    overflow: hidden;
}

.App {
    padding-top: 50px;
    overflow: hidden;
}


#wrapper {
    min-height: 100%;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    display: inline-block;
    padding-bottom: 40px;
}
#main-wrapper {
    width:100%;
    height: 100%;
    overflow-y: auto;
    padding: 50px 0 0px 0;
}
#main {
    position: relative;
    height: 100%;
    overflow-y: auto;
    padding: 0 15px;
}
#sidebar-wrapper {
    height: 100%;
    padding: 50px 0 0px 0;
    position: fixed;
    border-right: 1px solid gray;
}
#sidebar {
    position: relative;
    height: 100%;
    overflow-y: auto;
}
#sidebar .list-group-item {
        border-radius: 0;
        border-left: 0;
        border-right: 0;
        border-top: 0;
}
@media (max-width: 992px) {
    body {
        padding-top: 0px;
    }
}
@media (min-width: 992px) {
    #wrapper {
      top: 20px;
    } 
    #main-wrapper {
        float:right;
    }
}
@media (max-width: 992px) {
    #main-wrapper {
        padding-top: 0px;
    }
}
@media (max-width: 992px) {
    #sidebar-wrapper {
        position: static;
        height:auto;
        max-height: 300px;
        border-right:0;
    }
}

.container-fluid {
  padding-right: 30px;
}

    #overlay {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          background: #000;
          opacity: 0.8;
          filter: alpha(opacity=80)
          }
      #loading {
          width: 50px;
          height: 57px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -28px 0 0 -25px;
      }

      /* Preload ICON */
      #overlayx {
        opacity: .7;
        background-color: #000000;
        visibility: visible;
        /*transition: all 2s;*/
        position: fixed; 
        left: 0; 
        top: 0;
        z-index: 9999; 
        width: 100%; 
        height: 100%;
      }
      #loadingx {
        position: fixed; /* or absolute */
        top: 42%;
        left: 50%;
      }

      /* Timer*/
      .timer{
        z-index: 999;
        width: 29px;
        height: 29px;
        background-color: transparent;
        box-shadow: inset 0px 0px 0px 2px #fff;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -100px;
       }
      .timer:after, .timer:before{
        position: absolute;
        content:"";
        background-color: #fff;
      }
      .timer:after{
        width: 11px;
        height: 2px;
        top: 13.5px;
        left: 13.5px;
        -webkit-transform-origin: 1px 1px;
           -moz-transform-origin: 1px 1px;
            transform-origin: 1px 1px;
        -webkit-animation: minhand 2s linear infinite;
           -moz-animation: minhand 2s linear infinite;
            animation: minhand 2s linear infinite;
      }
      .timer:before{
        width: 10px;
        height: 2px;
        top: 13.5px;
        left: 13.5px;
        -webkit-transform-origin: 1px 1px;
           -moz-transform-origin: 1px 1px;
            transform-origin: 1px 1px;
        -webkit-animation: hrhand 8s linear infinite;
           -moz-animation: hrhand 8s linear infinite;
            animation: hrhand 8s linear infinite;
      }

      @-webkit-keyframes minhand{
        0%{-webkit-transform:rotate(0deg)}
        100%{-webkit-transform:rotate(360deg)}
      }
      @-moz-keyframes minhand{
        0%{-moz-transform:rotate(0deg)}
        100%{-moz-transform:rotate(360deg)}
      }
      @keyframes minhand{
        0%{transform:rotate(0deg)}
        100%{transform:rotate(360deg)}
      }

      @-webkit-keyframes hrhand{
        0%{-webkit-transform:rotate(0deg)}
        100%{-webkit-transform:rotate(360deg)}
      }
      @-moz-keyframes hrhand{
        0%{-moz-transform:rotate(0deg)}
        100%{-moz-transform:rotate(360deg)}
      }
      @keyframes hrhand{
        0%{transform:rotate(0deg)}
        100%{transform:rotate(360deg)}
      }


      .box {
        width: 200px;
        height: 100px;
        background: yellow;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -100px;
      }

        .row {
          margin-left: 20px;
          margin-right: 20px;
          /*margin-top: 40px;*/
          margin-bottom: 20px;
        }

        #masthead {
          height: 100%
        }
     .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        /* Set the fixed height of the footer here */
        height: 40px;
        background-color: black;
    }
    
    .footer > .container {
        padding-right: 15px;
        padding-left: 15px;
        padding-top: 10px;
    }
    </style>
</head>
<body>
  <div id="content"  />
</body>
<script type="text/jsx">
    var tabList = [
        { 'id': 1, 'name': 'AAAAA',    'url': '#' , 'i':'glyphicon glyphicon-apple'   ,'type':'tab'},
        { 'id': 2, 'name': 'BBBBB',    'url': '#' , 'i':'glyphicon glyphicon-bitcoin'   ,'type':'tab'},
        { 'id': 3, 'name': 'CCCCC',    'url': '#' , 'i':'glyphicon glyphicon-lamp'   ,'type':'tab'},
        { 'id': 4, 'name': 'DDDDD',    'url': '#' , 'i':'glyphicon glyphicon-yen'   ,'type':'tab'},
        { 'id': 5, 'name': 'EEEEE',    'url': '#' , 'i':'glyphicon glyphicon-grain'   ,'type':'tab'},
        { 'id': 6, 'name': 'FFFFF',    'url': '#' , 'i':'glyphicon glyphicon-sunglasses'   ,'type':'tab'},
    ];
    // var tabList = [
    //     { 'id': 1, 'name': 'Order',      'url': '#'    ,'type':'tab'},
    //     { 'id': 2, 'name': 'Approve',    'url': '#'    ,'type':'tab'},
    //     { 'id': 3, 'name': 'Sale',       'url': '#'    ,'type':'tab'},
    //     { 'id': 4, 'name': 'Product',    'url': '#'    ,'type':'tab'},
    //     { 'id': 5, 'name': 'Forcast',    'url': '#'    ,'type':'tab'},
    //     { 'id': 6, 'name': 'Reports',    'url': '#'    ,'type':'tab'},
    // ];
    var tabListr = [
          { 'id':13,  'name': 'Setting',                  'url': '#', 'role':'' ,        'i':'fa fa-cog', 'type':'dropdown' , 'dropdownlist': [
          { 'id':20 , 'name': 'Action1' ,                 'url':'#' , 'role':'' ,         'i':'fa fa-cog', 'class':'' },
          { 'id':21 , 'name': 'Another action' ,          'url':'#' , 'role':'' ,         'i':'fa fa-cog', 'class':'' },
          { 'id':22 , 'name': 'Something else here' ,     'url':'#' , 'role':'' ,         'i':'fa fa-cog', 'class':'' },
          { 'id':23 , 'name': '' ,                        'url':'#' , 'role':'separator', 'i':'fa fa-cog', 'class':'divider' },
          { 'id':24 , 'name': 'Separated link' ,          'url':'#' , 'role':'' ,         'i':'fa fa-cog', 'class':'' },
          { 'id':26 , 'name': '' ,                        'url':'#' , 'role':'' ,         'i':'fa fa-cog', 'class':'divider' },
          { 'id':25 , 'name': 'One more separated link' , 'url':'#' , 'role':'' ,         'i':'fa fa-cog', 'class':'' },
          { 'id':27 , 'name': 'Test' ,                    'url':'#' , 'role':'' ,         'i':'fa fa-cog', 'class':'' }
                                                              ]},
        ];
          //<!-- { 'id': 12, 'name': 'Logout', 'url':'#' ,'type':'tab', 'i':'fa fa-cog' }, -->

  
    var DropdownItem = React.createClass({
      handleClick: function(e,f){
        _self = this;
        this.props.handleClick(e);
      }, 
      render: function() {
        _self = this;
        var tab = this.props.tab;
        var i = '';
        return (
               <ul className="dropdown-menu">
                  { tab.map(function(item){
        
                    if(item.i != undefined ){
                       i = item.i;
                    } 
                    if(item.name != '' ) {
                     return (<li key={item.id} ><a   onClick={_self.handleClick.bind(_self,item)} href={item.url}><i className={i} ></i> {item.name}</a></li>);
                    } else  {
                     return (<li key={item.id} role="separator" className="divider"></li>);
                    }
                  })}
              </ul>
        );
      }
    });

    var Dropdown = React.createClass({
      handleClick: function(item){
        this.props.handleClick(item);
      },    
      render: function() {
        _self = this;
        var dwl = this.props.dropdownlist
        var i = '';
        if(this.props.i != undefined ){
           i = this.props.i;
        }
        return (
                <li className={this.props.isCurrent ? this.props.c+' active dropdown' : this.props.c + ' dropdown' } >
                  <a href="#" className="dropdown-toggle"  data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                   <i className={i}> </i>&nbsp; 
                   {this.props.name} <span className="caret"></span>
                   </a>
                  <DropdownItem  tab={dwl} handleClick={_self.handleClick}
                  />
                </li>            
              )
      }
    });

    var Tabform = React.createClass({
      render: function() {
        return (
          <div>
              <form className="navbar-form navbar-left" role="search">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search" />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
          </div>
        );
      }
    });

    var Tab = React.createClass({
      handleClick: function(e){
        e.preventDefault();
        console.log('y/n=',$(".navbar-toggle").attr("aria-expanded"));
        if( $(".navbar-toggle").attr("aria-expanded")== 'true') {
          $('.navbar-toggle').click();
        }
        this.props.handleClick();
      },    
      render: function() {
        var i = '';
        if(this.props.i != undefined ){
          i = this.props.i;
        }
        return (
            <li className={this.props.isCurrent ? this.props.c+' active' : this.props.c }>
                <a data-target="#bs-example-navbar-collapse-1" onClick={this.handleClick} href={this.props.url} >
                    <i className={i}> </i> {this.props.name}      </a>
            </li>
        );
      }
    });


    var LNav = React.createClass({
      handleClick: function(tab){
          this.props.changeTab(tab);
      },    
      render: function() {
        _self = this;
        return (
            <div>
              <ul className="nav navbar-nav">
                 { this.props.tabList.map(function(tab) { 
                    if(tab.type == 'tab'){
                       return (<Tab handleClick={this.handleClick.bind(this, tab)}
                                    key={tab.id}
                                    url={tab.url}
                                    name={tab.name}
                                    c = {tab.class}
                                    i = {tab.i}
                                    isCurrent={(this.props.currentTab === tab.id)}
                          />)
                     } else {
                      return (<Dropdown handleClick={_self.handleClick}
                                    key={tab.id}
                                    url={tab.url}
                                    name={tab.name}
                                    dropdownlist={tab.dropdownlist}
                                    c = {tab.class}
                                    i = {tab.i}
                                    isCurrent={(this.props.currentTab === tab.id)}
                      />)
                     }
                 }.bind(this))}
              </ul>            
            </div>
        )
      }
    });

    var RNav = React.createClass({
     handleClick: function(tab){
          if(tab.id === 12 ){
             console.log('tab====12');
             LoginActons.getLogout();
          } else {
            this.props.changeTab(tab);
          }      
      }, 
      drowdownClick: function(tab,item){
          this.props.dorpdownTab(tab,item)
      },
      render: function() {
        _self = this;
        return (
            <div>
              <ul className="nav navbar-nav navbar-right">
                 { this.props.tabList.map(function(tab) { 
                    if(tab.type == 'tab'){
                       return (<Tab handleClick={this.handleClick.bind(this, tab)}
                                    key={tab.id}
                                    url={tab.url}
                                    name={tab.name}
                                    c = {tab.class}
                                    i = {tab.i}
                                    isCurrent={(this.props.currentTab === tab.id)}
                          />);
                     } else {
                      return (<Dropdown handleClick={_self.drowdownClick.bind(_self,tab)}
                                    key={tab.id}
                                    url={tab.url}
                                    name={tab.name}
                                    dropdownlist={tab.dropdownlist}
                                    c = {tab.class}
                                    i = {tab.i}
                                    isCurrent={(this.props.currentTab === tab.id)}
                      />);
                     }
                 }.bind(this))}
                {this.props.children}           
              </ul> 
            </div>
        );
      }
    });

    var Brand = React.createClass({
      Alertfnc:function(){
        // alert('ForcastApp');
        console.log('ForcastApp');
      },
      render: function() {
        return (
          <div>
             <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a onClick={this.Alertfnc} className="navbar-brand" href="#">BRAND</a>
            </div>    
          </div>
        );
      }
    });

    var UserBrand = React.createClass({
      logout:function(){
          LoginActons.getLogout();
      },
      render: function() {
        console.log('userbrand=',this.props);
        if(this.props.user.name == '') {
           this.props.user.name = 'UserName';
        }

        return (<ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle profile-image" data-toggle="dropdown">
                          <img width="30px" height="30px" src={ this.props.user.img ? this.props.user.img : 'http://placehold.it/30x30' } className="img-circle special-img" /> &nbsp;{this.props.user.name}<b className="caret"></b>&nbsp;&nbsp;
                   </a>
                  <ul className="dropdown-menu">
                              <li><a href="#"><i className="fa fa-cog"></i> Account</a></li>
                              <li className="divider"></li>
                              <li><a onClick={this.logout} href="#"><i className="fa fa-sign-out"></i> Sign-out</a></li>
                  </ul>
                </li>
              </ul>
        );
      }
    });



    var Content = React.createClass({
        render: function(){
            console.log('current tab =',this.props.currentTab);
                return(
                        <div className="tab-content">
                            { this.props.currentTab === 1   ? <Order      className="tab-pane" />  :null}
                            { this.props.currentTab === 2   ? <Approve    className="tab-pane" />  :null}
                            { this.props.currentTab === 3   ? <Sale       className="tab-pane" />  :null}
                            { this.props.currentTab === 4   ? <Product    className="tab-pane" />  :null}
                            { this.props.currentTab === 5   ? <Forcast    className="tab-pane" />  :null}
                            { this.props.currentTab === 6   ? <ContelItem className="tab-pane" id="home1"       text="Home"/>:null }
                            { this.props.currentTab === 10  ? <ContelItem className="tab-pane" id="home2"       text="Home"/>:null }
                            { this.props.currentTab === 11  ? <ContelItem className="tab-pane" id="home3"       text="Home"/>:null }
                            { this.props.currentTab === 13  ? <ContelItem className="tab-pane" id="home5"       text="Home"/>:null }
                            { this.props.currentTab === 14  ? <ContelItem className="tab-pane" id="messages"    text="Message" />:null }
                            { this.props.currentTab === 15  ? <ContelItem className="tab-pane" id="profile"     text="Profile" />:null }
                            { this.props.currentTab === 16  ? <ContelItem className="tab-pane" id="settings"    text="Setting" />:null }
                            { this.props.currentTab === 20  ? <ContelItem className="tab-pane" id="settings20"  text="Action1" /> :null }
                            { this.props.currentTab === 21  ? <ContelItem className="tab-pane" id="settings21"  text="Another Action" /> :null }
                            { this.props.currentTab === 22  ? <ContelItem className="tab-pane" id="settings22"  text="Something else here" /> :null }
                            { this.props.currentTab === 23  ? <ContelItem className="tab-pane" id="settings23"  text="Separated link" /> :null }
                            { this.props.currentTab === 24  ? <ContelItem className="tab-pane" id="settings24"  text="One more separated link" /> :null }
                            { this.props.currentTab === 25  ? <ContelItem className="tab-pane" id="settings25"  text="Test" /> :null }
                  </div>
                );
        }
});



   var App = React.createClass({
      mixins:[Reflux.listenTo(LoginStore,'onStore')],
      getInitialState: function () {        
          return {
              tabList: tabList,
              tabListr: tabListr,
              currentTab: 1,
              currentContent:1,
              loginted:1,
              user:{
               name:'System',
               type:'',
               email:'',
               img:''
              }
          };
      },
      onStore:function(data) {
         console.log('data=',data);
         this.setState({user:data});
      },
      componentDidMount: function() {
         _this = this;
         setTimeout(function(){
           $(ReactDOM.findDOMNode(_this.refs.modal)).hide();
           console.log('hide');
         },1000);
         console.log('didMount');
         TodoActions.testAction();
      },
      componentDidUpdate: function(prevProps, prevState) {
         _this = this;
         console.log('update');
         setTimeout(function(){
           $(ReactDOM.findDOMNode(_this.refs.modal)).hide();
           console.log('hide');
         },1000);
      },
      dorpdownTab:function(tab,item){
          console.log('dropdown tab=',tab.id);
          this.setState({ currentTab: tab.id ,currentContent:item.id });

      },
      changeTab: function(tab) {
          console.log('tab=',tab.id);
          this.setState({ currentTab: tab.id ,currentContent:tab.id});
      },
      renderLogin:function(){
         return (<Login />
          );
      },
      renderMain: function(){
        return (
          <div className="App">          
             <div className="container">
              <div className="navbar-header">
              <nav id="header" className="navbar navbar-inverse  navbar-fixed-top">
              <div className="container-fluid">
                  <Brand />
                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <LNav 
                      currentTab={this.state.currentTab}
                      tabList={this.state.tabList}
                      changeTab={this.changeTab}
                    />
                    <RNav 
                      currentTab={this.state.currentTab}
                      tabList={this.state.tabListr}
                      changeTab={this.changeTab}
                      dorpdownTab={this.dorpdownTab}
                    >
                     <UserBrand {...this.state} />
                    </RNav>
                </div>
              </div>
          </nav>
              </div>
              </div>
          <div id="wrapper">
            <div id="main-wrapper" className="col-md-12 pull-right">
            <div id="main">
            <Content currentTab={this.state.currentContent} />
          </div>        
          </div>        
          </div>        
          <Footer  />
          <Overlay id="overlay" test={this} ref='modal' />
        </div>
        );
      },
      render: function() {
        console.log('thisstate=',this.state);
        console.log('currentTab  = 12 y/n =',this.state);
        if(this.state.user.name != ''){
          console.log('main')
          return  this.renderMain();          
        } else {
          console.log('login')
          return  this.renderLogin();
        }
      }
    });

   ReactDOM.render(<App />,document.getElementById('content'));

</script>
</html>
