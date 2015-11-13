<?php
require_once __DIR__.'/../database.php';
require_once __DIR__.'/RestfulServer.php';

class LoginService extends RestfulServer {
		public function __construct() {
			parent::__construct();
		}

		public function postLogin(){
				$o = new stdClass();
				$o->name = 'Thongchai Lim';
				$o->email = 'a@a.com';
				$o->type = 'admin';
				$o ->img = 'https://scontent.fbkk5-2.fna.fbcdn.net/hprofile-xap1/v/t1.0-1/p200x200/10430901_1046680715346826_312424697059554133_n.jpg?oh=0953fb792b339f355ab7d779a195f636&oe=56CEA566';
				$_SESSION['user'] = $o;
				echo json_encode($o);
		}

		public function postLogout(){
			session_destroy();
			 (!$this->format ? $this->format = 'json' : null);
              $this->response('logout successed');
		}

		public function postChklogin(){
			// dump($this);
			if($this->sessiones['user']){
				$this->response($this->sessiones['user'],'json');
			}else {
				$this->rest_error('-1','error');
			}
		}

}
$loginservice = new LoginService();
$loginservice->run();




