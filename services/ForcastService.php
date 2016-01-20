<?php
use Carbon\Carbon;
use Illuminate\Database\Capsule\Manager as Capsule;
// set_time_limit(500);       //à¸•à¸±à¹‰à¸‡à¹ƒà¸«à¹‰à¹„à¸¡à¹ˆà¸¡à¸µ time limit à¸£à¸±à¸™à¹„à¸›à¸ˆà¸™à¸à¸§à¹ˆà¸²à¸ˆà¸°à¸ˆà¸š
// ignore_user_abort(1);    //à¸ªà¸±à¹ˆà¸‡à¹ƒà¸«à¹‰à¸£à¸±à¸™à¸•à¹ˆà¸­à¹à¸¡à¹‰à¸§à¹ˆà¸²à¸ˆà¸°à¸›à¸´à¸” Browser à¹„à¸›à¹à¸¥à¹‰à¸§à¸à¹‡à¸•à¸²à¸¡
// ini_set('upload_max_filesize', '10M');
// ini_set('post_max_size', '10M');
// ini_set('max_input_time', 500);
// ini_set('max_execution_time', 500);
// ini_set("display_errors", 1);
ini_set('max_execution_time', 500);
set_time_limit(500);
ignore_user_abort(0);
error_reporting(0);
ini_set("memory_limit",-1);
require_once __DIR__.'/../database.php';
require_once __DIR__.'/RestfulServer.php';

class  ForcastService extends RestfulServer {

		public function __construct() {
			parent::__construct();
			Capsule::connection()->enableQueryLog();
			$this->unedit = [	
						'id',
						'supplier',
						'name',
						'orderName',
						'approveName',
						'orderid',
						'approveid',
						'status',
						'email',
						'saleid',
						'year',
						'month',
						'monthslug',
						'editable',
						'monthid',
						'soldvals',
						'forcastvals',
						'slaename',
					];

			$this->hide = [	
				'orderid',
				'approveid',
				'email',
				'saleid',
				'year',
				'month',
				'editable',
				'monthid',
				'slaename',
			];
		}


		private function initApp() {
			$this->updateApps();
			list($this->year,$this->month,$this->day) = explode('-',Carbon::now()->toDateString());
			// list($this->year,$this->month,$this->day) = explode('-',Carbon::createFromDate(2015,12,01,'Asia/Bangkok')->toDateString());
			$this->startdate = App::where('slug','startdate')->first()->value;
			$this->enddate = App::where('slug','enddate')->first()->value;
			$this->getMonthadd();
			//dump($this);
			//dump(Capsule::getQueryLog());
			// exit();
		}

		private function  updateApps(){
				$chk = false;
				$day = Carbon::now();
				$m = Carbon::createFromDate($day->year,$day->month,1,'Asia/Bangkok');
				if($day->day >= 20  ) {
					$m->addMonth(2); 
					$app = App::where('slug','current_month')->first();
					list($y,$m) = explode('-',$m->toDateString());
					$app->value = $y.'/'.$m;
					$app->save();
					$chk = true;
				} else if($day->day <= 7 ) {
					$m->addMonth(); 
					$app = App::where('slug','current_month')->first();
					list($y,$m) = explode('-',$m->toDateString());
					$app->value = $y.'/'.$m;
					$app->save();
					$chk = true;
				} 
					$app = App::where('slug','current_month')->first();
					list($this->slug_year,$this->slug_month) = explode('/',$app->value);
					list($this->appyear,$this->appmonth,$this->appday) = explode('-',Carbon::createFromDate($this->slug_year,$this->slug_month,1,'Asia/Bangkok')->toDateString());
				$this->editable = $chk;
				consolelog('this->editable = ',$this->editable);
				$_SESSION['editable'] = $this->editable;
				// $this->editable = 0;
				// $_SESSION['editable'] = 0;
		}

