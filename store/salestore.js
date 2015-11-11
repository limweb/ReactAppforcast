'use strict';
import Reflux from 'reflux';
import $ from  'jquery';
import appcfg  from '../appcfg';
// import { SaleActions, SaleStore } from './store/salestore';
// mixins:[Reflux.listenTo(SaleStore,'onStore')],
// onStore:function(data) {
// 	 this.setState({
//  	sale:data 
//   });
// },


var saleActions = Reflux.createActions([
	'getSales',
	'updateSale',
	'addSale',
	'delSale',
	]);

var saleStore = Reflux.createStore({
	sales:[],
	listenables:[saleActions],
	onGetSales:function(){
		$.ajax({
			url: appcfg.host + '/services/SaleService.php',
			type: 'GET',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
			    this.sales = data.data;
				this.trigger(this.sales);
				console.log("success",this.sales);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});	
	},
	onUpdateSale:function(){
		$.ajax({
			url: appcfg.host + '/services/SaleService.php',
			type: 'PUT',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
				this.trigger(this.sales);
				console.log("success",this.sales);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});	
	},
	onAddSale:function(){
		$.ajax({
			url: appcfg.host + '/services/SaleService.php',
			type: 'POST',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
				this.trigger(this.sales);
				console.log("success",sales);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});			
	},
	onDelSale:function(idx){
		$.ajax({
			url: appcfg.host + '/services/SaleService.php/'+idx,
			type: 'DELETE',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
				this.trigger(this.sales);
				console.log("success",sales);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});				
	}
});


module.exports = {
	SaleActions: saleActions,
	SaleStore: saleStore
}
