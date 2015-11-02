<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>

    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

    <script src="jquery-latest.js" type="text/javascript"></script>
    <script src="bootstrap.min.js"></script>
    <script src="react.js"></script>
    <script src="react-dom.js" type="text/javascript"></script>
    <script src="react-with-addons.js"></script>
    <script src="ReactRouter.js"></script>
    <script src="JSXTransformer.js" type="text/javascript" ></script>
    <script src="reflux.min.js"></script>
    <script src="react-bootstrap.js"></script>
    <script src="lodash.js"></script>
    <script src="moment.js" type="text/javascript"></script>
    <script src="./common.js" type="text/jsx" ></script>
    <script src="./contentitem.js" type="text/jsx" ></script>
    <script src="./approve.js" type="text/jsx" ></script>
    <script src="./sale.js" type="text/jsx" ></script>
    <script src="./order.js" type="text/jsx" ></script>
    <script src="./product.js" type="text/jsx" ></script>
    <script src="./forcast.js" type="text/jsx" ></script>
    <script src="./reflux.js" type="text/javascript" ></script>
    <style type="text/css">

body {
    padding-top: 50px;
    overflow: hidden;
}

.App {
    padding-top: 50px;
    overflow: hidden;
}


#wrapper {
    min-height: 100%;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    display: inline-block;
    padding-bottom: 40px;
}
#main-wrapper {
    width:100%;
    height: 100%;
    overflow-y: auto;
    padding: 50px 0 0px 0;
}
#main {
    position: relative;
    height: 100%;
    overflow-y: auto;
    padding: 0 15px;
}
#sidebar-wrapper {
    height: 100%;
    padding: 50px 0 0px 0;
    position: fixed;
    border-right: 1px solid gray;
}
#sidebar {
    position: relative;
    height: 100%;
    overflow-y: auto;
}
#sidebar .list-group-item {
        border-radius: 0;
        border-left: 0;
        border-right: 0;
        border-top: 0;
}
@media (max-width: 992px) {
    body {
        padding-top: 0px;
    }
}
@media (min-width: 992px) {
    #wrapper {
      top: 20px;
    } 
    #main-wrapper {
        float:right;
    }
}
@media (max-width: 992px) {
    #main-wrapper {
        padding-top: 0px;
    }
}
@media (max-width: 992px) {
    #sidebar-wrapper {
        position: static;
        height:auto;
        max-height: 300px;
        border-right:0;
    }
}


    #overlay {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          background: #000;
          opacity: 0.8;
          filter: alpha(opacity=80)
          }
      #loading {
          width: 50px;
          height: 57px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -28px 0 0 -25px;
      }

      /* Preload ICON */
      #overlayx {
        opacity: .7;
        background-color: #000000;
        visibility: visible;
        /*transition: all 2s;*/
        position: fixed; 
        left: 0; 
        top: 0;
        z-index: 9999; 
        width: 100%; 
        height: 100%;
      }
      #loadingx {
        position: fixed; /* or absolute */
        top: 42%;
        left: 50%;
      }

      /* Timer*/
      .timer{
        z-index: 999;
        width: 29px;
        height: 29px;
        background-color: transparent;
        box-shadow: inset 0px 0px 0px 2px #fff;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -100px;
       }
      .timer:after, .timer:before{
        position: absolute;
        content:"";
        background-color: #fff;
      }
      .timer:after{
        width: 11px;
        height: 2px;
        top: 13.5px;
        left: 13.5px;
        -webkit-transform-origin: 1px 1px;
           -moz-transform-origin: 1px 1px;
            transform-origin: 1px 1px;
        -webkit-animation: minhand 2s linear infinite;
           -moz-animation: minhand 2s linear infinite;
            animation: minhand 2s linear infinite;
      }
      .timer:before{
        width: 10px;
        height: 2px;
        top: 13.5px;
        left: 13.5px;
        -webkit-transform-origin: 1px 1px;
           -moz-transform-origin: 1px 1px;
            transform-origin: 1px 1px;
        -webkit-animation: hrhand 8s linear infinite;
           -moz-animation: hrhand 8s linear infinite;
            animation: hrhand 8s linear infinite;
      }

      @-webkit-keyframes minhand{
        0%{-webkit-transform:rotate(0deg)}
        100%{-webkit-transform:rotate(360deg)}
      }
      @-moz-keyframes minhand{
        0%{-moz-transform:rotate(0deg)}
        100%{-moz-transform:rotate(360deg)}
      }
      @keyframes minhand{
        0%{transform:rotate(0deg)}
        100%{transform:rotate(360deg)}
      }

      @-webkit-keyframes hrhand{
        0%{-webkit-transform:rotate(0deg)}
        100%{-webkit-transform:rotate(360deg)}
      }
      @-moz-keyframes hrhand{
        0%{-moz-transform:rotate(0deg)}
        100%{-moz-transform:rotate(360deg)}
      }
      @keyframes hrhand{
        0%{transform:rotate(0deg)}
        100%{transform:rotate(360deg)}
      }


      .box {
        width: 200px;
        height: 100px;
        background: yellow;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -100px;
      }

        .row {
          margin-left: 20px;
          margin-right: 20px;
          /*margin-top: 40px;*/
          margin-bottom: 20px;
        }

        #masthead {
          height: 100%
        }
     .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        /* Set the fixed height of the footer here */
        height: 40px;
        background-color: #f5f5f5;
    }
    
    .footer > .container {
        padding-right: 15px;
        padding-left: 15px;
        padding-top: 10px;
    }
    </style>
</head>
<body>
  <div id="content" />
</body>
<script type="text/jsx">

'use strict'

var Router = ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

var About = React.createClass({
  render() {
    return <h3>About</h3>
  }
})

var Inbox = React.createClass({
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children || "Welcome to your Inbox"}
      </div>
    )
  }
})

var Message = React.createClass({
  render() {
    return <h3>Message {this.props.params.id}</h3>
  }
})

var routes = (
            <Route path="/" component={App}>
                <DefaultRoute handler={App}/>
                <Route path="about" component={About} />
                <Route path="inbox" component={Inbox}>
                  <Route path="messages/:id" component={Message} />
                </Route>
            </Route>);

Router.run(routes, Router.HistoryLocation, function(Root, initialState) {
      ReactDOM.render(<Root />,document.getElementById('content'));
});

</script>
</html>


