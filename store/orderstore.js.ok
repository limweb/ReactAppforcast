import Reflux from 'reflux';
import OrderActons from '../actions/orderaction';
import $ from  'jquery';
import datasources  from '../components/configs'

var OrderStore = Reflux.createStore({
	"orders":[],
	listenables:[OrderActons],
	onGetOrders:function(){
		// $.ajax({
		// 	url: 'http://127.0.0.1:8000/services/LoginService.php/logout',
		// 	type: 'POST',
		// 	dataType: 'json',
		// 	data: {},
		// complete: function(xhr, textStatus) {
  //           //called when complete
  //           console.log('complete');
  //       }.bind(this),
  //       success: function(data, textStatus, xhr) {
  //       	this.trigger(this.orders);
  //       	console.log("success",data);
  //       }.bind(this),
  //       error: function(xhr, textStatus, errorThrown) {
  //       	console.log('error',xhr,textStatus,errorThrown);
  //       }.bind(this)
    // });	
           // this.orders = datasources.products;
           this.orders = datasources;
           console.log('orders=',this.orders);
           this.trigger(this.orders);
       },
       onUpdateOrder:function(orderitem){
       	return this.orders;
       },
       onAddOrder:function(orderitem){
       	return this.orders;
       },
       onDelOrder:function(idx){
       	return this.orders;
       },
   });

export default OrderStore;