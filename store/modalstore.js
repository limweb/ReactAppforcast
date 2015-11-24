'use strict';
import Reflux from 'reflux';
import $ from  'jquery';
import appcfg  from '../appcfg';

var modalActions = Reflux.createActions([
  	'open', 
  	'close'
	]);

var modalStore = Reflux.createStore({
	  listenables:[modalActions],
	  onOpen: function (modal) {
	    
	    var title   = modal.title   || null
	    var content = modal.content || null
	    var buttons = modal.buttons || null
	  	
	    this.trigger({ action: 'open', title: title, content: content, buttons: buttons })
	  
	  },

	  onClose: function () {
	    this.trigger({ action: 'close' })
	  }

});


module.exports = {
	ModalActions: modalActions,
	ModalStore: modalStore
}


