import React  from 'react';
import { ModalActions, ModalStore } from './../store/modalstore';
import Reflux from 'reflux';
import { OverlayActions, OverlayStore } from './../store/overlaystore';


var Triggers = React.createClass({
  handleBasicModal: function (e) {
    e.preventDefault()
    ModalActions.open({content: 'Just a basic notification here' ,title:'testModal'})
    OverlayActions.showProgress(0);
  },
   handleKitchenSinkModal: function (e) {
    e.preventDefault()
    
    var testCallBack = function () {
      console.log('Callback recieved')
         ModalActions.close() 
      }
       
    var _modal = {
      title: "I'm a title!"
      , content: <article><p>In tempor dolor ante, et tempus tellus varius nec. Donec eget orci a nibh facilisis iaculis. Nunc vel erat at turpis luctus suscipit a ut tortor. Duis volutpat dolor vel erat dapibus interdum. In at porta orci, vitae tristique nunc. Sed at interdum odio. Pellentesque dapibus tempor diam, id pellentesque arcu efficitur ut. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis turpis dolor, malesuada nec libero at, ullamcorper elementum risus.</p></article>
      , buttons: [
        {
          type: 'primary',
          text: 'Got it!',
          callBack: testCallBack
        }
      ]
    }

    ModalActions.open(_modal)
  },
  
  render: function () {
    return (
      <div>
        <button onClick={this.handleBasicModal} className='btn-primary'>Basic Modal</button>
        <button onClick={this.handleKitchenSinkModal} className='btn-primary'>Kitchen Sink Modal</button>
      </div>
    )
  }
})


export default Triggers;