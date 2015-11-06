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
					<script src="bower_components/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.js"></script>
				</head>
				<body>
				    <div id="content"  />
				    <div id="root">
				    </div>
				    <script type="text/javascript" src="http://127.0.0.1:3000/static/bundle.js"></script>
				    <!-- <script src="static/bundle.js"></script> -->
				  </body>
				</html>';
			
		}
}

$app = new IndexApp();
$app->run();

