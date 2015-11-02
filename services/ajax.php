<?php

function debug_to_console($data) {
    if(is_array($data) || is_object($data))
    {
        echo("<script>console.log('PHP: ".json_encode($data)."');</script>");
    } else {
        echo("<script>console.log('PHP: ".$data."');</script>");
    }
}

$debug_array = [ 'a'=>'aaaaaa','b'=>'bbbbbb'];
echo json_encode($debug_array);
// debug_to_console($debug_array);