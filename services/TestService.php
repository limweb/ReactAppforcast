<?php
require_once __DIR__.'/../database.php';
require_once __DIR__.'/RestfulServer.php';

class TestService extends RestfulServer {
		public function __construct() {
			parent::__construct();
		}
}

$testservice = new TestService();
$testservice->run();
