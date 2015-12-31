'use strict';
import Reflux from 'reflux';
import $ from  'jquery';
import appcfg  from '../appcfg';

var forcastActions = Reflux.createActions([
	'getForcasts',
	'updateForcast',
	'getForcatbySaleAndMonth',
	// 'addForcast',
	// 'delForcast',
	]);

var forcastStore = Reflux.createStore({
	"forcasts":[],
	listenables:[forcastActions],
	onGetForcatbySaleAndMonth: function(data){
		let _self = this;
		console.log('--------------------------- get forcat by Saleid and Month slug --------');
		// http://127.0.0.1:8000/services/ForcastService.php/ForcastbySaleandMonth
		$.ajax({
			url: appcfg.host + '/services/ForcastService.php/ForcastbySaleandMonth',
			type: 'POST',
			dataType: 'json',
			data: JSON.stringify(data),
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
				_self.forcasts = data.data;
				_self.trigger(_self.forcasts);
				console.log("success",_self.forcasts);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});
	},
	onGetForcasts: function(){
		let _self = this;
		console.log('-------------------------------get forcast ------------------------------------');
		$.ajax({
			url: appcfg.host + '/services/ForcastService.php',
			type: 'GET',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
				_self.forcasts = data.data;
				_self.trigger(_self.forcasts);
				console.log("success",_self.forcasts);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});	
	},
	onUpdateForcast:function(data){
		let _self = this;
		$.ajax({
			url: appcfg.host + '/services/ForcastService.php',
			type: 'PUT',
			dataType: 'json',
			data: JSON.stringify(data),
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
				_self.trigger(_self.forcasts);
				console.log("success",_self.forcasts);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
				_self.forcasts = [];
				_self.trigger(_self.forcasts);
				if( xhr.responseText == undefined ){
					bootbox.alert('system Error !');
				} else {
					bootbox.alert(xhr.responseText);
				}
			}.bind(_self)
		});	
	},
	onAddForcast:function(){
		let _self = this;
		$.ajax({
			url: appcfg.host + '/services/ForcastService.php',
			type: 'POST',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
				_self.trigger(_self.forcasts);
				console.log("success",forcasts);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});			
	},
	onDelForcast:function(idx){
		let _self = this;
		$.ajax({
			url: appcfg.host + '/services/ForcastService.php/'+idx,
			type: 'DELETE',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
				_self.trigger(_self.forcasts);
				console.log("success",forcasts);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});				
	}
});


module.exports = {
	ForcastActions: forcastActions,
	ForcastStore: forcastStore
}
