<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>

    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

    <script src="http://code.jquery.com/jquery-latest.js" type="text/javascript"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.min.js" type="text/javascript"></script>
    <script src="https://fb.me/react-with-addons-0.13.3.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js" type="text/javascript" ></script>
    <script src="http://momentjs.com/downloads/moment.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/0.27.1/react-bootstrap.js"></script>
    <script src="https://cdn.jsdelivr.net/refluxjs/0.2.11/reflux.min.js"></script>
    <script>
    </script>
    <script src="./common.js" type="text/jsx" ></script>
    <script src="./contentitem.js" type="text/jsx" ></script>
    <script src="./approve.js" type="text/jsx" ></script>
    <script src="./sale.js" type="text/jsx" ></script>
    <script src="./order.js" type="text/jsx" ></script>
    <script src="./product.js" type="text/jsx" ></script>
    <script src="./forcast.js" type="text/jsx" ></script>
    <script src="./reflux.js" type="text/javascript" ></script>
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
        background-color: #f5f5f5;
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
        { 'id': 1, 'name': 'Order',   'url': '#a'   ,'type':'tab'},
        { 'id': 2, 'name': 'Approve', 'url': '#b' ,'type':'tab'},
        { 'id': 3, 'name': 'Sale',   'url': '#c'   ,'type':'tab'},
        { 'id': 4, 'name': 'Product',    'url': '#d'    ,'type':'tab'},
        { 'id': 5, 'name': 'Forcast',    'url': '#e'    ,'type':'tab'},
        { 'id': 6, 'name': 'Reports',    'url': '#f'    ,'type':'tab'},
    ];
    var tabListr = [
        { 'id': 13, 'name': 'Setting',    'url': '#'    ,'type':'dropdown' , 'dropdownlist': [
                    { 'id':20 , 'name': 'Action1' , 'url':'#' , 'role':'' , 'class':'' },
                    { 'id':21 , 'name': 'Another action' , 'url':'#' , 'role':'' , 'class':'' },
                    { 'id':22 , 'name': 'Something else here' , 'url':'#' , 'role':'' , 'class':'' },
                    { 'id':23 , 'name': '' , 'url':'#' , 'role':'separator' , 'class':'divider' },
                    { 'id':24 , 'name': 'Separated link' , 'url':'#' , 'role':'' , 'class':'' },
                    { 'id':26 , 'name': '' , 'url':'#' , 'role':'' , 'class':'divider' },
                    { 'id':25 , 'name': 'One more separated link' , 'url':'#' , 'role':'' , 'class':'' }
                                                              ]},
        { 'id': 12, 'name': 'Logout',   'url': '#'   ,'type':'tab'},
        ];

  
    var DropdownItem = React.createClass({
      handleClick: function(e,f){
        _self = this;
        this.props.handleClick(e);
      }, 
      render: function() {
        _self = this;
        var tab = this.props.tab;
        return (
               <ul className="dropdown-menu">
                  { tab.map(function(item){
                    if(item.name != '' ) {
                     return (<li><a  val={item} onClick={_self.handleClick.bind(_self,item)} href={item.url}>{item.name}</a></li>);
                    } else  {
                     return (<li role="separator" className="divider"></li>);
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
        return (
                <li className={this.props.isCurrent ? this.props.c+' active dropdown' : this.props.c + ' dropdown' } >
                  <a href="#" className="dropdown-toggle"  data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> {this.props.name} <span className="caret"></span></a>
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
        this.props.handleClick();
      },    
      render: function() {
        return (
            <li  className={this.props.isCurrent ? this.props.c+' active' : this.props.c }>
                <a   onClick={this.handleClick} href={this.props.url} >
                    {this.props.name}
                </a>
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
                                    isCurrent={(this.props.currentTab === tab.id)}
                          />)
                     } else {
                      return (<Dropdown handleClick={_self.handleClick}
                                    key={tab.id}
                                    url={tab.url}
                                    name={tab.name}
                                    dropdownlist={tab.dropdownlist}
                                    c = {tab.class}
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
          this.props.changeTab(tab);
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
                                    isCurrent={(this.props.currentTab === tab.id)}
                          />);
                     } else {
                      return (<Dropdown handleClick={_self.drowdownClick.bind(_self,tab)}
                                    key={tab.id}
                                    url={tab.url}
                                    name={tab.name}
                                    dropdownlist={tab.dropdownlist}
                                    c = {tab.class}
                                    isCurrent={(this.props.currentTab === tab.id)}
                      />);
                     }
                 }.bind(this))}
              </ul>            
            </div>
        );
      }
    });

    var Brand = React.createClass({
      Alertfnc:function(){
        alert('ForcastApp');
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
              <a onClick={this.Alertfnc} className="navbar-brand" href="#">FORCAST</a>
            </div>    
          </div>
        );
      }
    });



    var Content = React.createClass({
        render: function(){
            console.log('current tab =',this.props.currentTab);
            return(
                    <div className="tab-content">
                        { this.props.currentTab === 1  ? <Order   className="tab-pane" />  :null}
                        { this.props.currentTab === 2  ? <Approve className="tab-pane" />  :null}
                        { this.props.currentTab === 3  ? <Sale    className="tab-pane" />  :null}
                        { this.props.currentTab === 4  ? <Product className="tab-pane" />  :null}
                        { this.props.currentTab === 5  ? <Forcast className="tab-pane" />  :null}
                        { this.props.currentTab === 6  ? <ContelItem className="tab-pane " id="home1" text="Home"/>:null }
                        { this.props.currentTab === 10  ? <ContelItem className="tab-pane " id="home2" text="Home"/>:null }
                        { this.props.currentTab === 11  ? <ContelItem className="tab-pane " id="home3" text="Home"/>:null }
                        { this.props.currentTab === 12  ? <ContelItem className="tab-pane " id="home4" text="Home"/>:null }
                        { this.props.currentTab === 13  ? <ContelItem className="tab-pane " id="home5" text="Home"/>:null }
                        { this.props.currentTab === 14  ? <ContelItem className="tab-pane" id="messages"    text="Message" />:null }
                        { this.props.currentTab === 15  ? <ContelItem className="tab-pane" id="profile"     text="Profile" />:null }
                        { this.props.currentTab === 16  ? <ContelItem className="tab-pane" id="settings"    text="Setting" />:null }
                        { this.props.currentTab === 20 ? <ContelItem className="tab-pane" id="settings20"  text="Action1" /> :null }
                        { this.props.currentTab === 21 ? <ContelItem className="tab-pane" id="settings21"  text="Another Action" /> :null }
                        { this.props.currentTab === 22 ? <ContelItem className="tab-pane" id="settings22"  text="Something else here" /> :null }
                        { this.props.currentTab === 23 ? <ContelItem className="tab-pane" id="settings23"  text="Separated link" /> :null }
                        { this.props.currentTab === 24 ? <ContelItem className="tab-pane" id="settings24"  text="One more separated link" /> :null }
                        { this.props.currentTab === 25 ? <ContelItem className="tab-pane" id="settings25"  text="Test" /> :null }
              </div>
            );
        }
});



   var App = React.createClass({
      mixins: [React.addons.LinkedStateMixin], // exposes this.linkState used in render
      getInitialState: function () {        
          return {
              tabList: tabList,
              tabListr: tabListr,
              currentTab: 1,
              currentContent:1,
          };
      },
      componentDidMount: function() {
         _this = this;
         setTimeout(function(){
           $(_this.refs.modal.getDOMNode()).hide();
           console.log('hide');
         },100);
         console.log('didMount');
         TodoActions.testAction();
      },
      dorpdownTab:function(tab,item){
          console.log('dropdown tab=',tab.id);
          this.setState({ currentTab: tab.id ,currentContent:item.id });

      },
      changeTab: function(tab) {
          console.log('tab=',tab.id);
          this.setState({ currentTab: tab.id ,currentContent:tab.id});
      },
      render: function() {
        return (
          <div className="App">          
            <nav id="header" className="navbar navbar-default navbar-fixed-top">
             <div class="container">
              <div class="navbar-header">
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
                      />
                </div>
              </div>
              </div></div>
          </nav>
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
      }
    });

   React.render(<App />,document.getElementById('content'));

</script>
</html>