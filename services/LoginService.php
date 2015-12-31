<?php
require_once __DIR__.'/../database.php';
require_once __DIR__.'/RestfulServer.php';

class LoginService extends RestfulServer {
		public function __construct() {
			parent::__construct();
		}

		public function postLogin(){
			consolelog('post login',$this->input);
				(!$this->format ? $this->format = 'json' : null);
				$email = $this->input->user;
				$pass = $this->input->pass;
				$u =  Sale::where('email',$email)->first();
				consolelog('user=',$u);
				consolelog('user pass verify =',password_verify($pass, $u->password));
				if( $u && password_verify($pass, $u->password) ) {
						consolelog('login pass');
						$o = new stdClass();
						$o->id = $u->id;
						$o->name = $u->name;
						$o->email =$u->email;
						if($u->level >= 8 ) {
							$o->type = 'admin';
						} else {
							$o->type = 'user';
						}
						$o->level =$u->level;
						$o ->img = 'https://scontent.fbkk5-2.fna.fbcdn.net/hprofile-xap1/v/t1.0-1/p200x200/10430jpg?oh=0953fb792b339f355ab7d779a195f636&oe=56CEA566';
						$_SESSION['user'] = $o;
						$this->response($o);
				} else {
					   consolelog('login---error');
					   $this->rest_error(-1,'can not login');
				}

		}

		public function postLogout(){
			 consolelog('logout');
			 session_destroy();
			 (!$this->format ? $this->format = 'json' : null);
             $this->response('logout successed');
		}

		public function postChklogin(){
			// dump($this);
			if(isset($this->sessiones['user'])){
				$this->response($this->sessiones['user'],'json');
			}else {
				$this->rest_error('-1','error');
			}
		}

}
$loginservice = new LoginService();
$loginservice->run();




