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
            consolelog('update this id ->',$this->input->id);
            if($approve){
	            $approve->name = $this->input->name;
	            $approve->status = $this->input->status;
	            $approve->updated_by = $this->sessiones['user']->name;
	            $rs = $approve->save();
					$o = new stdClass();
					$o->data = $rs;
				$this->response($o);
            }
		}

		public function store(){
			(!$this->format ? $this->format = 'json' : null);
			consolelog('store----->',$this);
			consolelog($this->input);
			$o = new Approve();
			$o->name = $this->input->name;
			$o->status = $this->input->status;
			$o->updated_by = $this->sessiones['user']->name;
			$o->created_by = $this->sessiones['user']->name;
			$rs = $o->save();
			$this->response($rs);
		}


		public function destroy(){
			(!$this->format ? $this->format = 'json' : null);
			$idx = (int) $this->request[0];
			consolelog('idx=',$idx);
			$o = Approve::find($idx);
			consolelog($o);
			if($o){
				$rs = $o->delete();
			}
			$this->response($o);
		}

		public function Model()  {
			return new Approve();
		}
		
}

$approveservice = new ApproveService();
$approveservice->run();
