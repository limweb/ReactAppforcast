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
// error_reporting(0);
error_reporting(E_ALL);
ini_set("memory_limit",-1);
require_once __DIR__.'/../database.php';
require_once __DIR__.'/RestfulServer.php';

class  ExportService extends RestfulServer {
	
	protected $inputFileType = 'Excel2007';
    protected $inputFileName = '';
    protected $objPHPExcel;

	public function __construct() {
		parent::__construct();
		Capsule::connection()->enableQueryLog();
		$this->objPHPExcel = new PHPExcel();
	}	


	public function getExport(){
			$this->init();
			list($this->y,$this->m) = explode('/',$this->app->value);
			$columns = [];
			$rs = [];
			try {
				if(!isset($this->sessiones['user']) ){
					throw new Exception("Please Login", 1);
				}
				(!$this->format ? $this->format = 'json' : null);

					$currentmonth = $this->app->value;
					// dump($currentmonth);
					$monthup_rs = Monthapp::Where('month_slug','>=',$currentmonth)->get()->take(4)->toArray();
					// dump('up',$monthup_rs);
					$monthdown_rs = Monthapp::Where('month_slug','<',$currentmonth)->orderBy('month_slug','asc')->get()->take(4)->toArray();
					// dump($monthdown_rs);

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
					$sql .= 'v_sale.month_slug as monthslug,v_sale.editable,v_sale.month_id as monthid,v_sale.sold_vals as soldvals, v_sale.forcast_vals as forcastvals';
					$this->sql = $sql;
					$this->sql .= ', v_sale.sale_name as slaename';
					$this->sql .= ' FROM v_sale WHERE 1=1 ';
					
					// $sql .= ', v_sale.sale_name as slaename';
					$sql .= ' FROM v_sale WHERE 1=1 ';
					// $sql .= ' and v_sale.sale_id = '.$saleid;
					// $sql .= ' -- and v_sale.sale_id = 1';
					$sql .= ' GROUP BY';
					// $sql .= ' -- v_sale.sale_id,';
					$sql .= ' v_sale.product_id';

					// echo $sql;	exit();
					$rs = Capsule::select($sql);
					if($rs){
						$columns = array_keys($rs[0]);
						$sheet = $this->objPHPExcel->setActiveSheetIndex(0);
						$col = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
						// $c[0] == A

						$count = count($columns);
						$i=0;
						foreach ($columns as $c) {
							$sheet->setCellValue($col[$i].'1', $c);
							$i++;
						}

						$i=2;
						foreach ($rs as $row) {
							for($j=0;$j<$count;$j++){
							  $this->objPHPExcel->getActiveSheet()->setCellValue( $col[$j].$i, $row[$columns[$j]]);
							  // echo $i,$j,$columns[$j],$row[$columns[$j]],PHP_EOL;
							}
							$i++;
						}	
						$this->objPHPExcel->getActiveSheet()->setTitle('Forcast '.$this->y.'_'.$this->m.'(sum)');
						$this->objPHPExcel->setActiveSheetIndex(0);
					}

			} catch (Exception $e) {
				$this->rest_error(-1,$e->getMessage(),'json');		
			}
	}

	public function getExportsale(){
		// $this->init();
		$this->getExport();
		$sheeti = 1;
		foreach ($this->salelist as $sale) {
			$sql = $this->sql;	
			$sql .= ' and v_sale.sale_id = '.$sale['value'];
			$sql .= ' GROUP BY';
			$sql .= ' v_sale.product_id';
			// dump($sql); exit();
			$rs = Capsule::select($sql);
			if($rs){
				$columns = array_keys($rs[0]);
 
		        $this->objPHPExcel->createSheet($sheeti);
		        $sheet = $this->objPHPExcel->setActiveSheetIndex($sheeti);
		        $sheet->setTitle($sale['label'].'_'.$this->y.'_'.$this->m);
				$col = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
				$count = count($columns);
				$i=0;
				foreach ($columns as $c) {
					$sheet->setCellValue($col[$i].'1', $c);
					$i++;
				}

				$i=2;
				foreach ($rs as $row) {



					for($j=0;$j<$count;$j++){
					  $this->objPHPExcel->getActiveSheet()->setCellValue( $col[$j].$i, $row[$columns[$j]]);
					  // echo $i,$j,$columns[$j],$row[$columns[$j]],PHP_EOL;
					}
					$i++;
				}	
				$sheeti++;
			}
		}
	}

	public function init(){
		$this->objPHPExcel->getProperties()->setCreator($this->sessiones['user']->name)
		->setLastModifiedBy($this->sessiones['user']->name)
		->setTitle("Forcast")
		->setSubject("Forcast")
		->setDescription("Forcast")
		->setKeywords("office 2007 openxml php")
		->setCategory("Test result file");
		$this->app = App::where('slug','current_month')->first();
		$this->monthlist = Capsule::select('SELECT monthapps.month_slug AS label, monthapps.month_slug AS `value` FROM monthapps where month_slug <= "'.$this->app->value.'"ORDER BY label DESC LIMIT 24');
		$this->salelist = Capsule::select('SELECT sales.id AS `value`, sales.`name` AS label, sales.email, sales.username FROM sales WHERE LEVEL < 8 AND STATUS = 1');
	}

	public function index() {
		$this->getExport();
		$this->getExportsale();
		$strFileName = "forcast_".$this->y."_".$this->m;
		$this->output($strFileName);
	}

	protected function output($fname){
		if(!$fname){
			$fname = 'example';
		}
		header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		header('Content-Disposition: attachment;filename="'.$fname.'.xlsx"');
                // header('Content-Disposition: attachment;filename="'.$fname.'.xls"');
		header('Cache-Control: max-age=0');
                // If you're serving to IE 9, then the following may be needed
		header('Cache-Control: max-age=1');
                // If you're serving to IE over SSL, then the following may be needed
                header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
                header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
                header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
                header ('Pragma: public'); // HTTP/1.0
                // $objWriter = PHPExcel_IOFactory::createWriter($this->objPHPExcel, 'Excel5');
                $objWriter = PHPExcel_IOFactory::createWriter($this->objPHPExcel, $this->inputFileType);
                $objWriter->setIncludeCharts(TRUE);
                // $objWriter->save($fname);
                $objWriter->save('php://output');
            }


            public function Model(){
            	return new Forcast();
            }
        }

        $exportservice = new ExportService();
        $exportservice->run();