		public function getMonthadd(){
			$now = Carbon::createFromDate($day->year,$day->month,1,'Asia/Bangkok');
			list($y,$m) = explode('-',$now->toDateString());
		 	
		 	// if($now->day > $this->enddate) {
		 	// 	$monthapp = Monthapp::where('month_slug','<=',$y.'/'.$m)->where('editable',1);
		 	// } else {
		 	// 	$monthapp = Monthapp::where('month_slug','<',$y.'/'.$m-1 )->where('editable',1);
		 	// }
			  // +"appyear": "2016"
			  // +"appmonth": "02"
		 	$monthapp = Monthapp::where('month_slug','<',$this->appyear.'/'.$this->appmonth)->where('editable',1);
		 	$monthapp->update(['editable'=>0]);
			for($i=0;$i<= 5;$i++) {
				list($y,$m) = explode('-',$now->toDateString());
		 		//dump($y,$m);
				$mapp = Monthapp::where('month_slug',$y.'/'.$m)->first();
				//dump($mapp);
				if(!$mapp){
					$mapp = new Monthapp();
					$mapp->year = $y;
					$mapp->month = $m;
					$mapp->month_slug = $y.'/'.$m;
					$mapp->editable = 1;
					$mapp->created_by = 'system';
					$mapp->updated_by = 'system';
					$mapp->save();
				}
				$now->addMonth();
			}
			// dump($this); exit();
		}

		private function checkshow($column) {
			if( in_array($column, $this->hide) ){
				return false;
			} else {
				return true;
			}
		}

		private function checkedit($column){
			// consolelog('chk--------------------------------------------',$this->editable);
			if($this->editable && $this->sessiones['user']->level < 8 ) {
					if( in_array($column, $this->unedit) ){
						return false;
					} else {
						list($c) = explode('_',$column);
						if($c == 's') {
							return false;
						} else {
							return true;
						}
					}
			} else {
				return false;
			}
		}

		public function getForcast(){
			try {
					if(!isset($this->sessiones['user']) ){
						throw new Exception("Please Login", 1);
					}

					(!$this->format ? $this->format = 'json' : null);

					$currentmonth = $this->appyear.'/'.$this->appmonth;
					// dump($currentmonth);
					$monthup_rs = Monthapp::Where('month_slug','>=',$currentmonth)->get()->take(4)->toArray();
					// dump($monthup_rs);
					$monthdown_rs = Monthapp::Where('month_slug','<',$currentmonth)->orderBy('month_slug','asc')->get()->take(4)->toArray();
					$sql = 'SELECT v_sale.product_id as id,v_sale.supplier,v_sale.`name`,';
					foreach ($monthup_rs as $item) {
					     $month = (object) $item;
					     $sql .= ' Sum(IF(month_slug="'.$month->month_slug.'",forcast_vals,0)) AS `'.$month->month_slug.'`,';
					}
					foreach ($monthdown_rs as $item) {
					     $month = (object) $item;
					     $sql .= ' Sum(IF(month_slug="'.$month->month_slug.'",sold_vals,0)) AS `s_'.$month->month_slug.'`,';
					}
					$sql .= 'v_sale.order_name as orderName,v_sale.app_name as approveName,';
					$sql .= 'v_sale.order_id as orderid,v_sale.approve_id as approveid,v_sale.`status`,v_sale.email,v_sale.sale_id as saleid,v_sale.`year`,v_sale.`month`,';
					$sql .= 'v_sale.month_slug as monthslug,v_sale.editable,v_sale.month_id as monthid,v_sale.sold_vals as soldvals, v_sale.forcast_vals as forcastvals,';
					
					$sql .= 'v_sale.sale_name as slaename';
					$sql .= ' FROM v_sale WHERE 1=1 ';
					if($this->sessiones['user']->level < 8 ) {
						$sql .= ' and v_sale.sale_id = '.$this->sessiones['user']->id;
					}
					// $sql .= ' -- and v_sale.sale_id = 1';
					$sql .= ' GROUP BY';
					// $sql .= ' -- v_sale.sale_id,';
					$sql .= ' v_sale.product_id';

					// echo $sql;	exit();
					$rs = Capsule::select($sql);
					$columns = [];
					if(count($rs)> 0 ) {
						$cs = array_keys($rs[0]);
						foreach ($cs as $c) {
							$co = new stdClass();
							$co->property = $c;

							list($cs,$cn) = explode('_',$c);
							if($cs == 's') {
								$co->header = ucfirst($cs.$cn);
							} else {
								$co->header = ucfirst($c);
							}
							$co->width = 400;
							$co->chksearch = true;
							$co->show = $this->checkshow($c);
							$co->editable = $this->checkedit($c);
							$columns[] = $co;
						}
					}
					consolelog('-----forcast success test------');
					$this->format = 'json';
					$o = new stdClass();
					$o->columns = $columns;
					$o->data = $rs;
					$this->response($o);
			} catch (Exception $e) {
				$this->rest_error(-1,$e->getMessage(),'json');		
			}
		}

