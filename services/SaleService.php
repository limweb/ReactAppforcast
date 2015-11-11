<?php
require_once __DIR__.'/../database.php';
require_once __DIR__.'/RestfulServer.php';

class  SaleService extends RestfulServer {
		public function __construct() {
			parent::__construct();
		}

		// public function index(){
		// 	echo 'SaleService';
		// }

		public function model() {
          return  new Sale();
        }
}

$saleservice = new SaleService();
$saleservice->run();
