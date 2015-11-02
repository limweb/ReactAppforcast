import Reflux from 'reflux';
import LoginActons from '../actions/loginaction';
import $ from  'jquery';

var LoginStore =  Reflux.createStore({
        "user":{ name:'',pass:'',type:''},
        listenables: [LoginActons],
        onGetLogin: function(item){
            // this.user = item;
            $.ajax({
                    url: 'http://127.0.0.1:8000/services/LoginService.php/login',
                    type: 'POST',
                    dataType: 'json',
                    data: {},
                    complete: function(xhr, textStatus) {
                      //called when complete
                      console.log('complete');
                    }.bind(this),
                    success: function(data, textStatus, xhr) {
                       console.log('data=',data);
                       this.user.name = data.name;
                       this.user.pass = data.email;
                       this.user.type = data.type;
                       this.user.img = data.img;
                       this.trigger(this.user);
                    }.bind(this),
                    error: function(xhr, textStatus, errorThrown) {
                      console.log('error');
                      alert('error');
                    }.bind(this)
            });

        },
        onChkUser:function(){
            return this.user;
        },
        onGetLogout: function(){
            console.log('logout');
            $.ajax({
                  url: 'http://127.0.0.1:8000/services/LoginService.php/logout',
                  type: 'POST',
                  dataType: 'json',
                  data: {},
                  complete: function(xhr, textStatus) {
                    //called when complete
                    console.log('complete');
                  }.bind(this),
                  success: function(data, textStatus, xhr) {
                    this.user = {name:'',pass:''};
                    this.trigger(this.user);
                    console.log("success",data);
                  }.bind(this),
                  error: function(xhr, textStatus, errorThrown) {
                    console.log('error',xhr,textStatus,errorThrown);
                    // alert('error');
                  }.bind(this)
          });
        }

});

export default LoginStore;