import Reflux from 'reflux';

var OrderActons = Reflux.createActions([
        'getOrders',
        'updateOrder',
        'addOrder',
        'delOrder',
    ]);

export default OrderActons;