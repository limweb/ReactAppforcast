'use strict';
import Reflux from 'reflux';
import $ from  'jquery';
import appcfg  from '../appcfg';
// import { AppActions, AppStore } from './store/appstore';
// mixins:[Reflux.listenTo(AppStore,'onStore')],
// onStore:function(data) {
// 	 this.setState({
//  	app:data 
//   });
// },


var appActions = Reflux.createActions([
	'getConfig',
	'getApps',
	'updateApp',
	'addApp',
	'delApp',
	]);

var appStore = Reflux.createStore({
	apps:[],
	listenables:[appActions],
	onGetConfig:function(){
		let _this = this;
		console.log('Appstore----Action onGetConfig');
		$.ajax({
			url: appcfg.host + '/services/AppService.php/menu',
			type: 'GET',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				// console.log('complete');
			}.bind(_this),

			success: function(data, textStatus, xhr) {
			    _this.apps = data.data;
				console.log("success",_this.apps);
				_this.trigger(_this.apps);
			}.bind(_this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_this)
		});	
	},
	onGetApps:function(){
		$.ajax({
			url: appcfg.host + '/services/AppService.php',
			type: 'GET',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				// console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
			    this.apps = data.data;
				console.log("success",this.apps);
				this.trigger(this.apps);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});	
	},
	onUpdateApp:function(){
		$.ajax({
			url: appcfg.host + '/services/AppService.php',
			type: 'PUT',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
				this.trigger(this.apps);
				console.log("success",this.apps);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});	
	},
	onAddApp:function(){
		$.ajax({
			url: appcfg.host + '/services/AppService.php',
			type: 'POST',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
				this.trigger(this.apps);
				console.log("success",apps);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});			
	},
	onDelApp:function(idx){
		$.ajax({
			url: appcfg.host + '/services/AppService.php/'+idx,
			type: 'DELETE',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
				this.trigger(this.apps);
				console.log("success",apps);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});				
	}
});


module.exports = {
	AppActions: appActions,
	AppStore: appStore
}
