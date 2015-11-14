<?php 
// // error_reporting(E_ALL);
// error_reporting(0);
// // ignore_user_abort(1);
// ignore_user_abort(0);
// set_time_limit(500);
// ini_set('upload_max_filesize', '10M');
// ini_set('post_max_size', '10M');
// ini_set('max_input_time', 500);
// ini_set('max_execution_time', 500);
// // ini_set("display_errors", 1);
// ini_set("memory_limit",-1);


require_once __DIR__.'/vendor/autoload.php';
use Illuminate\Database\Capsule\Manager as Capsule;
$capsule = new Capsule;
$capsule->addConnection([
    'driver'    => 'mysql',
    'host'      => 'localhost',
    'database'  => 'maxway_forcast',
    'username'  => 'root',
    'password'  => '',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
]);
use Illuminate\Events\Dispatcher;
use Illuminate\Container\Container;
$capsule->setEventDispatcher(new Dispatcher(new Container));
$capsule->setAsGlobal();
$capsule->bootEloquent();

if ( ! function_exists( 'implodeKV' ) && ! function_exists('consolelog') ) {

    function implodeKV($glueKV, $gluePair, $KVarray)  {
        if( is_object($KVarray) ) {
           $KVarray = json_decode(json_encode($KVarray),TRUE);
        }
        $t = array();
        foreach($KVarray as $key=>$val) {
            if(is_array($val)){
               $val = implodeKV(':',',',$val);
            }else if( is_object($val)){
                $val = json_decode(json_encode($val),TRUE);
                $val = implodeKV(':',',',$val);
            }

            if(is_int($key)){
                $t[] = $val;
            } else {
                $t[] = $key . $glueKV . $val;
            }
        }
        return implode($gluePair, $t);
    }


function consolelog($status = 200)  {
        
        $lists = func_get_args();
        $status = '';
        $status = implodeKV( ':' , ' ' , $lists);
  
       if(isset($_SERVER["REMOTE_ADDR"]) && !empty($_SERVER["REMOTE_ADDR"])){
          $raddr =$_SERVER["REMOTE_ADDR"];
       } else {
          $raddr = '127.0.0.1';
       }

       if(isset($_SERVER["REMOTE_PORT"]) && !empty($_SERVER["REMOTE_PORT"])){
          $rport = $_SERVER["REMOTE_PORT"];
       } else {
          $rport = '8000';
       }

       if(isset($_SERVER["REQUEST_URI"]) && !empty($_SERVER["REQUEST_URI"])){
          $ruri = $_SERVER["REQUEST_URI"];
       } else {
          $ruri = '/console';
       }

       file_put_contents("php://stdout",
           sprintf("[%s] %s:%s [%s]:%s \n",
               date("D M j H:i:s Y"),
               $raddr,$rport,
               $status,
               $ruri
               )
           );

  }  // end-of-consolelog

} // end-of-check funtion exist

class Order extends Illuminate\Database\Eloquent\Model { 
    protected $table = 'orders';
    protected $fllable = [];
    protected $guarded =['id'];

}

class Product extends Illuminate\Database\Eloquent\Model {
    protected $table = 'products';
    protected $fllable = [];
    protected $guarded =['id'];

}

class Approve extends Illuminate\Database\Eloquent\Model {
    protected $table = 'approves';
    protected $fllable = [];
    protected $guarded =['id'];

}

class Monthapp extends Illuminate\Database\Eloquent\Model {
    protected $table = 'monthapps';
    protected $fllable = [];
    protected $guarded =['id'];

}

class App extends Illuminate\Database\Eloquent\Model {
    protected $table = 'apps';
    protected $fllable = [];
    protected $guarded =['id'];

}

class TColumn extends Illuminate\Database\Eloquent\Model {
    protected $table = 'tbcolumns';
    protected $fllable = [];
    protected $guarded =['id'];

}

class Vproduct extends Illuminate\Database\Eloquent\Model {
    protected $table = 'v_products1';
    protected $fllable = [];
    protected $guarded =['id'];

}

class Sale extends Illuminate\Database\Eloquent\Model {
    protected $table = 'sales';
    protected $fllable = [];
    protected $guarded =['id'];

}

class Menu extends Illuminate\Database\Eloquent\Model {
    protected $table = 'menus';
    protected $fllable = [];
    protected $guarded =['id'];

    public function dorpdownlist(){
        return $this->hasMany('Menu','parent','id')->where('type','dropdownlist');
    }

}

// $rs = Vproduct::All();
// dump($rs);


// $apps = App::get()->toArray();
// $currentmonth = $apps[0]['value'];
// // dump($currentmonth);
// $monthup_rs = Monthapp::Where('month_slug','>=',$currentmonth)->get()->take(4)->toArray();
// $monthdown_rs = Monthapp::Where('month_slug','<',$currentmonth)->orderBy('month_slug','asc')->get()->take(4)->toArray();
// // dump($mars);


// echo json_encode(Order::get());
// echo json_encode(Approve::get());
// echo json_encode(Product::get());
// echo json_encode(Sale::get());
// echo json_encode(App::get());
// echo json_encode(Monthapp::get());




// $sql = 'SELECT v_sale.product_id,v_sale.order_name,v_sale.app_name,v_sale.supplier,v_sale.`name`,';
// $sql .= 'v_sale.order_id,v_sale.approve_id,v_sale.`status`,v_sale.email,v_sale.sale_id,v_sale.`year`,v_sale.`month`,';
// $sql .= 'v_sale.month_slug,v_sale.editable,v_sale.month_id,v_sale.sold_vals,v_sale.forcast_vals,';

// foreach ($monthup_rs as $item) {
//      $month = (object) $item;
//      $sql .= ' Sum(IF(month_slug="'.$month->month_slug.'",forcast_vals,0)) AS `'.$month->month_slug.'`,';
// }
// foreach ($monthdown_rs as $item) {
//      $month = (object) $item;
//      $sql .= ' Sum(IF(month_slug="'.$month->month_slug.'",sold_vals,0)) AS `s'.$month->month_slug.'`,';
// }
// $sql .= 'v_sale.sale_name';
// $sql .= ' FROM v_sale WHERE 1=1';
// // $sql .= ' -- and v_sale.sale_id = 1';
// $sql .= ' GROUP BY';
// // $sql .= ' -- v_sale.sale_id,';
// $sql .= ' v_sale.product_id';

// echo $sql;
// $rs = Capsule::select($sql);
// // dump($rs);
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