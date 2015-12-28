'use strict';
import Reflux from 'reflux';
import $ from  'jquery';
import appcfg  from '../appcfg';
// import { SaleActions, SaleStore } from './store/salestore';
// mixins:[Reflux.listenTo(SaleStore,'onStore')],
// onStore:function(data) {
// 	 _self.setState({
//  	sale:data 
//   });
// },


var saleActions = Reflux.createActions([
	'getSales',
	'updateSale',
	'addSale',
	'delSale',
	'resetPass'
	]);

var saleStore = Reflux.createStore({
	sales:[],
	listenables:[saleActions],
	onGetSales:function(){
		let _self = this;
		$.ajax({
			url: appcfg.host + '/services/SaleService.php',
			type: 'GET',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
			    _self.sales = data.data;
				_self.trigger(_self.sales);
				console.log("success",_self.sales);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});	
	},
	onUpdateSale:function(data){
		let _self = this;
		$.ajax({
			url: appcfg.host + '/services/SaleService.php',
			type: 'PUT',
			dataType: 'json',
			data: JSON.stringify(data),
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
				// _self.trigger(_self.sales);
				saleActions.getSales();
				console.log("success",_self.sales);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});	
	},
	onAddSale:function(data){
		console.log('add Sale data = ',data);
		let _self = this;
		$.ajax({
			url: appcfg.host + '/services/SaleService.php',
			type: 'POST',
			dataType: 'json',
			data: JSON.stringify(data),
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),
			success: function(data, textStatus, xhr) {
				 saleActions.getSales();
				 _self.sales = data.data;
				_self.trigger(_self.sales);
				console.log("success",_self.sales);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});			
	},
	onDelSale:function(idx){
		let _self = this;
		$.ajax({
			url: appcfg.host + '/services/SaleService.php/'+idx,
			type: 'DELETE',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
				saleActions.getSales();
				_self.trigger(_self.sales);
				console.log("success",_self.sales);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});				
	},
	onResetPass:function(idx) {
		console.log('salestore on resetpass',idx);
		let _self = this;
		$.ajax({
			url: appcfg.host + '/services/SaleService.php/resetpass/'+idx,
			type: 'POST',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
				saleActions.getSales();
				_self.trigger(_self.sales);
				console.log("success",_self.sales);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)

		});
	}

  });

module.exports = {
	SaleActions: saleActions,
	SaleStore: saleStore
}
