<?php
require_once __DIR__.'/../database.php';
require_once __DIR__.'/RestfulServer.php';

class  SaleService extends RestfulServer {
		public function __construct() {
			parent::__construct();
		}

		public function index(){
			if($this->model){
                (!$this->format ? $this->format = 'json' : null);
				$columns = TColumn::where('table','sale')->get();
				$data = $this->model->select('created_at','created_by','email','id','level','name','status','updated_at','updated_by','username')
				    ->get();
					$o = new stdClass();
					$o->columns = $columns;
					$o->data = $data;
				$this->response($o);
			}
		}

		public function model() {
          return  new Sale();
        }
}

$saleservice = new SaleService();
$saleservice->run();
