<?php
require_once __DIR__.'/../database.php';
require_once __DIR__.'/RestfulServer.php';

class  OrderService extends RestfulServer {
		public function __construct() {
			parent::__construct();
		}

		public function index(){

			if($this->model){
                (!$this->format ? $this->format = 'json' : null);
				$columns = TColumn::where('table','order')->get();
				$data = $this->model->get();
					$o = new stdClass();
					$o->columns = $columns;
					$o->data = $data;
				$this->response($o);
			}

		}
		
		
		
		public function update(){
			consolelog('=================update---------------------------------');
			consolelog($this->input);
            (!$this->format ? $this->format = 'json' : null);
            $order = $this->model->find($this->input->id);
            if($order) {
	            $order->name = $this->input->name;
	            $order->status = $this->input->status;
	            $rs = $order->save();
	            consolelog($order);
					$o = new stdClass();
					$o->data = $rs;
				$this->response($o);
            }
		}

		public function model() {
          return  new Order();
        }
}

$orderservice = new OrderService();
$orderservice->run();
