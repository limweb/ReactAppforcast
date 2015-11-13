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
		console.log('ApproveAction.getApproves');
		$.ajax({
			url: appcfg.host + '/services/ApproveService.php',
			type: 'GET',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
			    this.approves = data.data;
				this.trigger(this.approves);
				console.log("success",this.approves);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});	
	},
	onUpdateApprove:function(){
		$.ajax({
			url: appcfg.host + '/services/ApproveService.php',
			type: 'PUT',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
				this.trigger(this.approves);
				console.log("success",this.approves);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});	
	},
	onAddApprove:function(){
		$.ajax({
			url: appcfg.host + '/services/ApproveService.php',
			type: 'POST',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
				this.trigger(this.approves);
				console.log("success",approves);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});			
	},
	onDelApprove:function(idx){
		$.ajax({
			url: appcfg.host + '/services/ApproveService.php/'+idx,
			type: 'DELETE',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
				this.trigger(this.approves);
				console.log("success",approves);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});				
	}
});


module.exports = {
	ApproveActions: approveActions,
	ApproveStore: approveStore
}
