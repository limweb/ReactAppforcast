'use strict';
import Reflux from 'reflux';
import $ from  'jquery';
import appcfg  from '../appcfg';
// import { TestActions, TestStore } from './store/teststore';
// mixins:[Reflux.listenTo(TestStore,'onStore')],
// onStore:function(data) {
// 	 _self.setState({
//  	test:data 
//   });
// },


var testActions = Reflux.createActions([
	'getTests',
	'updateTest',
	'addTest',
	'delTest',
	]);

var testStore = Reflux.createStore({
	tests:[],
	listenables:[testActions],
	onGetTests:function(){
		let _self = this;
		// $.ajax({
		// 	url: appcfg.host + '/services/TestService.php',
		// 	type: 'GET',
		// 	dataType: 'json',
		// 	complete: function(xhr, textStatus) {
		// 		console.log('complete');
		// 	}.bind(_self),

		// 	success: function(data, textStatus, xhr) {
			    // _self.tests = data.data;
			    _self.tests = {a:1};
				_self.trigger(_self.tests);
		// 	}.bind(_self),

		// 	error: function(xhr, textStatus, errorThrown) {
		// 		console.log('error',xhr,textStatus,errorThrown);
		// 	}.bind(_self)
		// });	
	},
	onUpdateTest:function(){
		let _self = this;
		// $.ajax({
		// 	url: appcfg.host + '/services/TestService.php',
		// 	type: 'PUT',
		// 	dataType: 'json',
		// 	complete: function(xhr, textStatus) {
		// 		console.log('complete');
		// 	}.bind(_self),

		// 	success: function(data, textStatus, xhr) {
			    _self.tests = {a:2};
				_self.trigger(_self.tests);
		// 	}.bind(_self),

		// 	error: function(xhr, textStatus, errorThrown) {
		// 		console.log('error',xhr,textStatus,errorThrown);
		// 	}.bind(_self)
		// });	
	},
	onAddTest:function(){
		let _self = this;
		// $.ajax({
		// 	url: appcfg.host + '/services/TestService.php',
		// 	type: 'POST',
		// 	dataType: 'json',
		// 	complete: function(xhr, textStatus) {
		// 		console.log('complete');
		// 	}.bind(_self),

		// 	success: function(data, textStatus, xhr) {
			    _self.tests = {a:3};
				_self.trigger(_self.tests);
		// 	}.bind(_self),

		// 	error: function(xhr, textStatus, errorThrown) {
		// 		console.log('error',xhr,textStatus,errorThrown);
		// 	}.bind(_self)
		// });			
	},
	onDelTest:function(idx){
		let _self = this;
		// $.ajax({
		// 	url: appcfg.host + '/services/TestService.php/'+idx,
		// 	type: 'DELETE',
		// 	dataType: 'json',
		// 	complete: function(xhr, textStatus) {
		// 		console.log('complete');
		// 	}.bind(_self),

		// 	success: function(data, textStatus, xhr) {
			    _self.tests = {a:4};
				_self.trigger(_self.tests);
		// 	}.bind(_self),

		// 	error: function(xhr, textStatus, errorThrown) {
		// 		console.log('error',xhr,textStatus,errorThrown);
		// 	}.bind(_self)
		// });				
	}
});


module.exports = {
	TestActions: testActions,
	TestStore: testStore
}

