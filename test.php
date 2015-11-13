<?php
session_start();
echo session_id();
$file = '*';

$dir = './fonts';
$now   = time();

// foreach (glob( $dir.'/'.session_id().'*.*' ) as $filename) {
foreach (glob( $dir.'/*.*' ) as $filename) {
    echo "\nLast modified: ".date("F d Y H:i:s.",filemtime($filename));
		if (is_file($filename)){
		     if ( ($now - filemtime($filename)) >= 60 * 60 * 24 * 30 ) { // 2 days 
		        // unlink($file);}
		        echo '1',session_id(), $filename,($now - filemtime($filename)),"\n";
		     } else  {
		        echo '2',session_id(), $filename,($now - filemtime($filename)),"\n";
		     }
		}
}
