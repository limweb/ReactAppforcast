var ReactTransitionGroup = React.addons.TransitionGroup;
var CSSTransitionGroup   = React.addons.CSSTransitionGroup;
var Router = ReactRouter;
var Route  = Router.Route, DefaultRoute = Router.DefaultRoute,
             Link=Router.Link, RouteHandler = Router.RouteHandler;
var Lifecycl = Router.Lifecycl;
var RouteContext  = Router.RouteContext ;

var Home = React.createClass({
    render: function() {
        return (
            <div className="App"><h1>Home</h1></div>
        );
    }
});

var About = React.createClass({
  render: function() {
    return (
      <div className="About"><h1>About</h1></div>
    );
  }
});

var Page1 = React.createClass({
  render: function () {
    return (
      <div className='page page1'>
        <h1>Page 1</h1>
      </div> 
    );
  }
});


var Page2 = React.createClass({
  render: function () {
    return (
      <div className='page page2'>
        <h1>Page 2</h1><Link to="view1">View1 link</Link>
      </div> 
    );
  }
});

var Page3 = React.createClass({
  mixins: [ReactRouter.Navigation],
  goBackHandle:function(){
      this.goBack();
  },
  render: function() {
    return (
      <div className="Page3"> <h1 onClick={this.goBackHandle}>Page 3 GoBack</h1></div>
    );
  }
});

var PageNotFound = React.createClass({
    render: function() {
        return (
            <div className="PageNotFound">
                    <h1>PageNotFound</h1>
            </div>
        );
    }
});

var User = React.createClass({
  getInitialState: function() {
    return {
      user:{ 
          name:'',
          email:''
      } 
    };
  },
  componentDidMount: function() {
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
           this.state.user = data;
           this.setState({user:data});
        }.bind(this),
        error: function(xhr, textStatus, errorThrown) {
          console.log('error');
        }.bind(this)
      });
  },
  render: function() {
    return (
      <div className="User">
              <h1>User</h1>
              <h3>name:{this.state.user.name}</h3>
              <h3>email:{this.state.user.email}</h3>
      </div>
    );
  }
});

var View1 = React.createClass({
    mixins: [Lifecycl],
    routerWillLeave:function(nextLocation) {
      console.log('nextLocation',nextLocation);
      if (!this.state.isSaved)
        return 'Your work is not saved! Are you sure you want to leave?';
    },
    componentWillLeave: function(cb) {
      console.log('View1 will leave');
      setTimeout(cb, 1);
    },
    render: function() {
        return (
          <div>View 1 content</div>
        );
    }          
});
          
var View2 = React.createClass({
    mixins: [ RouteContext],
    componentWillLeave: function(cb) {
      console.log('View2 will leave');
      setTimeout(cb, 1);
    },
    render: function() {
        return (
          <div>View 2 content
            <View1/>
          </div>
        );
    }          
});
    

var App = React.createClass({
  mixins: [Router.State],
  componentDidMount: function() {
  },
  render: function() {
    var name = this.getRoutes().reverse()[0].name;
    console.log('name=',name);
    return (
      <div>
        <ul>
            <li><Link to="view2">View2 link</Link></li>    
            <li><Link to="page1">Page1 link</Link></li>    
            <li><Link to="page2">Page2 link</Link></li>    
            <li><Link to="view1">View1 link</Link></li>    
            <li><Link to="page3">Page3 link</Link></li>    
            <li><Link to="user">User link</Link></li>    
            <li><Link to="home">Home link</Link></li>    
        </ul>
        <ReactTransitionGroup component="div">
            <RouteHandler key={name}/>
        </ReactTransitionGroup>
      </div>
    );
  }
});
          
var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="view1" handler={View1}/>
    <Route name="view2" handler={View2}/>
    <Route name="page1" handler={Page1}/>
    <Route name="page2" handler={Page2}/>
    <Route name="page3" handler={Page3}/>
    <Route name="home" handler={Home}/>
    <Route name="user" handler={User}/>
  </Route>
);


var Main = React.createClass({
    render: function() {
        return <div className="page main">
            <div className="contents">
                <Link to="sub">Slide Transition</Link>
            </div>
        </div>;
    }
});

var Sub = React.createClass({
    render: function() {
        return <div className="page sub">
            <div className="contents">
                <Link to="main">Back</Link>
            </div>
        </div>
    }
});

var Appa = React.createClass({
    mixins: [Router.State],
    render: function() {
        return <CSSTransitionGroup transitionName="route" className="transition-group">
            <RouteHandler key={this.getPathname()} />
        </CSSTransitionGroup>;
    }
});

// var routes = <Route handler={Appa}>
//     <DefaultRoute name="main" handler={Main} />
//     <Route name="sub" handler={Sub} />
// </Route>

// Router.run(routes, Router.HashLocation, (Root) => {
//     ReactDOM.render(<Root />, document.getElementById('content'));
// });


Router.run(routes, function (Handler) {
  ReactDOM.render(<Handler/>, document.getElementById('content'));
});
    

// ReactDOM.render(<App />,document.getElementById('content'));
// ReactDOM.render(<Router routes={routes} />,document.getElementById('content'));
// 
// 