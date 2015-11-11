<?php
require_once __DIR__.'/../database.php';
require_once __DIR__.'/RestfulServer.php';

class AppService extends RestfulServer {
		public function __construct() {
			parent::__construct();
		}

		public function Model() {
			return new App();
		}

		public function defaultlast(){
			if($this->model && $this->request[0]){
                (!$this->format ? $this->format = 'json' : null);
                $this->response($this->model->where('slug',$this->request[0])->get());
			}
		}

}

$appservice = new AppService();
$appservice->run();