'use strict';
import Reflux from 'reflux';
import $ from  'jquery';
import appcfg  from '../appcfg';
// import { ProductActions, ProductStore } from './store/productstore';
// mixins:[Reflux.listenTo(ProductStore,'onStore')],
// onStore:function(data) {
// 	 _self.setState({
//  	product:data 
//   });
// },


var productActions = Reflux.createActions([
	'getProducts',
	'updateProduct',
	'addProduct',
	'delProduct',
	]);

var productStore = Reflux.createStore({
	products:[],
	listenables:[productActions],
	init() {
		let _self = this;
		console.log("init----------product store---");
    	_self.resetState();
    },
	resetState() {
		let _self = this;
		console.log('========= Reset State----------------');
		_self.setState(_self.getInitialState());
	},

	setState(state=undefined) {
		let _self = this;
		console.log('========= Set State----------------');
		if (state) {
			_self.state = state;
		}
		_self.trigger(_self.state);
	},
	getInitialState: function() {
		let _self = this;
		console.log("-----------------product store-----------------getInitState");
		return { products: _self.products };
	},
	onGetProducts:function(){
		let _self = this;
		console.log('product---store----getProducts---------------------->onGetProducts');
		$.ajax({
			url: appcfg.host + '/services/ProductService.php',
			type: 'GET',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
			    _self.products = data.data;
				_self.trigger(_self.products);
				console.log("success",_self.products);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});	
	},
	onUpdateProduct:function(data){
		let _self = this;
		$.ajax({
			url: appcfg.host + '/services/ProductService.php',
			type: 'PUT',
			dataType: 'json',
			data:  JSON.stringify(data),
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
				 productActions.getProducts();
				// _self.products = data.data;
				// _self.trigger(_self.products);
				console.log("success",_self.products);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});	
	},
	onAddProduct:function(data){
		let _self = this;
		$.ajax({
			url: appcfg.host + '/services/ProductService.php',
			type: 'POST',
			dataType: 'json',
			data: JSON.stringify(data),
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
				productActions.getProducts();
				// _self.products = data.data;
				// _self.trigger(_self.products);
				console.log("success",_self.products);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});			
	},
	onDelProduct:function(idx){
		let _self = this;
		$.ajax({
			url: appcfg.host + '/services/ProductService.php/'+idx,
			type: 'DELETE',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
				productActions.getProducts();
				// _self.products = data.data;
				// _self.trigger(_self.products);
				console.log("success",_self.products);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(_self)
		});				
	}
});


module.exports = {
	ProductActions: productActions,
	ProductStore: productStore
}
