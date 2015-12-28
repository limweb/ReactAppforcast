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

		public function store(){
			(!$this->format ? $this->format = 'json' : null);
			consolelog('store----->',$this);
			consolelog($this->input);
			$o = new Sale();
			$o->name = $this->input->name;
			$o->status = $this->input->status;
			$o->email = $this->input->email;
			$o->username = $this->input->username;
			$o->updated_by = $this->sessiones['user']->name;
			$o->created_by = $this->sessiones['user']->name;
			$rs = $o->save();
			$this->response($rs);
		}

		
		public function update(){
			consolelog('=================update---------------------------------');
			consolelog($this->input);
            (!$this->format ? $this->format = 'json' : null);
            $o = $this->model->find($this->input->id);
            if($o) {
	            $o->name = $this->input->name;
	            $o->status = $this->input->status;
				$o->email = $this->input->email;
				$o->username = $this->input->username;
       			$o->updated_by = $this->sessiones['user']->name;
	            $rs = $o->save();
				$this->response($rs);
            }
		}


		public function destroy(){
			consolelog('destroy---->',$this->request);
			(!$this->format ? $this->format = 'json' : null);
			$idx = (int) $this->request[0];
			consolelog('idx=',$idx);
			$o = Sale::find($idx);
			$rs = -1;
			if($o){
				$rs = $o->delete();
			}
			$this->response($rs);
		}

		public function postResetpass(){
			$idx = (int) $this->request[0];
			consolelog('reset password---------------------------',$idx);
			(!$this->format ? $this->format = 'json' : null);
			$o = Sale::find($idx);
			$o->password = password_hash('1234',PASSWORD_DEFAULT );
			$rs = $o->save();
			$this->response($rs);
		}

		public function model() {
          return  new Sale();
        }
}

$saleservice = new SaleService();
$saleservice->run();
