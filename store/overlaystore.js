'use strict';
import Reflux from 'reflux';
import $ from  'jquery';
import appcfg  from '../appcfg';

// <Overlay ref="modal" id="overlay" />
// import { OverlayActions, OverlayStore } from './store/overlaystore';
// mixins:[Reflux.listenTo(OverlayStore,'onStore')],
  // onStore:function(data) {
  //   let _self = this;
  //   let modal = this.refs.modal;
  //   if(data.action == 'show') {
  //     console.log('inshow');
  //     $(ReactDOM.findDOMNode(modal)).show();
  //     if(data.time > 0 ) {
  //        setTimeout(function(){
  //           $(ReactDOM.findDOMNode(modal)).hide();
  //        },data.time);
  //     }
  //   } else {
  //           $(ReactDOM.findDOMNode(modal)).hide();
  //   }
  // },

var overlayActions = Reflux.createActions([
	'showProgress',
	'hideProgress',
	]);

var overlayStore = Reflux.createStore({
	listenables:[overlayActions],
	onShowProgress:function(time){
		console.log('actionshow');
		this.trigger({ action: 'show',time:time})
		setTimeout(function(){
           overlayActions.hideProgress();
     	},5000);
	},	
	onHideProgress:function(){
		console.log('actionhide');
		this.trigger({ action: 'hide' })
	},
});

module.exports = {
	OverlayActions: overlayActions,
	OverlayStore: overlayStore
}
