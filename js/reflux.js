var TodoActions = Reflux.createActions([
    'getAll',
    'testAction',
    'overLay'
]);


var TodoStore = Reflux.createStore({
    items: [1,2,3],
    'test':0,
    listenables: [TodoActions],
    onGetAll: function () {
        this.trigger(this.items);
        console.log('todostore');
        alert('todostore');
    },
    onTestAction: function(){
        // alert('testAction');
        this.test++; 
        console.log('testAction',this.test);
    },
    onOverLay:function(){
        $('#overlay').show();
        setTimeout(function(){
        $('#overlay').hide();
           console.log('hide');
         },5000);
    }
});

var LoginActons = Reflux.createActions([
        'getLogin',
        'getLogout',
        'forgotPass',
        'changePass',
        'chkUser',
    ]);

            // name:'',
            // type:'user'
var LoginStore =  Reflux.createStore({
        "user":{ name:'',pass:'',type:''},
        listenables: [LoginActons],
        onGetLogin: function(item){
            // this.user = item;
            $.ajax({
                    url: 'http://127.0.0.1:3000/service.php',
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
            this.user = {name:'',pass:''};
            this.trigger(this.user);
        }

});

