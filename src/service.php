<?php

$o = new stdClass();
$o->name = 'Thongchai Lim';
$o->email = 'a@a.com';
$o->type = 'user';
$o ->img = 'https://scontent.fbkk5-2.fna.fbcdn.net/hprofile-xap1/v/t1.0-1/p200x200/10430901_1046680715346826_312424697059554133_n.jpg?oh=0953fb792b339f355ab7d779a195f636&oe=56CEA566';

echo json_encode($o);
