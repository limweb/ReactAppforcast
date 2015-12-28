'use strict';
import Reflux from 'reflux';
import $ from  'jquery';
import appcfg  from '../appcfg';


var approveActions = Reflux.createActions([
	'getApproves',
	'updateApprove',
	'addApprove',
	'delApprove',
	]);

var approveStore = Reflux.createStore({
	approves:[],
	listenables:[approveActions],
	onGetApproves:function(){
		let _self = this;
		console.log('ApproveAction.getApproves');
		$.ajax({
			url: appcfg.host + '/services/ApproveService.php',
			type: 'GET',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
			    _self.approves = data.data;
				_self.trigger(_self.approves);
				console.log("success",_self.approves);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});	
	},
	onUpdateApprove:function(data){
		console.log("updatestore data=",data);
		let _self = this;
		$.ajax({
			url: appcfg.host + '/services/ApproveService.php',
			type: 'PUT',
			dataType: 'json',
			data: JSON.stringify(data),
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
				_self.trigger(_self.approves);
				console.log("success",_self.approves);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});	
	},
	onAddApprove:function(data){
		let _self = this;
		$.ajax({
			url: appcfg.host + '/services/ApproveService.php',
			type: 'POST',
			dataType: 'json',
			data: JSON.stringify(data),
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
				_self.approves = data;
				// _self.trigger(_self.approves);
				console.log("success",_self.approves);
				approveActions.getApproves();
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});			
	},
	onDelApprove:function(idx){
		let _self = this;
		$.ajax({
			url: appcfg.host + '/services/ApproveService.php/'+idx,
			type: 'DELETE',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
				 approveActions.getApproves();
				_self.trigger(_self.approves);
				console.log("success",approves);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});				
	}
});


module.exports = {
	ApproveActions: approveActions,
	ApproveStore: approveStore
}
