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

		public function getMenu(){
			if(isset($this->sessiones['user']) && $this->sessiones['user']->type == 'admin'){
		        $tabs =  Menu::where('lr',0)->where('parent',0)->where('status',1)->orderBy('order','asc')->get();
		        	foreach ($tabs as $tab) {
		        		if($tab->type == 'dropdown'){
		        			$tab->dorpdownlist;
		        		}
		        	}
		        $tabrs = Menu::where('lr',1)->where('parent',0)->where('status',1)->orderBy('order','asc')->get();
		        	foreach ($tabrs as $tab) {
		        		if($tab->type == 'dropdown'){
		        			$tab->dorpdownlist;
		        		}
		        	}
			} else {
		        $tabs =  Menu::where('lr',0)->where('parent',0)->where('r','<',9)->where('status',1)->orderBy('order','asc')->get();
		        	foreach ($tabs as $tab) {
		        		if($tab->type == 'dropdown'){
		        			$tab->dorpdownlist;
		        		}
		        	}
		        $tabrs = Menu::where('lr',1)->where('parent',0)->where('r','<',9)->where('status',1)->orderBy('order','asc')->get();
		        	foreach ($tabrs as $tab) {
		        		if($tab->type == 'dropdown'){
		        			$tab->dorpdownlist;
		        		}
		        	}

			}
		        $o = new stdClass();
		        $o->tabList = $tabs;
		        $o->tabListr = $tabrs;
		        // echo json_encode($o);
		        (!$this->format ? $this->format = 'json' : null);
		        $this->response($o);
		}

}

$appservice = new AppService();
$appservice->run();