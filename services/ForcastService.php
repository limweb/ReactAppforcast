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



		public function getMonthadd(){
			$now = Carbon::now();//->addDay();
			$this->month = $now->month;
			$this->year = $now->year;
		 	if($now->day > 3) {
		 		$monthapp = Monthapp::where('month_slug','<=',$now->year.'/'.$now->month)->where('editable',1);
		 	} else {
		 		$monthapp = Monthapp::where('month_slug','<',$now->year.'/'.$now->month-1 )->where('editable',1);
		 	}
		 	$monthapp->update(['editable'=>0]);
			for($i=0;$i<= 4;$i++) {
				$m = Monthapp::where('month_slug',$now->year.'/'.$now->month)->first();
				if(!$m){
					$m = new Monthapp();
					$m->year = $now->year;
					$m->month = $now->month;
					$m->month_slug = $now->year.'/'.$now->month;
					$m->editable = 1;
					$m->created_by = 'system';
					$m->updated_by = 'system';
					$m->save();
				}
				$now->addMonth();
			}
		}

		private function checkshow($column) {
			if( in_array($column, $this->hide) ){
				return false;
			} else {
				return true;
			}
		}

		private function checkedit($column){
			if( in_array($column, $this->unedit) ){
				return false;
			} else {
				return true;
			}
		}

		public function getTest(){
			(!$this->format ? $this->format = 'json' : null);
			$this->getMonthadd();
			// $rs = Vproduct::All();
			// dump($rs[0]);


			// $apps = App::get()->toArray();
			// $currentmonth = $apps[0]['value'];
			$currentmonth = $this->year.'/'.$this->month;
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
			     $sql .= ' Sum(IF(month_slug="'.$month->month_slug.'",sold_vals,0)) AS `s'.$month->month_slug.'`,';
			}
			$sql .= 'v_sale.order_name as orderName,v_sale.app_name as approveName,';
			$sql .= 'v_sale.order_id as orderid,v_sale.approve_id as approveid,v_sale.`status`,v_sale.email,v_sale.sale_id as saleid,v_sale.`year`,v_sale.`month`,';
			$sql .= 'v_sale.month_slug as monthslug,v_sale.editable,v_sale.month_id as monthid,v_sale.sold_vals as soldvals, v_sale.forcast_vals as forcastvals,';
			
			$sql .= 'v_sale.sale_name as slaename';
			$sql .= ' FROM v_sale WHERE 1=1  and v_sale.sale_id = '.$this->sessiones['user']->id;
			// $sql .= ' -- and v_sale.sale_id = 1';
			$sql .= ' GROUP BY';
			// $sql .= ' -- v_sale.sale_id,';
			$sql .= ' v_sale.product_id';

			// echo $sql;
			// exit();
			$rs = Capsule::select($sql);
			$columns = [];
			if(count($rs)> 0 ) {
				$cs = array_keys($rs[0]);
				foreach ($cs as $c) {
					$co = new stdClass();
					$co->property = $c;
					$co->header = ucfirst($c);
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
			// dump($rs);
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

		}

		public function index(){
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
					Capsule::connection()->enableQueryLog();
					//check edit bofore add
					consolelog('product update----->',$this->input);
					consolelog('month=',$this->input->month);
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