		public function postForcastbySaleandMonth() {

			$app = App::where('slug','current_month')->first();
			$monthlist = Capsule::select('SELECT monthapps.month_slug AS label, monthapps.month_slug AS `value` FROM monthapps where month_slug <= "'.$app->value.'"ORDER BY label DESC LIMIT 24');
			$salelist = Capsule::select('SELECT sales.id AS `value`, sales.`name` AS label, sales.email, sales.username FROM sales WHERE LEVEL < 8 AND STATUS = 1');
			// consolelog('this input=',$this->input->saleid);
			// consolelog('this input=',$this->input->month);
			// dump($monthlist);
			// dump($salelist);
			(empty($this->input->saleid)) ? $this->input->saleid = $salelist[0]['value'] : null ;
			// (empty($this->input->month))  ? $this->input->month= $monthlist[0]['value'] :null ;
			consolelog('saleid ===',$salelist[0]['value']);
			(empty($this->input->month))  ? $this->input->month= $app->value :null ;

			$columns = [];
			$rs = [];
			try {
				if(!isset($this->sessiones['user']) ){
					throw new Exception("Please Login", 1);
				}
				(!$this->format ? $this->format = 'json' : null);

					$saleid = $this->input->saleid;
					$currentmonth = $this->input->month;
					consolelog('option search=',$saleid,$currentmonth);
					// dump($currentmonth);
					$monthup_rs = Monthapp::Where('month_slug','>=',$currentmonth)->get()->take(4)->toArray();
					// dump('up',$monthup_rs);
					$monthdown_rs = Monthapp::Where('month_slug','<',$currentmonth)->orderBy('month_slug','asc')->get()->take(4)->toArray();
					// dump($monthdown_rs);

				if(isset($this->input->saleid) && isset($this->input->month ) ){

					$sql = 'SELECT v_sale.product_id as id,v_sale.supplier,v_sale.`name`,';
					foreach ($monthup_rs as $item) {
					     $month = (object) $item;
					     $sql .= ' Sum(IF(month_slug="'.$month->month_slug.'",forcast_vals,0)) AS `'.$month->month_slug.'`,';
					}
					foreach ($monthdown_rs as $item) {
					     $month = (object) $item;
					     $sql .= ' Sum(IF(month_slug="'.$month->month_slug.'",sold_vals,0)) AS `s_'.$month->month_slug.'`,';
					}
					$sql .= 'v_sale.order_name as orderName,v_sale.app_name as approveName,';
					$sql .= 'v_sale.order_id as orderid,v_sale.approve_id as approveid,v_sale.`status`,v_sale.email,v_sale.sale_id as saleid,v_sale.`year`,v_sale.`month`,';
					$sql .= 'v_sale.month_slug as monthslug,v_sale.editable,v_sale.month_id as monthid,v_sale.sold_vals as soldvals, v_sale.forcast_vals as forcastvals,';
					
					$sql .= 'v_sale.sale_name as slaename';
					$sql .= ' FROM v_sale WHERE 1=1 ';
					$sql .= ' and v_sale.sale_id = '.$saleid;
					// $sql .= ' -- and v_sale.sale_id = 1';
					$sql .= ' GROUP BY';
					// $sql .= ' -- v_sale.sale_id,';
					$sql .= ' v_sale.product_id';

					// echo $sql;	exit();
					consolelog('sql=',$sql);
					$rs = Capsule::select($sql);

					if(count($rs)> 0 ) {
						$cs = array_keys($rs[0]);
						foreach ($cs as $c) {
							$co = new stdClass();
							$co->property = $c;

							list($cs,$cn) = explode('_',$c);
							if($cs == 's') {
								$co->header = ucfirst($cs.$cn);
							} else {
								$co->header = ucfirst($c);
							}
							$co->width = 400;
							$co->chksearch = true;
							$co->show = $this->checkshow($c);
							$co->editable = $this->checkedit($c);
							$columns[] = $co;
						}
					}
				} 	
				consolelog('-----forcast success test------');
					$o = new stdClass();
					$o->columns = $columns;
					$o->salelist = $salelist;
					$o->monthlist = $monthlist;
					$o->data = $rs;
				$this->response($o);

			} catch (Exception $e) {
				$this->rest_error(-1,$e->getMessage(),'json');		
			}
		}


