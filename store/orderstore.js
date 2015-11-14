'use strict';
import Reflux from 'reflux';
import $ from  'jquery';
import appcfg  from '../appcfg';
// import { OrderActions, OrderStore } from './store/orderstore';
// mixins:[Reflux.listenTo(OrderStore,'onStore')],
// onStore:function(data) {
// 	 this.setState({
//  	order:data 
//   });
// },


var orderActions = Reflux.createActions([
	'getOrders',
	'updateOrder',
	'addOrder',
	'delOrder',
	]);

var orderStore = Reflux.createStore({
	orders:[],
	listenables:[orderActions],
	onGetOrders:function(){
		$.ajax({
			url: appcfg.host + '/services/OrderService.php',
			type: 'GET',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
			    this.orders = data.data;
				this.trigger(this.orders);
				console.log("success",this.orders);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});	
	},
	onUpdateOrder:function(data){
		console.log('orderstore updateOrder ----------------------------->',data);
		$.ajax({
			url: appcfg.host + '/services/OrderService.php',
			type: 'PUT',
			dataType: 'json',
			data: JSON.stringify(data),
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
				this.trigger(this.orders);
				console.log("success",this.orders);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});	
	},
	onAddOrder:function(){
		$.ajax({
			url: appcfg.host + '/services/OrderService.php',
			type: 'POST',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
				this.trigger(this.orders);
				console.log("success",orders);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});			
	},
	onDelOrder:function(idx){
		$.ajax({
			url: appcfg.host + '/services/OrderService.php/'+idx,
			type: 'DELETE',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
				this.trigger(this.orders);
				console.log("success",orders);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});				
	}
});


module.exports = {
	OrderActions: orderActions,
	OrderStore: orderStore
}
