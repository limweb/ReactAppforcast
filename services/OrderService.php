<?php
require_once __DIR__.'/../database.php';
require_once __DIR__.'/RestfulServer.php';

class  OrderService extends RestfulServer {
		public function __construct() {
			parent::__construct();
		}

		// public function index(){
		// 	echo 'OrderService';
		// }
		public function model() {
          return  new Order();
        }
}

$orderservice = new OrderService();
$orderservice->run();
