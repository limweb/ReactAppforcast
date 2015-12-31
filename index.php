<?php
require_once __DIR__.'/database.php';
require_once __DIR__.'/services/RestfulServer.php';

class IndexApp extends RestfulServer {
		public function __construct() {
			parent::__construct();
		}


		public function index(){
			// dump($this);
			echo '
				<!DOCTYPE html>
				<head>
				    <meta charset="utf-8">
				    <meta http-equiv="X-UA-Compatible" content="IE=edge">
				    <title>Forcast App</title>
				    <link rel="stylesheet" href="css/login.css">
				    <link rel="stylesheet" href="css/app.css">
				    <link rel="stylesheet" href="css/font-awesome.min.css">
				    <link rel="stylesheet" href="css/bootstrap.min.css">
				    <link rel="stylesheet" href="bower_components/pure/pure.css">
				    <link rel="stylesheet" href="css/index.css">
				    <link href="bower_components/x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css" rel="stylesheet"/>
				    <script src="bower_components/jquery/dist/jquery.js" type="text/javascript"></script>
				    <script src="js/bootstrap.min.js"></script>
				    <script src="js/moment.js" type="text/javascript"></script>
				    <script src="js/bootbox.js" type="text/javascript"></script>
					<script src="bower_components/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.js"></script>
					<style type="text/css" media="screen">
					   	  canvas {
					        margin-top: 20px;
					        width:700px;
					      }
					      body {
					        // max-width: 778px;
					        width:98%;
						    // overflow: scroll;
					      }

					      /* For the "inset" look only */
						html {
						    // overflow: auto;
						}
						body {
						    position: absolute;
						    top: 20px;
						    left: 20px;
						    bottom: 20px;
						    right: 20px;
						    padding: 30px; 
						    // overflow-y: scroll;
						    overflow-x: hidden;
						}

						/* Lets get this party started */
						::-webkit-scrollbar {
						    width: 8px;
						}
						 
						/* Track */
						::-webkit-scrollbar-track {
						    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
						    // -webkit-border-radius: 10px;
						    -webkit-border-radius: 4px;
						    border-radius: 4px;
						}
						 
						/* Handle */
						::-webkit-scrollbar-thumb {
						    -webkit-border-radius: 10px;
						    border-radius: 4px;
						    // background: rgba(255,0,0,0.8); 
						    background: #a8a8a8; 
						    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
						}
						::-webkit-scrollbar-thumb:window-inactive {
							background: rgba(255,0,0,0.4); 
						}

						#main {
						  position: relative;
						  height: 100%;
						  overflow-y: scroll;
						  overflow-x: auto;
						  padding: 0 15px;
						  bottom: 20px;
						}
						td {
							white-space: nowrap;
						}

						.userbrand {
							width: 200px;
						}
						.userinfo {
							 display: flex;
						    /* Vertical align: */
						    align-items: center;
						    /* Horizontal align: */
						    justify-content: center;
						}

					</style>
				</head>
				<body>
				    <div id="content"  />
				    <div id="root">
				    </div>
				    <script type="text/javascript" src="http://127.0.0.1:3000/static/bundle.js"></script>
				    <!-- <script src="static/bundle.js"></script> -->
				    <script>
						window.user = {};
				    </script>
				  </body>
				</html>';
			
		}
}

$app = new IndexApp();
$app->run();

