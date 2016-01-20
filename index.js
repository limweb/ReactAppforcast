import React from 'react';
import ReactDOM from 'react-dom';
import Reflux  from 'reflux';
import Order  from './components/order/order';
import Approve from './components/approve/approve';
// import Sale  from './components/sale';
import Sale  from './components/sale/sale';
// import Product  from './components/product';
import Product  from './components/product/product';
import Forcast  from './components/forcast/forcast';
import Forcastcust  from './components/forcast_cust/forcastcus';
import Report  from './components/reports';
import ContelItem  from './components/contentitem';
import Setting from './components/setting';
import Login from './components/login';
import LoginActons  from './actions/loginaction';
import LoginStore from './store/loginstore';
import appcfg from './appcfg';

import { AppActions, AppStore } from './store/appstore';

import { Mike,Overlay,Footer,Raph,Donnie }  from './components/common';
import $ from 'jquery';
import Modal  from './components/modal';
import Trigger  from './components/trigger';
import { OverlayActions, OverlayStore } from './store/overlaystore';
import { ChangePassServiceActions, ChangePassServiceStore } from './store/changepassstore';
import { UserinfoActions, UserinfoStore } from './store/userinfostore';
 
    var DropdownItem = React.createClass({
      handleClick: function(e,f){
       let _self = this;
        this.props.handleClick(e);
      }, 
      render: function() {
        let _self = this;
        var tab = this.props.tab;
        var i = '';
        if(tab){

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
      } else {
        return (<ul></ul>);
      }
      }
    });

    var Dropdown = React.createClass({
      handleClick: function(item){
        this.props.handleClick(item);
      },    
      render: function() {
        let _self = this;
        var dwl = _self.props.dropdownlist
        console.log('dwl==================>',_self.props);
        var i = '';
        if(_self.props.i != undefined ){
           i = _self.props.i;
        }
        return (
                <li className={_self.props.isCurrent ? _self.props.c+' active dropdown' : _self.props.c + ' dropdown' } >
                  <a href="#" className="dropdown-toggle"  data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                   <i className={i}> </i>&nbsp; 
                   {_self.props.name} <span className="caret"></span>
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
        // console.log('y/n=',$(".navbar-toggle").attr("aria-expanded"));
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
      getDefaultProps: function() {
        return {
          tabList: [],
        };
      },
      handleClick: function(tab){
          this.props.changeTab(tab);
      },    
      render: function() {
        let _self = this;
        // console.log('LNAV=',_self.props.tabList);
        if(_self.props.tabList) {
        return (
            <div>
              <ul className="nav navbar-nav">
                 { 

                  _self.props.tabList.map(function(tab) { 
                    // console.log('tab=',tab);
                    if(tab.type == 'tab'){
                        // console.log('tab.id=',tab.id);
                        return (<Tab handleClick={_self.handleClick.bind(_self, tab)}
                                      key={tab.id}
                                      url={tab.url}
                                      name={tab.name}
                                      c = {tab.class}
                                      i = {tab.i}
                                      isCurrent={(_self.props.currentTab === tab.id)}
                            />)
                    } else {
                          return (<Dropdown handleClick={_self.handleClick}
                                        key={tab.id}
                                        url={tab.url}
                                        name={tab.name}
                                        dropdownlist={tab.dorpdownlist}
                                        c = {tab.class}
                                        i = {tab.i}
                                        isCurrent={(_self.props.currentTab === tab.id)}
                          />)
                    }
                 }.bind(_self))

               }
              </ul>            
            </div>
        ); // return
        } else {
          return (<div></div>);  
        }

      } // render 

    });

    var RNav = React.createClass({
     handleClick: function(tab){
          if(tab.id === 12 ){
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
        if(_self.props.tabList) {

        return (
            <div>
              <ul className="nav navbar-nav navbar-right">
                 { this.props.tabList.map(function(tab) { 
                    console.log('tab====================',tab.type);
                    if(tab.type == 'tab'){
                       return (<Tab handleClick={_self.handleClick.bind(_self, tab)}
                                    key={tab.id}
                                    url={tab.url}
                                    name={tab.name}
                                    c = {tab.class}
                                    i = {tab.i}
                                    isCurrent={(_self.props.currentTab === tab.id)}
                          />);
                     } else {
                      console.log(tab);
                      return (<Dropdown handleClick={_self.drowdownClick.bind(_self,tab)}
                                    key={tab.id}
                                    url={tab.url}
                                    name={tab.name}
                                    dropdownlist={tab.dorpdownlist}
                                    c = {tab.class}
                                    i = {tab.i}
                                    isCurrent={(_self.props.currentTab === tab.id)}
                      />);
                     }
                 }.bind(_self))}
                {_self.props.children}           
              </ul> 
            </div>
        );
      } else {
        return (<div></div>);
      }
      }
    });

    var Brand = React.createClass({
      Alertfnc:function(){
        // alert('ForcastApp');
        // console.log('ForcastApp');
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

    var UserBrand = React.createClass({
      logout: function(){
          LoginActons.getLogout();
          // this.props.changeTab();
      },
      changpass: function(){
          bootbox.dialog({
                          title: "Change Password.",
                          message: 
'<div class="row"> '+
'     <div class="col-md-12"> '+
'          <form class="form-horizontal"> '+
'               <div class="form-group"> '+
'                    <label class="col-md-4 control-label" for="name">Old Password</label> '+
'                    <div class="col-md-4"> '+
'                         <input id="oldpass" name="oldpass" type="text" placeholder="Old password" class="form-control input-md"> '+
'                    </div> '+
'               </div> '+
'               <div class="form-group"> '+
'                    <label class="col-md-4 control-label" for="awesomeness">New Password</label> '+
'                    <div class="col-md-4">  '+
'                         <input id="newpass" name="newpass" type="text" placeholder="New Password" class="form-control input-md"> '+
'                    </div>  '+
'               </div> '+
'          </form>  '+
'     </div>   '+
'</div> ',
                          buttons: {
                              cancel: {
                                  label: "Cancel",
                                  className: "btn-default",
                                  callback: function() {
                                    console.log('click cancel');
                                  }
                              },
                              success: {
                                  label: "Change",
                                  className: "btn-success",
                                  callback: function () {
                                      var oldpass = $('#oldpass').val();
                                      var newpass = $('#newpass').val();
                                      console.log('ok pass is=',oldpass,'/',newpass);
                                      let data = {
                                          "oldpass": oldpass,
                                          "newpass": newpass,
                                      }
                                      ChangePassServiceActions.getChangePassServices(data);
                                  }
                              },
                          }
                      }
                  );
      },
      account: function(){
          // LoginActons.chkUser();
          UserinfoActions.getUserinfo();
      },
      render: function() {
        // console.log('userbrand=',this.props);
        if(this.props.user.name == '') {
           this.props.user.name = 'UserName';
        }

        return (<ul className="nav navbar-nav navbar-right userbrand">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle profile-image" data-toggle="dropdown">
                        <div className="userinfo" >
                          <img width="30px" height="30px" src={ this.props.user.img ? this.props.user.img : 'images/avatar.png' } className="img-circle special-img" />
                          <span>&nbsp;&nbsp;{this.props.user.name}</span>
                          <b className="caret"></b>
                        </div>
                  </a>
                  <ul className="dropdown-menu">
                      <li><a onClick={this.account} href="#"><i className="fa fa-cog"></i> Account</a></li>
                      <li><a onClick={this.changpass} href="#"><i className="fa fa-cog"></i> ChangePassword</a></li>
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
            let _this = this;
            // console.log('current tab =',this.props.currentTab);
            // console.log('***********************************props in Content = ',_this.props);
                return(
                        <div className="tab-content">
                            { this.props.currentTab === 1   ? <Order  className="tab-pane" />  :null}
                            { this.props.currentTab === 2   ? <Approve    className="tab-pane" />  :null}
                            { this.props.currentTab === 3   ? <Sale       className="tab-pane" />  :null}
                            { this.props.currentTab === 4   ? <Product    className="tab-pane" />  :null}
                            { this.props.currentTab === 5   ? <Forcast    className="tab-pane" />  :null}
                            { this.props.currentTab === 16  ? <Forcastcust    className="tab-pane" />  :null}
                            { this.props.currentTab === 6   ? <ContelItem className="tab-pane" id="home1"       text="Home"/>:null }
                            { this.props.currentTab === 10  ? <ContelItem className="tab-pane" id="home2"       text="Home"/>:null }
                            { this.props.currentTab === 11  ? <ContelItem className="tab-pane" id="home3"       text="Home"/>:null }
                            { this.props.currentTab === 13  ? <ContelItem className="tab-pane" id="home5"       text="Home"/>:null }
                            { this.props.currentTab === 14  ? <ContelItem className="tab-pane" id="messages"    text="Message" />:null }
                            { this.props.currentTab === 15  ? <ContelItem className="tab-pane" id="profile"     text="Profile" />:null }
                            { this.props.currentTab === 17  ? <ContelItem className="tab-pane" id="settings"    text="Setting" />:null }
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
      mixins:[  
            Reflux.listenTo(LoginStore,'onStore'),
            Reflux.listenTo(AppStore,'onConfig'),
            Reflux.listenTo(OverlayStore,'onOverlay'),
            Reflux.listenTo(ChangePassServiceStore,'onChangePassStore'),
            Reflux.listenTo(UserinfoStore,'onUnserinfoStore'),
          ],
      onUnserinfoStore: function(data){
            let _self = this;
            _self.setState({
                userinfo:data 
            });
              let msg = 'Email: ' +data.email +'<br/> Name: '+ data.name + '<br /> Level: ' + data.level + '<br/> Type: '+ data.type ;
              bootbox.dialog({
                message: msg ,
                title: "User Infomation:",
                buttons: {
                  success: {
                    label: "OK",
                    className: "btn-success"
                  },
                }
              });
      },
      onChangePassStore: function(data){
            let _self = this;
            _self.setState({
                changepassservice:data 
            });
            bootbox.alert('Change pass Successed.');
      },
      onOverlay: function(data) {
        let _self = this;
        let modal = this.refs.modal;
        if(data.action == 'show') {
          // console.log('inshow');
          $(ReactDOM.findDOMNode(modal)).show();
          if(data.time > 0 ) {
             setTimeout(function(){
                $(ReactDOM.findDOMNode(modal)).hide();
             },data.time);
          }
        } else {
                $(ReactDOM.findDOMNode(modal)).hide();
        }
      },
      onConfig:function(data) {
        // console.log('---onConfig=',data,'---------------------------------------');
        this.setState({
           tabList: data.tabList,
           tabListr: data.tabListr,
           currentTab: data.tabList[0].id,
           currentContent: data.tabList[0].id,
         });
      },
      getInitialState: function () {   
          OverlayActions.showProgress(3000);     
          return {
              app:null,
              tabList: null,
              tabListr: null,
              currentTab: null,
              currentContent:null,
              loginted:1,
              datasources:null,
              user:{
               name:'',
               type:'',
               email:'',
               img:''
              }
          };
      },
      onStore:function(data) {
         console.log(' ======================================== onStore data=',data);
         AppActions.getConfig();
         this.setState({user:data});
         window.user = data;
      },
      componentDidMount: function() {
         // console.log('didMount');
         let _this = this;
         setTimeout(function(){
           $(_this.refs.model).hide();
           // $(ReactDOM.findDOMNode(_this.refs.modal)).hide();
           // console.log('hide');
         },1000);
         
      },
      componentWillMount() {
         // console.log('winmonth');
         let _this = this;
         $.ajax({
           url:  appcfg.host + '/services/LoginService.php/chklogin',
           type: 'POST',
           dataType: 'json',
           data: {},
         })
         .done(function(data) {
           console.log("----------success",data);
           _this.state.user.name = data.data.name;
           _this.state.user.type = data.data.type;
           _this.state.user.email = data.data.email;
           _this.state.user.img = data.data.img;
           _this.setState({user:_this.state.user});
           AppActions.getConfig();
         })
         .fail(function() {
           // console.log("error");
         })
         .always(function() {
           // console.log("complete");
         });
      },
      componentDidUpdate: function(prevProps, prevState) {
         // console.log('update');
         let _this = this;
         setTimeout(function(){
           // $(ReactDOM.findDOMNode(_this.refs.modal)).hide();
           $(_this.refs.model).hide();
           // console.log('hide');
         },1000);
      },
      dorpdownTab:function(tab,item){
          // console.log('dropdown tab=',tab.id);
          this.setState({ currentTab: tab.id ,currentContent:item.id });

      },
      changeTab: function(tab) {
          // console.log('tab=',tab.id);
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
                     <UserBrand changeTab={this.changeTab}  {...this.state} />
                    </RNav>
                </div>
              </div>
          </nav>
              </div>
              </div>
          <div id="wrapper">
            <div id="main-wrapper" className="col-md-12 pull-right">
            <div id="main">
            <Content datasources={this.state.datasources} currentTab={this.state.currentContent} />
          </div>        
          </div>        
          </div>        
			<Footer  />
          <Overlay id="overlay" test={this} ref='modal' />
        </div>
        );
      },
      render: function() {
        // console.log('thisstate=',this.state);
        // console.log('currentTab  = 12 y/n =',this.state);
        // return  this.renderMain();          
        if(this.state.user.name != ''){
          // console.log('main')
          return  this.renderMain();          
        } else {
          // console.log('login')
          return  this.renderLogin();
        }
      }
    });

    var Apptest = React.createClass({
      mixins:[Reflux.listenTo(OverlayStore,'onStore')],
      onStore:function(data) {
        let _self = this;
        let modal = this.refs.modal;
        if(data.action == 'show') {
          // console.log('inshow');
          $(ReactDOM.findDOMNode(modal)).show();
          if(data.time > 0 ) {
             setTimeout(function(){
                $(ReactDOM.findDOMNode(modal)).hide();
             },data.time);
          }
        } else {
                $(ReactDOM.findDOMNode(modal)).hide();
        }
      },
    	render: function() {
    		return (
    			<div className="Apptest">
          <h1>test</h1>
          <Modal />
          <Trigger />
          <Overlay ref="modal" id="overlay" />
          </div>
    		);
    	}
    });

ReactDOM.render(<App />,document.getElementById('content'));
// ReactDOM.render(<Apptest />,document.getElementById('content'));

