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
		
		
		public function store(){
			(!$this->format ? $this->format = 'json' : null);
			consolelog('store----->',$this);
			consolelog($this->input);
			$o = new Order();
			$o->name = $this->input->name;
			$o->status = $this->input->status;
			$o->updated_by = $this->sessiones['user']->name;
			$o->created_by = $this->sessiones['user']->name;
			$rs = $o->save();
			$this->response($rs);
		}

		
		public function update(){
			consolelog('=================update---------------------------------');
			consolelog($this->input);
            (!$this->format ? $this->format = 'json' : null);
            $order = $this->model->find($this->input->id);
            if($order) {
	            $order->name = $this->input->name;
	            $order->status = $this->input->status;
       			$order->updated_by = $this->sessiones['user']->name;
	            $rs = $order->save();
	            consolelog($order);
					$o = new stdClass();
					$o->data = $rs;
				$this->response($o);
            }
		}


		public function destroy(){
			consolelog('destroy---->',$this->request);
			(!$this->format ? $this->format = 'json' : null);
			$idx = (int) $this->request[0];
			consolelog('idx=',$idx);
			$o = Order::find($idx);
			consolelog($o);
			if($o){
				$rs = $o->delete();
			}
			$this->response($o);
		}

		public function model() {
          return  new Order();
        }
}

$orderservice = new OrderService();
$orderservice->run();
