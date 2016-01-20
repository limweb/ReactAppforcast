'use strict';
import Reflux from 'reflux';
import $ from  'jquery';
import appcfg  from '../appcfg';

var changepassserviceActions = Reflux.createActions([
	'getChangePassServices',
	]);

var changepassserviceStore = Reflux.createStore({
	changepassservice:[],
	listenables:[changepassserviceActions],
	onGetChangePassServices:function(data){
		let _self = this;
		$.ajax({
			url: appcfg.host + '/services/LoginService.php/Changepass',
			type: 'POST',
			dataType: 'json',
			data: JSON.stringify(data),
			complete: function(xhr, textStatus) {
				console.log('complete');
			}.bind(_self),

			success: function(data, textStatus, xhr) {
			    _self.changepassservice = data.data;
				_self.trigger(_self.changepassservice);
				console.log("success",_self.changepassservice);
			}.bind(_self),

			error: function(xhr, textStatus, errorThrown) {
				if( xhr.responseText == undefined ){
					bootbox.alert('system Error !');
					console.log('system error');
				} else {
					var msg = JSON.parse(xhr.responseText);
					bootbox.alert(msg.data);
					console.log('error',xhr.responseText,textStatus,errorThrown);
				}
			}.bind(_self)
		});	
	},
});


module.exports = {
	ChangePassServiceActions: changepassserviceActions,
	ChangePassServiceStore: changepassserviceStore
}
