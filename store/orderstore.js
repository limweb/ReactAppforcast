'use strict';
import Reflux from 'reflux';
import $ from  'jquery';
import appcfg  from '../appcfg';
// import { OrderActions, OrderStore } from './store/orderstore';
// mixins:[Reflux.listenTo(OrderStore,'onStore')],
// onStore:function(data) {
// 	 _self.setState({
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
		let _self = this;
		$.ajax({
			url: appcfg.host + '/services/OrderService.php',
			type: 'GET',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
			    _self.orders = data.data;
				_self.trigger(_self.orders);
				console.log("success",_self.orders);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});	
	},
	onUpdateOrder:function(data){
		let _self = this;
		console.log('orderstore updateOrder ----------------------------->',data);
		$.ajax({
			url: appcfg.host + '/services/OrderService.php',
			type: 'PUT',
			dataType: 'json',
			data: JSON.stringify(data),
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
				_self.trigger(_self.orders);
				console.log("success",_self.orders);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});	
	},
	onAddOrder:function(data){
		let _self = this;
		console.log("---------------Add Order Ajax-----");
		$.ajax({
			url: appcfg.host + '/services/OrderService.php',
			type: 'POST',
			dataType: 'json',
			data: JSON.stringify(data),
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
				_self.orders = data.data;
				// _self.trigger(_self.orders);
				console.log("success",_self.orders);
				orderActions.getOrders();
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});			
	},
	onDelOrder:function(idx){
		let _self = this;
		$.ajax({
			url: appcfg.host + '/services/OrderService.php/'+idx,
			type: 'DELETE',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
				_self.orders = data;
				_self.trigger(_self.orders);
				console.log("success",_self.orders);
				orderActions.getOrders();
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});				
	}
});


module.exports = {
	OrderActions: orderActions,
	OrderStore: orderStore
}
