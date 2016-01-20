'use strict';
import Reflux from 'reflux';
import $ from  'jquery';
import appcfg  from '../appcfg';
// import { UserinfoActions, UserinfoStore } from './store/userinfostore';
// mixins:[Reflux.listenTo(UserinfoStore,'onStore')],
// onStore:function(data) {
// 	 _self.setState({
//  	userinfo:data 
//   });
// },


var userinfoActions = Reflux.createActions([
	'getUserinfo',
	'updateUserinfo',
	'addUserinfo',
	'delUserinfo',
	]);

var userinfoStore = Reflux.createStore({
	userinfo:{},
	listenables:[userinfoActions],
	onGetUserinfo: function(){
		let _self = this;
		$.ajax({
			url: appcfg.host + '/services/LoginService.php/Userinfo',
			type: 'GET',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
			    _self.userinfo = data.data;
				_self.trigger(_self.userinfo);
				console.log("success",_self.userinfo);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});	
	},
});


module.exports = {
	UserinfoActions: userinfoActions,
	UserinfoStore: userinfoStore
}
