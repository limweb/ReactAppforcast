<?php
// set_time_limit(500);       //à¸•à¸±à¹‰à¸‡à¹ƒà¸«à¹‰à¹„à¸¡à¹ˆà¸¡à¸µ time limit à¸£à¸±à¸™à¹„à¸›à¸ˆà¸™à¸à¸§à¹ˆà¸²à¸ˆà¸°à¸ˆà¸š
// ignore_user_abort(1);    //à¸ªà¸±à¹ˆà¸‡à¹ƒà¸«à¹‰à¸£à¸±à¸™à¸•à¹ˆà¸­à¹à¸¡à¹‰à¸§à¹ˆà¸²à¸ˆà¸°à¸›à¸´à¸” Browser à¹„à¸›à¹à¸¥à¹‰à¸§à¸à¹‡à¸•à¸²à¸¡
// ini_set('upload_max_filesize', '10M');
// ini_set('post_max_size', '10M');
// ini_set('max_input_time', 500);
// ini_set('max_execution_time', 500);
// ini_set("display_errors", 1);
ini_set('max_execution_time', 500);
set_time_limit(500);
ignore_user_abort(0);
error_reporting(0);
ini_set("memory_limit",-1);
require_once __DIR__.'/../database.php';
require_once __DIR__.'/RestfulServer.php';

class  ProductService extends RestfulServer {

		public function __construct() {
			parent::__construct();
		}


		public function index(){

			if($this->model){
                (!$this->format ? $this->format = 'json' : null);
				$columns = TColumn::where('table','product')->get();
				$approves = Approve::get();
				$orders = Order::get();
				$data = $this->model->get();
					$o = new stdClass();
					$o->columns = $columns;
					$o->data = $data;
					$o->approves = $approves;
					$o->orders = $orders;
				$this->response($o);
			}

		}


		public function update(){
			consolelog($this->input);
            (!$this->format ? $this->format = 'json' : null);
            $product = $this->model->find($this->input->id);
            if($product) {
	            $product->name = $this->input->name;
	            $product->order_id = $this->input->order_id;
	            $product->approve_id = $this->input->approve_id;
	            $product->supplier = $this->input->supplier;
	            $product->status = $this->input->status;
	            $rs = $product->save();
					$o = new stdClass();
					$o->data = $rs;
				$this->response($o);
            }
		}



		public function Model(){
			return new Product();
		}
}

$productservice = new ProductService();
$productservice->run();
