<?php
require_once __DIR__.'/../database.php';
require_once __DIR__.'/RestfulServer.php';

class  ApproveService extends RestfulServer {
		public function __construct() {
			parent::__construct();
		}

		public function index(){
			if($this->model){
                (!$this->format ? $this->format = 'json' : null);
				$columns = TColumn::where('table','approve')->get();
				$data = $this->model->get();
					$o = new stdClass();
					$o->columns = $columns;
					$o->data = $data;
				$this->response($o);
			}
		}

		public function update(){
            (!$this->format ? $this->format = 'json' : null);
            $approve = $this->model->find($this->input->id);
            if($approve){
	            $approve->name = $this->input->name;
	            $approve->status = $this->input->status;
	            $rs = $approve->save();
					$o = new stdClass();
					$o->data = $rs;
				$this->response($o);
            }
		}


		public function Model()  {
			return new Approve();
		}
		
}

$approveservice = new ApproveService();
$approveservice->run();
