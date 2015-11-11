<?php
require_once __DIR__.'/../database.php';
require_once __DIR__.'/RestfulServer.php';

class  ApproveService extends RestfulServer {
		public function __construct() {
			parent::__construct();
		}

		// public function index(){
		// 	echo 'ApproveService';
		// }
		public function Model()  {
			return new Approve();
		}
		
}

$approveservice = new ApproveService();
$approveservice->run();
