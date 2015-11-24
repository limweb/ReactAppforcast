'use strict';
import Reflux from 'reflux';
import $ from  'jquery';
import appcfg  from '../appcfg';
// import { ProductActions, ProductStore } from './store/productstore';
// mixins:[Reflux.listenTo(ProductStore,'onStore')],
// onStore:function(data) {
// 	 this.setState({
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
		console.log("init----------product store---");
    	this.resetState();
    },
	resetState() {
		console.log('========= Reset State----------------');
		this.setState(this.getInitialState());
	},

	setState(state=undefined) {
		console.log('========= Set State----------------');
		if (state) {
			this.state = state;
		}
		this.trigger(this.state);
	},
	getInitialState: function() {
		let _self = this;
		console.log("-----------------product store-----------------getInitState");
		return { products: _self.products };
	},
	onGetProducts:function(){
		console.log('product---store----getProducts---------------------->onGetProducts');
		$.ajax({
			url: appcfg.host + '/services/ProductService.php',
			type: 'GET',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
			    this.products = data.data;
				this.trigger(this.products);
				console.log("success",this.products);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});	
	},
	onUpdateProduct:function(data){
		$.ajax({
			url: appcfg.host + '/services/ProductService.php',
			type: 'PUT',
			dataType: 'json',
			data:  JSON.stringify(data),
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
				this.trigger(this.products);
				console.log("success",this.products);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});	
	},
	onAddProduct:function(){
		$.ajax({
			url: appcfg.host + '/services/ProductService.php',
			type: 'POST',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
				this.trigger(this.products);
				console.log("success",products);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});			
	},
	onDelProduct:function(idx){
		$.ajax({
			url: appcfg.host + '/services/ProductService.php/'+idx,
			type: 'DELETE',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
				this.trigger(this.products);
				console.log("success",products);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});				
	}
});


module.exports = {
	ProductActions: productActions,
	ProductStore: productStore
}