		public function getTest(){
			try {
				
			if(!isset($this->sessiones['user']) ){
				throw new Exception("Please Login", 1);
			}

			// $this->getMonthadd();
			// $rs = Vproduct::All();
			// //dump($rs[0]);
			// 
			  // +"slug_year": "2016"
			  // +"slug_month": "02"
			  // +"appyear": "2016"
			  // +"appmonth": "02"
			  // +"appday": "01"
			  // +"editable": true
			  // +"year": "2015"
			  // +"month": "12"
			  // +"day": "30"
			  // +"startdate": "25"
			  // +"enddate": "10"

			// $apps = App::get()->toArray();
			// $currentmonth = $apps[0]['value'];
			$currentmonth = $this->appyear.'/'.$this->appmonth;
			// dump($currentmonth);
			$monthup_rs = Monthapp::Where('month_slug','>=',$currentmonth)->get()->take(4)->toArray();
			// dump($monthup_rs);
			$monthdown_rs = Monthapp::Where('month_slug','<',$currentmonth)->orderBy('month_slug','asc')->get()->take(4)->toArray();
			// dump($monthdown_rs);
			
			// echo json_encode(Order::get());
			// echo json_encode(Approve::get());
			// echo json_encode(Product::get());
			// echo json_encode(Sale::get());
			// echo json_encode(App::get());
			// echo json_encode(Monthapp::get());
			// 


			$sql = 'SELECT v_sale.product_id as id,v_sale.supplier,v_sale.`name`,';
			foreach ($monthup_rs as $item) {
			     $month = (object) $item;
			     $sql .= ' Sum(IF(month_slug="'.$month->month_slug.'",forcast_vals,0)) AS `'.$month->month_slug.'`,';
			}
			foreach ($monthdown_rs as $item) {
			     $month = (object) $item;
			     $sql .= ' Sum(IF(month_slug="'.$month->month_slug.'",sold_vals,0)) AS `s_'.$month->month_slug.'`,';
			}
			$sql .= 'v_sale.order_name as orderName,v_sale.app_name as approveName,';
			$sql .= 'v_sale.order_id as orderid,v_sale.approve_id as approveid,v_sale.`status`,v_sale.email,v_sale.sale_id as saleid,v_sale.`year`,v_sale.`month`,';
			$sql .= 'v_sale.month_slug as monthslug,v_sale.editable,v_sale.month_id as monthid,v_sale.sold_vals as soldvals, v_sale.forcast_vals as forcastvals,';
			
			$sql .= 'v_sale.sale_name as slaename';
			$sql .= ' FROM v_sale WHERE 1=1 ';
			if($this->sessiones['user']->level < 8 ) {
				$sql .= ' and v_sale.sale_id = '.$this->sessiones['user']->id;
			}
			// $sql .= ' -- and v_sale.sale_id = 1';
			$sql .= ' GROUP BY';
			// $sql .= ' -- v_sale.sale_id,';
			$sql .= ' v_sale.product_id';

			// echo $sql;	exit();
			$rs = Capsule::select($sql);
			$columns = [];
			if(count($rs)> 0 ) {
				$cs = array_keys($rs[0]);
				foreach ($cs as $c) {
					$co = new stdClass();
					$co->property = $c;

					list($cs,$cn) = explode('_',$c);
					if($cs == 's') {
						$co->header = ucfirst($cs.$cn);
					} else {
						$co->header = ucfirst($c);
					}
					$co->width = 400;
					$co->chksearch = true;
					$co->show = $this->checkshow($c);
					$co->editable = $this->checkedit($c);
					$columns[] = $co;
				}
			}
			consolelog('-----forcast success test------');
			$this->format = 'json';
			$o = new stdClass();
			$o->columns = $columns;
			$o->data = $rs;
			$o->user = $this->sessiones['user'];
			$this->response($o);
			// //dump($rs);
			// echo '<table border="1px"><tr>';
			// $head = ['no','product_id','order_name','app_name','supplier','name','order_id','approve_id','status','email','sale_id','year','month','month_slug','editable','month_id','sold_vals','forcast_vals','2558/09','2558/10','2558/11','2558/12','s2558/05','s2558/06','s2558/07','s2558/08','sale_name',];
			// foreach ($head as $h) {
			//     echo '<th>',$h,'</th>';
			// }
			// echo '</tr>';
			// $i = 1;
			// foreach ($rs as $items) {
			//     echo '<tr><td>',$i,'</td>';
			//     foreach ($items as $item) {
			//         echo '<td>',$item,'</td>';
			//     }

			//     echo '</tr>';
			//     $i++;
			// }
			// echo '</table>';
			// echo '<script  type="text/javascript" charset="utf-8" async defer>';
			// echo  'var rs = ',json_encode($rs);
			// echo '</script>';
			} catch (Exception $e) {
				$this->rest_error(-1,$e->getMessage(),'json');		
			}
		}

