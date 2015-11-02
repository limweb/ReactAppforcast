import React from 'react';
import ReactDOM from 'react-dom';
import Reflux  from 'reflux';
import Order from './components/order';
import Approve from './components/approve';
import Sale  from './components/sale';
import Product  from './components/product';
import Forcast  from './components/forcast';
import Report  from './components/reports';
import ContelItem  from './components/contentitem';
import Setting from './components/setting';
import Login from './components/login';
import LoginActons  from './actions/loginaction';
import LoginStore from './store/loginstore';
import { Mike,Overlay,Footer,Raph,Donnie }  from './components/common';
import $ from 'jquery';




var tabList = [
        { 'id': 1, 'name': 'Order',    'url': '#' , 'i':'glyphicon glyphicon-apple'   ,'type':'tab'},
        { 'id': 2, 'name': 'Approve',  'url': '#' , 'i':'glyphicon glyphicon-bitcoin'   ,'type':'tab'},
        { 'id': 3, 'name': 'Sale',     'url': '#' , 'i':'glyphicon glyphicon-lamp'   ,'type':'tab'},
        { 'id': 4, 'name': 'Product',  'url': '#' , 'i':'glyphicon glyphicon-yen'   ,'type':'tab'},
        { 'id': 5, 'name': 'Forcast',  'url': '#' , 'i':'glyphicon glyphicon-grain'   ,'type':'tab'},
        { 'id': 6, 'name': 'Reports',  'url': '#' , 'i':'glyphicon glyphicon-sunglasses'   ,'type':'tab'},
    ];

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
  
    var DropdownItem = React.createClass({
      handleClick: function(e,f){
       let _self = this;
        this.props.handleClick(e);
      }, 
      render: function() {
        let _self = this;
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
        let _self = this;
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
        let _self = this;
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
        let _self = this;
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
                          <img width="30px" height="30px" src={ this.props.user.img ? this.props.user.img : 'images/30x30.png' } className="img-circle special-img" /> &nbsp;{this.props.user.name}<b className="caret"></b>&nbsp;&nbsp;
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
               name:'',
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
         console.log('didMount');
         let _this = this;
         setTimeout(function(){
           $(ReactDOM.findDOMNode(_this.refs.modal)).hide();
           console.log('hide');
         },1000);
         
      },
      componentWillMount() {
         console.log('winmonth');
         let _this = this;
         $.ajax({
           url: 'http://127.0.0.1:8000/services/LoginService.php/chklogin',
           type: 'POST',
           dataType: 'json',
           data: {},
         })
         .done(function(data) {
           console.log("success",data);
           _this.state.user.name = data.data.name;
           _this.state.user.type = data.data.type;
           _this.state.user.email = data.data.email;
           _this.state.user.img = data.data.img;
           _this.setState({user:_this.state.user});
         })
         .fail(function() {
           console.log("error");
         })
         .always(function() {
           console.log("complete");
         });
      },
      componentDidUpdate: function(prevProps, prevState) {
         console.log('update');
         let _this = this;
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

    var Apptest = React.createClass({
    	render: function() {
    		return (
    			<div className="Apptest"><h1>test</h1></div>
    		);
    	}
    });

ReactDOM.render(<App />,document.getElementById('content'));

