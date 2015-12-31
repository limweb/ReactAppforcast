import Reflux from 'reflux';
import LoginActons from '../actions/loginaction';
import $ from  'jquery';
import appcfg  from '../appcfg';

var LoginStore =  Reflux.createStore({
        "user":{name:'',type:'',email:'',img:'',pass:''},
        listenables: [LoginActons],
        onGetLogin: function(item){
            let _self = this;
            $.ajax({
                    url: appcfg.host + '/services/LoginService.php/login',
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify(item),
                    complete: function(xhr, textStatus) {
                      //called when complete
                      console.log('complete');
                    }.bind(_self),
                    success: function(data, textStatus, xhr) {
                       console.log('------------------------------data=',data);
                       _self.user = data.data;
                       // _self.user.name = data.name;
                       // _self.user.pass = data.email;
                       // _self.user.type = data.type;
                       // _self.user.img = data.img;
                       _self.trigger(_self.user);
                    }.bind(_self),
                    error: function(xhr, textStatus, errorThrown) {
                      console.log('error:',errorThrown);
                      alert('error:'+errorThrown);
                    }.bind(_self)
            });

        },
        onChkUser:function(){
        	let _self = this;
        	console.log('chkuser=',_self.user);
            _self.trigger(_self.user);
        },
        onGetLogout: function(){
          let _self = this;
            console.log('logout');
            $.ajax({
                  url: 'http://127.0.0.1:8000/services/LoginService.php/logout',
                  type: 'POST',
                  dataType: 'json',
                  data: {},
                  complete: function(xhr, textStatus) {
                    //called when complete
                    console.log('complete');
                  }.bind(_self),
                  success: function(data, textStatus, xhr) {
                    _self.user = {name:'',pass:''};
                    _self.trigger(_self.user);
                    console.log("success",data);
                  }.bind(_self),
                  error: function(xhr, textStatus, errorThrown) {
                    console.log('error',xhr,textStatus,errorThrown);
                    // alert('error');
                  }.bind(_self)
          });
        }

});

export default LoginStore;