		public function index(){
			$this->initApp();
			return $this->getTest();

			// if($this->model){
   //              (!$this->format ? $this->format = 'json' : null);
			// 	$columns = TColumn::where('table','product')->get();
			// 	$approves = Approve::get();
			// 	$orders = Order::get();
			// 	$data = $this->model->get();
			// 		$o = new stdClass();
			// 		$o->columns = $columns;
			// 		$o->data = $data;
			// 		$o->approves = $approves;
			// 		$o->orders = $orders;
			// 	$this->response($o);
			// }

		}


		public function update(){
			try {


					if(!$this->sessiones['editable']) {
						consolelog('cannot edit-----------------------------------------------');
						throw new Exception("หมดเวลา ปรับปรุง Forcast แล้ว ติดต่อ K.M", 1);
					}

					consolelog('this->sessiones----->',$this->sessiones);
					//check edit bofore add
					consolelog('product update----->',$this->input);
					consolelog('month=',$this->input->month);

					list($year,$month) = explode('/',$this->input->month);
					consolelog('year=',$year,'month=',$month);


		            (!$this->format ? $this->format = 'json' : null);
		            $uid = $this->sessiones['user']->id;
		            consolelog('userid===>',$uid);
		            $forcast = Forcast::where('sale_id',$uid)
		           			->where('month_slug',$this->input->month)
		           			->where('product_id',$this->input->product_id)
		           			->first();
		           	consolelog('query====',Capsule::getQueryLog());
		            consolelog('forcat=',$forcast);
		            if($forcast) {
							$forcast->vals  = $this->input->value;
							$forcast->updated_by = $this->sessiones['user']->name;
		            } else {
							$forcast = new Forcast();
							$forcast->sale_id  = $uid;
							$forcast->month_slug  = $this->input->month;
							$forcast->product_id  = $this->input->product_id;
							$forcast->vals  = $this->input->value;
							$forcast->status  = 1;
							$forcast->updated_by = $this->sessiones['user']->name;
							$forcast->created_by = $this->sessiones['user']->name;
		            }
		            $o = $forcast->save();
					$this->response($o);	
			} catch (Exception $e) {
					$this->rest_error(-1,$e->getMessage(),'json');
			}
		}

		public function store(){
			(!$this->format ? $this->format = 'json' : null);
			consolelog('product store----->',$this->input);
			$o = new stdClass();
			$this->response($o);
		}

		public function destroy(){
			consolelog('product destroy---->',$this->request);
			(!$this->format ? $this->format = 'json' : null);
			$idx = (int) $this->request[0];
			$o = new stdClass();
			$o->id = $idx;
			$this->response($o);
		}


		public function Model(){
			return new Forcast();
		}
}

$forcastservice = new ForcastService();
$forcastservice->run();
