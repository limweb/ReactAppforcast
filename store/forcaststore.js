'use strict';
import Reflux from 'reflux';
import $ from  'jquery';
import appcfg  from '../appcfg';

var ForcastActons = Reflux.createActions([
	'getForcasts',
	'updateForcast',
	'addForcast',
	'delForcast',
	]);

var ForcastStore = Reflux.createStore({
	"forcasts":[],
	listenables:[ForcastActons],
	onGetForcasts:function(){
		$.ajax({
			url: appcfg.host + '/services/ForcastService.php',
			type: 'POST',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
				this.trigger(this.forcasts);
				console.log("success",forcasts);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});	
	},
	onUpdateForcast:function(){
		$.ajax({
			url: appcfg.host + '/services/ForcastService.php',
			type: 'PUT',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
				this.trigger(this.forcasts);
				console.log("success",forcasts);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});	
	},
	onAddForcast:function(){
		$.ajax({
			url: appcfg.host + '/services/ForcastService.php',
			type: 'POST',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
				this.trigger(this.forcasts);
				console.log("success",forcasts);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});			
	},
	onDelForcast:function(idx){
		$.ajax({
			url: appcfg.host + '/services/ForcastService.php/'+idx,
			type: 'DELETE',
			dataType: 'json',
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(this),

			success: function(data, textStatus, xhr) {
				this.trigger(this.forcasts);
				console.log("success",forcasts);
			}.bind(this),

			error: function(xhr, textStatus, errorThrown) {
				console.log('error',xhr,textStatus,errorThrown);
			}.bind(this)
		});				
	}
});


module.exports = {
	ForcastActions: ForcastActions,
	ForcastStore: ForcastStore
}
